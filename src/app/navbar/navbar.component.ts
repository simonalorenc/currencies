import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  navbarCollapsed = true

  toggleNavbarCollapsing() {
    const modalDiv = document.getElementById('myModal')
    this.navbarCollapsed = !this.navbarCollapsed
    if(this.navbarCollapsed) {
      modalDiv!.style.display = 'none'
    } else if(!this.navbarCollapsed) {
      modalDiv!.style.display = 'block'
    }
  }
}
