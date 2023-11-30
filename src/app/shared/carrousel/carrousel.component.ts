import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrousel',
  templateUrl: './carrousel.component.html',
  styleUrls: ['./carrousel.component.css']
})
export class CarrouselComponent {

  constructor(
    private router: Router,
  ) { }

}
