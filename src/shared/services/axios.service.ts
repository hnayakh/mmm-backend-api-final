import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AxiosService {
  constructor(private readonly httpService: HttpService) {}
  
  post(url: any, data: any, headers: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService
          .post(url, JSON.stringify(data), {headers: headers})
          .subscribe((response) => {
            resolve(response.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  // Without converting object into string.
  postRaw(url: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.post(url, data).subscribe((response) => {
          resolve(response.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  multipartPost(url: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        var multipart = new FormData();
        multipart.append('image_file', data.buffer);
        console.log(multipart);
        this.httpService.post(url, multipart).subscribe((response) => {
          resolve(response.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  put(url: any, data: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService
          .put(url, JSON.stringify(data))
          .subscribe((response) => {
            resolve(response.data);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  get(url: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.get(url).subscribe((response) => {
          resolve(response.data);
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  getImageBuffer(url: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService
          .get(url, { responseType: 'arraybuffer' })
          .subscribe((response) => {
            resolve(response);
          });
      } catch (error) {
        reject(error);
      }
    });
  }

  delete(url: any): Promise<any> {
    return new Promise((resolve, reject) => {
      try {
        this.httpService.delete(url).subscribe((response) => {
          resolve(response);
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}
