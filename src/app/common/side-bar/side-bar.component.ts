import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
declare let $: any;

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  userData: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user-data') || '{}');
  }

  logout() {
    localStorage.removeItem('first-form-group');
    localStorage.removeItem('token');
    localStorage.removeItem('user-data');
    this.router.navigate(['/login']);
  }

  adminDropDown() {
    $('.toggleSubmenu3').next('ul').toggleClass('show');
  }
  
}
