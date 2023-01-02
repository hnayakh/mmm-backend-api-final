"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const async_1 = require("async");
const firebase = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccount.json");
const lodash_1 = require("lodash");
const shell = require("shelljs");
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
let NotificationService = class NotificationService {
    constructor() {
        const firebaseCredentials = firebase_params;
        firebase.initializeApp({
            credential: firebase.credential.cert(firebaseCredentials),
            databaseURL: process.env.FIREBASE_DATABASE_URL,
        });
    }
    async sendFirebaseMessages(firebaseMessages, dryRun) {
        const batchedFirebaseMessages = lodash_1.chunk(firebaseMessages, 500);
        const batchResponses = await async_1.mapLimit(batchedFirebaseMessages, process.env.FIREBASE_PARALLEL_LIMIT, async (groupedFirebaseMessages) => {
            try {
                const tokenMessages = groupedFirebaseMessages.map(({ message, title, token }) => ({
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
            }
            catch (error) {
                return {
                    responses: groupedFirebaseMessages.map(() => ({
                        success: false,
                        error,
                    })),
                    successCount: 0,
                    failureCount: groupedFirebaseMessages.length,
                };
            }
        });
        return batchResponses.reduce(({ responses, successCount, failureCount }, currentResponse) => {
            return {
                responses: responses.concat(currentResponse.responses),
                successCount: successCount + currentResponse.successCount,
                failureCount: failureCount + currentResponse.failureCount,
            };
        }, {
            responses: [],
            successCount: 0,
            failureCount: 0,
        });
    }
    async sendAll(messages, dryRun) {
        if (process.env.NODE_ENV === 'local') {
            for (const { notification, token } of messages) {
                shell.exec(`echo '{ "aps": { "alert": ${JSON.stringify(notification)}, "token": "${token}" } }' | xcrun simctl push booted com.company.appname -`);
            }
        }
        return firebase.messaging().sendAll(messages, dryRun);
    }
};
NotificationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [])
], NotificationService);
exports.NotificationService = NotificationService;
//# sourceMappingURL=notification.service.js.map