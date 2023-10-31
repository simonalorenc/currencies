import { Component } from '@angular/core';
import { NavbarRoutingService } from '../routing/navbar-routing.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent {

  constructor(private navbarRoutingService: NavbarRoutingService) {}

  onClickCurrencies(): void {
    this.navbarRoutingService.onClickCurrencies()
  }
}
