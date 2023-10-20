import { Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  isMenuOpen1: boolean = false;
  isMenuOpen: boolean = false;
  currentUser: User | null = null;
  nombre: string | null | undefined;
  foto: string | null | undefined;
  email: string | null | undefined;
  menuVisible1 = false
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
    this.foto = this.currentUser?.photoURL;
    this.email = this.currentUser?.email
  }


  closeMenu() {
    this.isMenuOpen1 = false;
  }

  logout(){
    this.auth$.logout()
    .then(response => {
      console.log(response);
      this.router.navigate([''])
    })
    .catch(error => console.log(error))
   }

   videosRedirect(){
    this.router.navigate(['videos'])
   }
   inicioRedirect(){
    this.router.navigate(['inicio']);
   }

   setDefaultImage() {
    this.foto = 'URL_IMAGEN_POR_DEFECTO';
  }

  eliminarCuenta(){

  }

  toggleMenu1() {
    this.menuVisible1 = !this.menuVisible1;
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
