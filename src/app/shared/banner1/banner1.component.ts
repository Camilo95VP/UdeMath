import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-banner1',
  templateUrl: './banner1.component.html',
  styleUrls: ['./banner1.component.css']
})
export class Banner1Component implements OnInit {
  currentUser: User | null = null;
  nombre: string | null | undefined;
  foto: string | null | undefined;
  email: string | null | undefined;

  constructor(
    private auth$: AuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    this.nombre = this.currentUser?.displayName;
    this.foto = this.currentUser?.photoURL
    this.email = this.currentUser?.email
  }

  setDefaultImage() {
    this.foto = 'URL_IMAGEN_POR_DEFECTO';
  }
}
