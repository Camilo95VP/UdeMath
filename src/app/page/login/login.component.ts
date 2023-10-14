import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: any;

  constructor(
    private auth$: AuthService,
    private router: Router   
  ) { 
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit() {
  }

  login() {
       this.auth$.loginWithGoogle()
        .then(response => {
           console.log(response);
           this.router.navigate(['home']);
         })
         .catch(error => console.log(error))
     } 

     

}
