import { Component, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';
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
  isNavbarScrolled: boolean = false

  constructor(private elementRef: ElementRef) {}

  toggleCollapse() {
    const modalDiv = this.elementRef.nativeElement.querySelector('#myModal')
    const collapsedMenu = this.elementRef.nativeElement.querySelector('.collapse')
    this.isCollapsed = !this.isCollapsed;
    this.isBackgroundWhite = !this.isBackgroundWhite
    if(this.isCollapsed) {
      this.toggleIcon = faBars
      modalDiv!.style.display = 'none'
      collapsedMenu.style.paddingBottom = '0'
    } else {
      this.toggleIcon = faXmark
      modalDiv!.style.display = 'block'
      collapsedMenu.style.paddingBottom = '20px'
    }
  }

  @HostListener('window: scroll', ['$event'])
  addBackgroundToNavbar(event: Event) {
    this.isBackgroundWhite = window.scrollY >= 56;
    this.isNavbarScrolled = window.scrollY >= 56;
  }
}
