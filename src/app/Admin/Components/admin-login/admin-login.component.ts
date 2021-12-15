import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'app/Admin/Services/admin-service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { appAdmin } from 'app/Admin/models/app-admin';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
  isClicked = false;
  subscription: Subscription;
  isRightgData = true;
  isPw = true;
  adminsObjsct: appAdmin;
  dynamicType = 'password';
  constructor(
    private adminService: AdminService,
    private localStorage: LocalstorageService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.adminService.logout();
  }
  async signIn(form: NgForm) {
    this.isClicked = true;
    this.subscription = (await this.adminService.create(form.value)).subscribe(
      (result: any) => {
        if (result) {
          this.adminsObjsct = result[0];
          this.localStorage.setItem('adminUserId', this.adminsObjsct.userId);
          this.localStorage.setItem(
            'adminPassword',
            this.adminsObjsct.password
          );
          this.localStorage.setItem('isMain', this.adminsObjsct.isMain);
          this.localStorage.setItem('id', this.adminsObjsct.id.toString());
          this.route.navigate(['/Admin-Home']);
        }
      },
      () => {
        this.isClicked = false;
        console.log('error');
      }
    );
  }
  Reset() {
    this.isRightgData = true;
  }
  changeInputType() {
    this.isPw = !this.isPw;
    this.isPw ? (this.dynamicType = 'password') : (this.dynamicType = 'text');
  }
}
