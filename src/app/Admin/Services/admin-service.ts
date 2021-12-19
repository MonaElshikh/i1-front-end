import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DataService } from 'Shared/Services/data.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class AdminService extends DataService {
  jwt: JwtHelperService;
  constructor(
    http: HttpClient,
    private _http: HttpClient,
    localStorage: LocalstorageService
  ) {
    super(http, environment.BASE_URL + '/AdminLogin', localStorage);
  }
  getAllAdmins() {
    return this._http.get(environment.BASE_URL + '/GetUpdateAdmins');
  }
  updateAdmin(admin: any) {
    return this._http.post(environment.BASE_URL + '/GetUpdateAdmins', admin);
  }
  deleteAdmin(id: any) {
    return this._http.get(environment.BASE_URL + '/DeleteAdmin/' + id);
  }
  getActiveUpgradesForAdmin() {
    return this._http.get(environment.BASE_URL + '/AdminUpgrade');
  }
  requestUpgradeAdminAction(upgrade: any) {
    return this._http.post(environment.BASE_URL + '/AdminUpgrade', upgrade);
  }
}
