import { Component } from '@angular/core';
import { NavbarRoutingService } from '../routing/navbar-routing.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private navbarRoutingService: NavbarRoutingService, private router: Router) {}

  onClickCurrencies() {
    
    this.navbarRoutingService.onClickCurrencies()
  }
}
