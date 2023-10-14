import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, User } from 'firebase/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  
  isMenuOpen: boolean = false;
  currentUser: User | null = null;
  nombre: string | null | undefined;
  foto: string | null | undefined;

  constructor(
    private auth$: AuthService,
    private router: Router,
  ) { }

  async ngOnInit() {
    const auth = getAuth();
    this.currentUser = auth.currentUser;
    this.nombre = this.currentUser?.displayName;
    this.foto = this.currentUser?.photoURL
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
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

}
