import { Component } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-breadcrumbd',
  templateUrl: './breadcrumbd.component.html',
  styleUrls: ['./breadcrumbd.component.css']
})
export class BreadcrumbdComponent  {

  public title :String | undefined;


  constructor(
           private router:Router,

  ) {
    this.getRouteData();
   }

   getRouteData(){
    this.router.events
    .subscribe(event => {
      if(event instanceof ActivationEnd){
        console.log(event.snapshot.data);
        this.title = event.snapshot.data['title'];
        document.title = this.title as string;
      }   
    })
 }

 goBack() {
  window.history.back();
 }

}
