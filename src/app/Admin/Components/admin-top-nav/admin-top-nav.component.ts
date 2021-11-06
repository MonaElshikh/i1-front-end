import { Component, OnInit } from '@angular/core';
import { AdminService } from 'app/Admin/Services/admin-service';
import { Router } from '@angular/router';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Component({
  selector: 'app-admin-top-nav',
  templateUrl: './admin-top-nav.component.html',
  styleUrls: ['./admin-top-nav.component.css'],
})
export class AdminTopNavComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private route: Router,
    private localStorage: LocalstorageService
  ) {}
  adminName = '';
  ngOnInit(): void {
    this.localStorage.getItem('adminUserId') !== ''
      ? (this.adminName = ` ${this.localStorage.getItem('adminUserId')}`)
      : (this.adminName = ` Admin`);
  }
  adminLogout() {
    this.adminService.logout();
    this.route.navigate(['/Admin-Login']);
  }
}
