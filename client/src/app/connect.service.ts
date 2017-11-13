import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
@Injectable()
export class ConnectService {

  constructor(public httpService: Http) { }
  postUsers='http://192.168.12.201:2000/api/user';
  postLoginUrl='http://192.168.12.201:2000/api/login';
  postMovieUrl='http://192.168.12.201:2000/api/movies';
  getMoviesUrl='http://192.168.12.201:2000/api/movies';
   //To save users data
   postUser(Data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postUsers, Data, options).map(
      data => data.json());
  }
  emailVerification(code): Observable<any> { 
    return this.httpService.get('http://192.168.12.201:2000/api/verify/'+code).map(
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
  getMovies(): Observable<any> {
    return this.httpService.get(this.getMoviesUrl).map(
      (res: Response) => res.json());
  }
updateMovie(Data):Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.httpService.put('http://192.168.12.201:2000/api/movies/update/'+Data.name, Data, options).map(
      data => data.json());
  }
  deleteMovie(movie): Observable<any> { 
    return this.httpService.delete('http://192.168.12.201:2000/api/movies/update/'+movie).map(
      (res: Response) => res.json());
  }
  searchMovies(movie): Observable<any> {
    return this.httpService.get('http://192.168.12.201:2000/api/movies/update/'+movie).map(
      (res: Response) => res.json());
  }
  searchMovieCatagery(catagery): Observable<any> {
    return this.httpService.get('http://192.168.12.201:2000/api/movies/catagery/'+catagery).map(
      (res: Response) => res.json());
  }

}
