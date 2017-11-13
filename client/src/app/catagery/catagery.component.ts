import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-catagery',
  templateUrl: './catagery.component.html',
  styleUrls: ['./catagery.component.css']
})
export class CatageryComponent implements OnInit {

  constructor(private connectService: ConnectService, private router: Router) { }

  ngOnInit() {
  }
  showMoviesFlag=0;
  movies:any;
  getCatagery(catagery){
    if(this.showMoviesFlag==0){

    
    this.showMoviesFlag=1;
    }
    else{
      this.showMoviesFlag=0;
    }

    this.showMovieImageFlag=0;
    this.connectService. searchMovieCatagery(catagery).subscribe(res => {
      this.movies = res;
    });
  }
  select: any;
  showMovieImageFlag=0;
  showMovieImage(movie) {
    this.showMoviesFlag = 0;
    this.showMovieImageFlag = 1;
    this.select = movie;

  }
  reset(){
    this.showMoviesFlag = 0;
    this.showMovieImageFlag = 0;
  }
  logout(){
    console.log("hello")
    localStorage.setItem("loginStatus", null);
    this.router.navigate(['/home']);
  }
}
