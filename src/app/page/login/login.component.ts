import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;


  constructor(
    private auth$: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
    })
  }

  ngOnInit() {
  }

  login() {
    this.auth$.loginWithGoogle()
      .then(response => {
        this.toastr.success('Logueado con google 😎');

        console.log(response);
        this.router.navigate(['home']);
      })
      .catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.toastr.error('El correo ya está en uso con su cuenta de github', 'Error');
        }
      }
      )
  }

  cuentaRedirect() {
    this.router.navigate(['cuenta'])
  }

  loginWithGitHubBtn() {
    this.auth$.loginWithGitHub()
      .then(response => {
        this.toastr.success('Logueado con git hub 🖤');
        console.log(response);
        this.router.navigate(['home'])
      }).catch(error => {
        if (error.code === 'auth/account-exists-with-different-credential') {
          this.toastr.error('El correo ya está en uso con su cuenta de google', 'Error');
        }
      })

  }

  onSubmit() {

    this.auth$.login(this.formLogin.value)
      .then(response => {
        console.log(response);
        this.toastr.success('De vuelta! 😎');
        this.router.navigate(['home']);
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/wrong-password') {
          this.toastr.error('Contraseña incorrecta', 'Error');
        } else if (error.code === 'auth/user-not-found') {
          this.toastr.error('Usuario no encontrado', 'Error');
        } else {
          this.toastr.error('Ha ocurrido un error en el inicio de sesión', 'Error');
        }
      });
  }



}
