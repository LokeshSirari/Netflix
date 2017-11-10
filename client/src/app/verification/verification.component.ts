import { Component, OnInit } from '@angular/core';
import { ActivatedRouteSnapshot,Router,ActivatedRoute } from '@angular/router';
import { ConnectService } from '../connect.service';
@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent implements OnInit {
code:any
  constructor(private route: ActivatedRoute,private connectService: ConnectService,private router:Router) { 
     this.code = route.snapshot.params.code;
     this.connectService.emailVerification(this.code).subscribe(res => {
       if(res.success==false){
         alert("Something Went Wrong. Email not Verified");

       }
       if(res.success==true){
         this.router.navigate(['/home'])
       }
     });

  }

  ngOnInit() {
    
  }

}
