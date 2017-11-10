import { Component, OnInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private connectService: ConnectService, private router: Router) { }

  ngOnInit() {
  }
  moviesButton=0;
  addMovieFlag=0;
  showMovieFlag=0;
  showMoivesFunction(){
    if(this.moviesButton==0){
      this.moviesButton=1;
    }
    else{
      this.moviesButton=0
    }
  }
  addMovies(){
    if(this.addMovieFlag==0){
      this.addMovieFlag=1;
    }
    else{
      this.addMovieFlag=0
    }
  }
  movie = {
    name: "",
    catagery: "",
    path: ""
  };
  addMovieToDB(){
    this.connectService.postMovie(this.movie).subscribe(res => {
      if (res.success == true) {
        this.addMovieFlag = 0;
        
        alert("Movie Added Successfully");
      }
      else {
        alert(res);
      }
    });
  }

  }



