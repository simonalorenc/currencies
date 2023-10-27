import { Component } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isCollapsed = true;
  toggleIcon = faBars;
  isBackgroundWhite: boolean = false

  toggleCollapse() {
    const modalDiv = document.getElementById('myModal')
    this.isCollapsed = !this.isCollapsed;
    this.isBackgroundWhite = !this.isBackgroundWhite
    if(this.isCollapsed) {
      this.toggleIcon = faBars
      modalDiv!.style.display = 'none'
    } else {
      this.toggleIcon = faXmark
      modalDiv!.style.display = 'block'
    }
  }
}
