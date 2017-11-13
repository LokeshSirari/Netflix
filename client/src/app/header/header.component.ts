import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private connectService: ConnectService, private router: Router) { }

  ngOnInit() {
  }
  userInput = {
    firstname: "",
    password: "",
    lastname: "",
    role: 0,
    email:"",
    status:""
  };
  loginInput = {
    empId: "",
    password: ""
  };
  signup() {
    this.connectService.postUser(this.userInput).subscribe(res => {
      if (res.success == true) {
        alert("User Added Successfully");
      }
    });
  }
  flag = 0;
  login() {
    this.connectService.postLogin(this.loginInput).subscribe(res => {
      console.log(res)
      if(res.success==true){
        this.flag=1;
             localStorage.setItem("loginStatus", res.role);
          
        if (res.role == 1) {
          //alert("admin login");
                this.router.navigate(['/admin']);
              }
              else if (res.role == 2) {
                this.router.navigate(['/user']);
              
              }
              else if(res.role == 0){
                alert("Verify Your Email");
              }

      }
      if (this.flag == 0) {
        alert("invalid details")
      }

    })

  }

}
