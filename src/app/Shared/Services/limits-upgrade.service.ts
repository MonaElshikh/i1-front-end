import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DataService } from 'Shared/Services/data.service';
import { environment } from '../../../environments/environment';
import { LocalstorageService } from 'Shared/Services/local-storage.service';
@Injectable({
  providedIn: 'root',
})
export class LimitsAndUpgradeService extends DataService {
  constructor(
    http: HttpClient,
    private _http: HttpClient,
    localStorage: LocalstorageService
  ) {
    super(http, environment.BASE_URL + '/AdminSettings', localStorage);
  }
  GetMainMemberships() {
    return this._http.get(environment.BASE_URL + '/GetAllmemberships');
  }
  GetProfilePaymentInfo(profileId) {
    return this._http.get(
      environment.BASE_URL + '/ProfilePayment/' + profileId
    );
  }
  InsertUpdateProfilePaymentInfo(paymentInfo: any) {
    return this._http.post(
      environment.BASE_URL + '/ProfilePayment',
      paymentInfo
    );
  }
  GetUpgradeHistory(profileId: any) {
    return this._http.get(
      environment.BASE_URL + '/UpgradeHistory/' + profileId
    );
  }
  GetMemberShipDetails() {
    return this._http.get(environment.BASE_URL + '/MemberShipDetails');
  }
  RequestUpgrade(upgrade: any) {
    return this._http.post(environment.BASE_URL + '/RequestUpgrade', upgrade);
  }
  AddMembershipPricing(membershipPlan) {
    return this._http.post(
      environment.BASE_URL + '/AddMembershipPricing',
      membershipPlan
    );
  }
  UpdateMembershipPricing(memberShipPlan: any) {
    return this._http.post(
      environment.BASE_URL + '/UpdateMembershipPricing',
      memberShipPlan
    );
  }
  DeleteMemberShipPricing(id: any) {
    return this._http.get(
      environment.BASE_URL + '/DeleteMembershipPricing/' + id
    );
  }
  GetPostedArticlesForAdmin() {
    return this._http.get(environment.BASE_URL + '/PostedArticles');
  }
  DeletePostedArticles(id: any) {
    return this._http.get(environment.BASE_URL + '/PostedArticles/' + id);
  }
  UpdatePostedArticleStatus(postedArticle: any) {
    return this._http.post(
      environment.BASE_URL + '/PostedArticles',
      postedArticle
    );
  }
  UpdatePostedArticleLock(postedArticle: any) {
    return this._http.post(
      environment.BASE_URL + '/PostingLock',
      postedArticle
    );
  }
  SearchAdminArticles(article: any) {
    return this._http.post(
      environment.BASE_URL + '/SearchAdminArticles',
      article
    );
  }
}
