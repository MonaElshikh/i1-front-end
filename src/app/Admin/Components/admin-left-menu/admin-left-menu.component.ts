import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-admin-left-menu',
  templateUrl: './admin-left-menu.component.html',
  styleUrls: ['./admin-left-menu.component.css']
})
export class AdminLeftMenuComponent implements OnInit {
  constructor() { }
  isColapse = true;
  ngOnInit(): void {
  }
  toggleDisplay() {
    this.isColapse = !this.isColapse;
  }
}
