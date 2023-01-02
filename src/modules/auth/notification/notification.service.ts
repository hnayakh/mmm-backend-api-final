import { Injectable } from '@nestjs/common';
import { mapLimit } from 'async';
import * as firebase from 'firebase-admin';
import * as serviceAccount from './firebaseServiceAccount.json';
import { BatchResponse } from 'firebase-admin/lib/messaging/messaging-api';
import { chunk } from 'lodash';
import * as shell from 'shelljs';

export interface ISendFirebaseMessages {
  token: string;
  title?: string;
  message: string;
}
const firebase_params = {
  type: serviceAccount.type,
  projectId: serviceAccount.project_id,
  privateKeyId: serviceAccount.private_key_id,
  privateKey: serviceAccount.private_key,
  clientEmail: serviceAccount.client_email,
  clientId: serviceAccount.client_id,
  authUri: serviceAccount.auth_uri,
  tokenUri: serviceAccount.token_uri,
  authProviderX509CertUrl: serviceAccount.auth_provider_x509_cert_url,
  clientC509CertUrl: serviceAccount.client_x509_cert_url,
};

@Injectable()
export class NotificationService {
  constructor() {
    const firebaseCredentials = firebase_params;
    firebase.initializeApp({
      credential: firebase.credential.cert(firebaseCredentials),
      databaseURL: process.env.FIREBASE_DATABASE_URL,
    });
  }

  public async sendFirebaseMessages(
    firebaseMessages: ISendFirebaseMessages[],
    dryRun?: boolean,
  ): Promise<BatchResponse> {
    const batchedFirebaseMessages = chunk(firebaseMessages, 500);

    const batchResponses = await mapLimit<
      ISendFirebaseMessages[],
      BatchResponse
    >(
      batchedFirebaseMessages,
      process.env.FIREBASE_PARALLEL_LIMIT, // 3 is a good place to start
      async (
        groupedFirebaseMessages: ISendFirebaseMessages[],
      ): Promise<BatchResponse> => {
        try {
          const tokenMessages: firebase.messaging.TokenMessage[] =
            groupedFirebaseMessages.map(({ message, title, token }) => ({
              notification: { body: message, title },
              token,
              apns: {
                payload: {
                  aps: {
                    'content-available': 1,
                  },
                },
              },
            }));

          return await this.sendAll(tokenMessages, dryRun);
        } catch (error) {
          return {
            responses: groupedFirebaseMessages.map(() => ({
              success: false,
              error,
            })),
            successCount: 0,
            failureCount: groupedFirebaseMessages.length,
          };
        }
      },
    );

    return batchResponses.reduce(
      ({ responses, successCount, failureCount }, currentResponse) => {
        return {
          responses: responses.concat(currentResponse.responses),
          successCount: successCount + currentResponse.successCount,
          failureCount: failureCount + currentResponse.failureCount,
        };
      },
      {
        responses: [],
        successCount: 0,
        failureCount: 0,
      } as unknown as BatchResponse,
    );
  }

  public async sendAll(
    messages: firebase.messaging.TokenMessage[],
    dryRun?: boolean,
  ): Promise<BatchResponse> {
    if (process.env.NODE_ENV === 'local') {
      for (const { notification, token } of messages) {
        shell.exec(
          `echo '{ "aps": { "alert": ${JSON.stringify(
            notification,
          )}, "token": "${token}" } }' | xcrun simctl push booted com.company.appname -`,
        );
      }
    }
    return firebase.messaging().sendAll(messages, dryRun);
  }
}
