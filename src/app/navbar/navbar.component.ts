import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener } from '@angular/core';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('transparentBackground', [
      state('true', style({backgroundColor: 'transparent'})),
      state('false', style({backgroundColor: '#FFC400'})), //TODO: wykorzystac kolor bazowy
      transition( '* <=> *', animate(300))
    ])
  ]
})
export class NavbarComponent {
  private TRANSPARENT_SCROLL_OFFSET: number = 40
  isTransparent: boolean = true
  isCollapsed = true;
  toggleIcon = faBars;

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed
    if(this.isCollapsed) {
      this.toggleIcon = faBars
    } else {
      this.toggleIcon = faXmark
    }
    this.isTransparent = this.isCollapsed && this.isTransparentScrollOffset()
  }

  @HostListener('window: scroll', ['$event'])
  private onScroll(event: Event): void {
    if(!this.isCollapsed) return
    this.isTransparent = this.isTransparentScrollOffset()
  }

  private isTransparentScrollOffset() {
    return window.scrollY < this.TRANSPARENT_SCROLL_OFFSET
  }
}
