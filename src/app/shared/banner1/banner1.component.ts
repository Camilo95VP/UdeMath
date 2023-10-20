import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
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

  menuVisible = false

  constructor(
    private auth$: AuthService,
    private router: Router,
    private renderer: Renderer2, 
    private el: ElementRef
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

  eliminarCuenta(){

  }

  toggleMenu() {
    this.menuVisible = !this.menuVisible;
    if (this.menuVisible) {
      this.renderer.addClass(document.body, 'noscroll'); // Agregar clase para bloquear scroll
    } else {
      this.renderer.removeClass(document.body, 'noscroll'); // Quitar clase para habilitar scroll
    }
  }
}
