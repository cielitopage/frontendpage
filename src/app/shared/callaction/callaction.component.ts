import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-callaction',
  templateUrl: './callaction.component.html',
  styleUrls: ['./callaction.component.css']
})
export class CallactionComponent {

  constructor(
    private router: Router,
  ) { }

}
