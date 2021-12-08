import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { resourceUsage } from 'process';
import { Subscription } from 'rxjs';
import {
  appMainMemberships,
  appMembership,
} from 'Shared/models/LimitsAndUpgrade';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

@Component({
  selector: 'app-admin-memberships',
  templateUrl: './admin-memberships.component.html',
  styleUrls: ['./admin-memberships.component.css'],
})
export class AdminMembershipsComponent implements OnInit, OnDestroy {
  mainMembershipsList: appMainMemberships[] = [];
  membershipList: appMembership[] = [];
  basicMembershipObject: appMembership = {} as appMembership;
  premiumMembershipObject: appMembership = {} as appMembership;
  featuredMembershipObject: appMembership = {} as appMembership;

  basicMembership: appMembership[] = [];
  premiumMembership: appMembership[] = [];
  featuredMembership: appMembership[] = [];
  UpgradeSubscription: Subscription;
  basciSelected = [];
  basicEdits = [];
  premiumSelected = [];
  premiumEdits = [];
  featuredSelected = [];
  featuredEdits = [];
  isMain = false;
  basicPlalnId = 0;
  premiumPlanId = 0;
  featuredPlanId = 0;
  constructor(
    private LimitsAndUpgradeService: LimitsAndUpgradeService,
    private localStorage: LocalstorageService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.localStorage.getItem('isMain') === '1'
      ? (this.isMain = true)
      : (this.isMain = false);
    this.getMainMemberships();
    this.getAllMemberships();
  }
  ngOnDestroy() {
    if (this.UpgradeSubscription) this.UpgradeSubscription.unsubscribe();
  }
  getMainMemberships() {
    this.UpgradeSubscription =
      this.LimitsAndUpgradeService.GetMainMemberships().subscribe(
        (result: any) => {
          if (result) {
            this.mainMembershipsList = result;
            this.mainMembershipsList.filter((item) => {
              item.name === 'Basic'
                ? (this.basicPlalnId = item.id)
                : item.name === 'Premium'
                ? (this.premiumPlanId = item.id)
                : item.name === 'Featured'
                ? (this.featuredPlanId = item.id)
                : '';
            });
          }
        }
      );
    console.log(
      `basicId: ${this.basicPlalnId} / premiumId: ${this.premiumPlanId} / featuredId: ${this.featuredPlanId}`
    );
  }
  getAllMemberships() {
    this.UpgradeSubscription =
      this.LimitsAndUpgradeService.GetMemberShipDetails().subscribe(
        (result: any) => {
          if (result) {
            this.membershipList = result;
            this.basicMembership = this.membershipList.filter(
              (item) => item.name === 'Basic'
            );
            this.premiumMembership = this.membershipList.filter(
              (item) => item.name === 'Premium'
            );
            this.featuredMembership = this.membershipList.filter(
              (item) => item.name === 'Featured'
            );
          }
        }
      );
  }
  addMembershipPlan(form: NgForm, planName: string) {
    console.log(`basic form value: ${form.value}`);
    switch (planName) {
      case 'basic':
        this.basicMembershipObject.memberShipId = this.basicPlalnId;
        console.log(`duraton: ${this.basicMembershipObject.duration}`);
        console.log(`price: ${this.basicMembershipObject.price}`);
        console.log(`curancy: ${this.basicMembershipObject.curancy}`);
        console.log(`coupon: ${this.basicMembershipObject.couponCode}`);
        console.log(`discount: ${this.basicMembershipObject.discount}`);
        console.log(`percentage: ${this.basicMembershipObject.percentamount}`);
        console.log(
          `coupon-usage: ${this.basicMembershipObject.coponCodeUsage}`
        );
        this.UpgradeSubscription =
          this.LimitsAndUpgradeService.AddMembershipPricing(
            this.basicMembershipObject
          ).subscribe((result: any) => {
            if (result) {
              this.getAllMemberships();
            }
          });
        break;
      case 'premium':
        this.premiumMembershipObject.memberShipId = this.premiumPlanId;
        console.log(`duraton: ${this.premiumMembershipObject.duration}`);
        console.log(`price: ${this.premiumMembershipObject.price}`);
        console.log(`curancy: ${this.premiumMembershipObject.curancy}`);
        console.log(`coupon: ${this.premiumMembershipObject.couponCode}`);
        console.log(`discount: ${this.premiumMembershipObject.discount}`);
        console.log(
          `percentage: ${this.premiumMembershipObject.percentamount}`
        );
        console.log(
          `coupon-usage: ${this.premiumMembershipObject.coponCodeUsage}`
        );
        this.UpgradeSubscription =
          this.LimitsAndUpgradeService.AddMembershipPricing(
            this.premiumMembershipObject
          ).subscribe((result: any) => {
            if (result) {
              this.getAllMemberships();
            }
          });
        break;
      case 'featured':
        this.featuredMembershipObject.memberShipId = this.featuredPlanId;
        console.log(`duraton: ${this.featuredMembershipObject.duration}`);
        console.log(`price: ${this.featuredMembershipObject.price}`);
        console.log(`curancy: ${this.featuredMembershipObject.curancy}`);
        console.log(`coupon: ${this.featuredMembershipObject.couponCode}`);
        console.log(`discount: ${this.featuredMembershipObject.discount}`);
        console.log(
          `percentage: ${this.featuredMembershipObject.percentamount}`
        );
        console.log(
          `coupon-usage: ${this.featuredMembershipObject.coponCodeUsage}`
        );
        this.UpgradeSubscription =
          this.LimitsAndUpgradeService.AddMembershipPricing(
            this.featuredMembershipObject
          ).subscribe((result: any) => {
            if (result) {
              this.getAllMemberships();
            }
          });
        break;
    }
  }
  updateMembershipPricing(updatedObject: appMembership) {
    this.UpgradeSubscription =
      this.LimitsAndUpgradeService.UpdateMembershipPricing(
        updatedObject
      ).subscribe((result: any) => {
        if (result) {
          this.getAllMemberships();
        }
      });
  }
  deleteMemberShipPlan(id: any) {
    this.UpgradeSubscription =
      this.LimitsAndUpgradeService.DeleteMemberShipPricing(id).subscribe(
        (result: any) => {
          if (result) {
            this.getAllMemberships();
          }
        }
      );
  }
}
