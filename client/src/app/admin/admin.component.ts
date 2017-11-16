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
  search:any;
  moviesButton = 0;
  addMovieFlag = 0;
  showMovieFlag = 0;
  searchMovies(){
    this.connectService.searchMovies(this.search).subscribe(res => {
      console.log(this.search)
      console.log(res);
      this.showMovieImageFlag = 0;
      this.addMovieFlag = 0;
      this.showMovieFlag = 0;
            this.showMoviesFlag = 1;
            this.movies = res;
      
          });
  }
  showMoivesFunction() {
    this.showMoviesFlag = 0;
    this.showMovieImageFlag = 0;
    this.addMovieFlag = 0;
    this.showMovieFlag = 0;
    if (this.moviesButton == 0) {
      this.moviesButton = 1;
    }
    else {
      this.moviesButton = 0
    }
  }
  addMovies() {
    this.showMoviesFlag = 0;
    this.showMovieImageFlag = 0;
    this.showMovieFlag = 0;
    if (this.addMovieFlag == 0) {
      this.addMovieFlag = 1;
    }
    else {
      this.addMovieFlag = 0
    }
  }
  movie = {
    name: "",
    catagery: "",
    path: ""
  };
  addMovieToDB() {
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
  showMoviesFlag = 0;
  showMovieImageFlag = 0;
  movies: any;
  showMovies() {
    this.showMovieImageFlag = 0;
    this.addMovieFlag = 0;
    if(this.showMoviesFlag==0){
      this.showMoviesFlag=1;
    }
    else{
      this.showMoviesFlag=0;
    }

    this.connectService.getMovies().subscribe(res => {
      this.movies = res;

    });

  }
  select: any;
  showMovieImage(movie) {
    this.showMoviesFlag = 0;
    this.showMovieImageFlag = 1;
    this.select = movie;

  }
  updateMovieFlag = 0;
  updateMovie = {
    name: "",
    newName: ""
  };
  updateMoviesFlag() {
    if (this.updateMovieFlag == 0) {
      this.updateMovieFlag = 1;
    }
    else {
      this.updateMovieFlag = 0;
    }

  }
  updateMovies(){
    this.updateMovie.name=this.select.name;
    this.connectService.updateMovie(this.updateMovie).subscribe(res => {
      if (res.success != false) {
        this.addMovieFlag = 0;
        this.updateMovieFlag=0;
        alert("Movie Updated Successfully");
      }
      else {
        alert(res.message);
      }
    });
  }
  deleteMovies(){
    this.connectService.deleteMovie(this.select.name).subscribe(res => {
      if (res.success != false) {
        this.addMovieFlag = 0;
        this.updateMovieFlag=0;
        alert("Movie Deleted Successfully");
      }
      else {
        alert(res.message);
      }
    });
  }
  //
  //Tv Series Functions and Variables
  //

  newSeries = {
    id: "",
    catagery: "",
    name: "",
    season_name:"",
    episode_name:"",
    episode:""
  };
  addSeriesFlag=0;
  addSeasonFlag=0;
  addEposideFlag=0;
  addSeries(){
    this.addSeriesFlag=1;
    this.addSeasonFlag=0;
    this.addEposideFlag=0;
  }
  addSeasonNext(){
    this.addSeriesFlag=0;
    this.addSeasonFlag=1;
    this.addEposideFlag=0;
  }
  addEpisodeNext(){
    this.addSeriesFlag=0;
    this.addSeasonFlag=0;
    this.addEposideFlag=1;
  }
  addNewSeries(){
    this.addSeriesFlag=0;
    this.addSeasonFlag=0;
    this.addEposideFlag=0;
    this.connectService.postNewSeries(this.newSeries).subscribe(res => {
      if (res.success == true) {
        alert("Movie Added Successfully");
      }
      else {
        alert(res);
      }
    });
  }


}



