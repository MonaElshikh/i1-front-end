import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { appAdmin } from 'app/Admin/models/app-admin';
import { AdminService } from 'app/Admin/Services/admin-service';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-edit-profile',
  templateUrl: './admin-edit-profile.component.html',
  styleUrls: ['./admin-edit-profile.component.css'],
})
export class AdminEditProfileComponent implements OnInit {
  adminsList: appAdmin[];
  selected = [];
  edits = [];
  subscription: Subscription;
  editMode = false;
  isMain = false;
  newProfile = false;
  constructor(
    private adminService: AdminService,
    private localStorage: LocalstorageService,
    private toster: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAdmins();
  }
  getAdmins() {
    this.localStorage.getItem('isMain') === '1'
      ? (this.isMain = true)
      : (this.isMain = false);
    this.subscription = this.adminService
      .getAllAdmins()
      .subscribe((result: any) => {
        if (result) {
          this.adminsList = result;
          console.log(
            `id: ${this.adminsList[1].id} | userId: ${
              this.adminsList[1].userId
            } | password: ${this.adminsList[1].password} | View: ${typeof this
              .adminsList[1].view} | Add: ${this.adminsList[1].add} | Edit: ${
              this.adminsList[1].edit
            } | Delete: ${this.adminsList[1].delete}`
          );
        }
      });
  }
  modifyAdmin(admin: appAdmin, action: string) {
    switch (action) {
      case 'update':
        console.log(
          `id: ${admin.id} | userId: ${admin.userId} | password: ${admin.password} | View: ${admin.view} | Add: ${admin.add} | Edit: ${admin.edit} | Delete: ${admin.delete}`
        );
        this.subscription = this.adminService
          .updateAdmin(admin)
          .subscribe(() => {
            this.toster.success('Updated Successfully');
            this.getAdmins();
          });
        break;
      case 'delete':
        this.subscription = this.adminService
          .deleteAdmin(admin.id)
          .subscribe(() => {
            this.toster.success('Deleted Successfully');
            this.getAdmins();
          });
        break;
    }
  }
  changeState(event, admin: appAdmin, state: string) {
    console.log(`checbox checked : ${event.target.checked} | state : ${state}`);
    switch (state) {
      case 'add':
        event.target.checked ? (admin.add = '1') : (admin.add = '0');
        break;
      case 'edit':
        event.target.checked ? (admin.edit = '1') : (admin.edit = '0');
        break;
      case 'view':
        event.target.checked ? (admin.view = '1') : (admin.view = '0');
        break;
      case 'delete':
        event.target.checked ? (admin.delete = '1') : (admin.delete = '0');
        break;
    }
  }
}
