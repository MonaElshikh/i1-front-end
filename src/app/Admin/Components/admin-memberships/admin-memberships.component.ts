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
        this.basicMembershipObject.curancy === undefined
          ? (this.basicMembershipObject.curancy = '$')
          : (this.basicMembershipObject.curancy =
              this.basicMembershipObject.curancy);
        this.basicMembershipObject.couponCode !== undefined &&
        this.basicMembershipObject.coponCodeUsage === undefined
          ? (this.basicMembershipObject.coponCodeUsage = 'Once')
          : (this.basicMembershipObject.coponCodeUsage =
              this.basicMembershipObject.coponCodeUsage);
        this.basicMembershipObject.discount !== undefined &&
        this.basicMembershipObject.percentamount === undefined
          ? (this.basicMembershipObject.percentamount = '%')
          : (this.basicMembershipObject.percentamount =
              this.basicMembershipObject.percentamount);
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
        this.premiumMembershipObject.curancy === undefined
          ? (this.premiumMembershipObject.curancy = '$')
          : (this.premiumMembershipObject.curancy =
              this.premiumMembershipObject.curancy);
        this.premiumMembershipObject.couponCode !== undefined &&
        this.premiumMembershipObject.coponCodeUsage === undefined
          ? (this.premiumMembershipObject.coponCodeUsage = 'Once')
          : (this.premiumMembershipObject.coponCodeUsage =
              this.premiumMembershipObject.coponCodeUsage);
        this.premiumMembershipObject.discount !== undefined &&
        this.premiumMembershipObject.percentamount === undefined
          ? (this.premiumMembershipObject.percentamount = '%')
          : (this.premiumMembershipObject.percentamount =
              this.premiumMembershipObject.percentamount);
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
        this.featuredMembershipObject.curancy === undefined
          ? (this.featuredMembershipObject.curancy = '$')
          : (this.featuredMembershipObject.curancy =
              this.featuredMembershipObject.curancy);
        this.featuredMembershipObject.couponCode !== undefined &&
        this.featuredMembershipObject.coponCodeUsage === undefined
          ? (this.featuredMembershipObject.coponCodeUsage = 'Once')
          : (this.featuredMembershipObject.coponCodeUsage =
              this.featuredMembershipObject.coponCodeUsage);
        this.featuredMembershipObject.discount !== undefined &&
        this.featuredMembershipObject.percentamount === undefined
          ? (this.featuredMembershipObject.percentamount = '%')
          : (this.featuredMembershipObject.percentamount =
              this.featuredMembershipObject.percentamount);
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
