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
  emailVerificationUrl = 'http://192.168.12.201:2000/api/verify/';
  updateMoviesUrl = 'http://192.168.12.201:2000/api/movies/update/';
  deleteMoviesUrl = 'http://192.168.12.201:2000/api/movies/update/';
  searchMoviesUrl = 'http://192.168.12.201:2000/api/movies/update/';
  searchMoviesByCatageryUrl = 'http://192.168.12.201:2000/api/movies/catagery/';
  postNewSeriesUrl = 'http://192.168.12.201:2000/api/series';
  
   //To save users data
   postUser(Data): Observable<any> {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json')
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postUsers, Data, options).map(
      data => data.json());
  }
  emailVerification(code): Observable<any> { 
    return this.httpService.get(this.emailVerificationUrl+code).map(
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
    var token = localStorage.getItem("token")
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postMovieUrl, Data, options).map(
      data => data.json());
  }
  getMovies(): Observable<any> {
    var token = localStorage.getItem("token")
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.get(this.getMoviesUrl,options).map(
      (res: Response) => res.json());
  }
updateMovie(Data):Observable<any>{
  var token = localStorage.getItem("token")
  let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.put(this.updateMoviesUrl+Data.name, Data, options).map(
      data => data.json());
  }
  deleteMovie(movie): Observable<any> { 
    var token = localStorage.getItem("token")
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.delete(this.deleteMoviesUrl+movie,options).map(
      (res: Response) => res.json());
  }
  searchMovies(movie): Observable<any> {
    var token = localStorage.getItem("token")
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.get(this.searchMoviesUrl+movie,options).map(
      (res: Response) => res.json());
  }
  searchMovieCatagery(catagery): Observable<any> {
    var token = localStorage.getItem("token")
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.get(this.searchMoviesByCatageryUrl+catagery,options).map(
      (res: Response) => res.json());
  }
  postNewSeries(Data):Observable<any>{
    var token = localStorage.getItem("token")
    let headers = new Headers({ 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token });
    let options = new RequestOptions({ headers: headers });
    return this.httpService.post(this.postNewSeriesUrl, Data, options).map(
      data => data.json());
  }


}
