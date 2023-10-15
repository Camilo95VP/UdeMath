import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-cuenta',
  templateUrl: './cuenta.component.html',
  styleUrls: ['./cuenta.component.css']
})
export class CuentaComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private auth$: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl(),
      confirmPassword: new FormControl()
    })
  }

  ngOnInit() {
  }

  redirectLogin() {
    this.router.navigate([''])
  }

  onSubmit() {
    const passwordControl = this.formLogin.get('password');
    const confirmPasswordControl = this.formLogin.get('confirmPassword');

    if (!passwordControl || !confirmPasswordControl) {
      console.error('Error: No se pudieron obtener los controles de contraseña.');
      return;
    }

    const password = passwordControl.value;
    const confirmPassword = confirmPasswordControl.value;

    if (password !== confirmPassword) {
      this.toastr.error('Las contraseñas no coinciden', 'Error');
      return;
    }

    this.auth$.register(this.formLogin.value)
      .then(response => {
        this.toastr.success('Registro exitoso', 'Éxito');
        this.redirectLogin();
        console.log(response);
      })
      .catch(error => {
        console.error(error);
        if (error.code === 'auth/email-already-in-use') {
          this.toastr.error('El correo ya está en uso', 'Error');
        } else if (error.code === 'auth/weak-password') {
          this.toastr.error('Contraseña débil. Debe tener al menos 6 caracteres', 'Error');
        } else {
          this.toastr.error('Ha ocurrido un error en el registro', 'Error');
        }
      })
  }
}
