import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute  
    
  ) { }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



}
