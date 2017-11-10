import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class ConnectService {

  constructor(public httpService: Http) { }
  postUsers='http://localhost:2000/api/user';
  postLoginUrl='http://localhost:2000/api/login';
  postMovieUrl='http://localhost:2000/api/movies';
   //To save users data
   postUser(Data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postUsers, Data, options).map(
      data => data.json());
  }
  emailVerification(code): Observable<any> { 
    console.log("hello") 
    return this.httpService.get('http://localhost:2000/api/'+code).map(
      (res: Response) => res.json());
  }
  postLogin(Data):Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postLoginUrl, Data, options).map(
      data => data.json());
  }
  postMovie(Data):Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postMovieUrl, Data, options).map(
      data => data.json());
  }



}
