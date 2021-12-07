import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { appLimits } from 'Shared/models/LimitsAndUpgrade';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-admin-limits',
  templateUrl: './admin-limits.component.html',
  styleUrls: ['./admin-limits.component.css'],
})
export class AdminLimitsComponent implements OnInit, OnDestroy {
  limits: appLimits = {} as appLimits;
  limitsObject: appLimits = {} as appLimits;
  LimitsSubscription: Subscription;
  constructor(
    private LimitsAndUpgradeService: LimitsAndUpgradeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getAllLimits();
  }
  ngOnDestroy() {
    if (this.LimitsSubscription) this.LimitsSubscription.unsubscribe();
  }
  async getAllLimits() {
    this.LimitsSubscription = (
      await this.LimitsAndUpgradeService.getAll()
    ).subscribe((result: any) => {
      if (result) {
        this.limits = result[0];
        console.log(
          'Limits From settings >>' + this.limits.personalPremiumRequestLimit
        );
      }
    });
  }
  async SaveLimits(form: NgForm) {
    this.limitsObject.id = this.limits.id;
    this.limitsObject.personalRegularRequestLimit =
      this.limits.personalRegularRequestLimit;
    this.limitsObject.personalPremiumRequestLimit =
      this.limits.personalPremiumRequestLimit;
    this.limitsObject.personalFeaturedRequestLimit =
      this.limits.personalFeaturedRequestLimit;

    this.limitsObject.personalRegularArticleLimit =
      this.limits.personalRegularArticleLimit;
    this.limitsObject.personalPremiumArticleLimit =
      this.limits.personalPremiumArticleLimit;
    this.limitsObject.personalFeaturedArticleLimit =
      this.limits.personalFeaturedArticleLimit;

    this.limitsObject.regularalphotosNo = this.limits.regularalphotosNo;
    this.limitsObject.premiumphotosNo = this.limits.premiumphotosNo;
    this.limitsObject.featuredphotosNo = this.limits.featuredphotosNo;

    //print values
    console.log(`id:  ${this.limitsObject.id}
                 personalRegularRequestLimit: ${this.limitsObject.personalRegularRequestLimit}
                 personalPremiumRequestLimit: ${this.limitsObject.personalPremiumRequestLimit}
                 personalFeaturedRequestLimit: ${this.limitsObject.personalFeaturedRequestLimit}`);
    if (form.valid) {
      this.LimitsSubscription = (
        await this.LimitsAndUpgradeService.create(this.limitsObject)
      ).subscribe((result: any) => {
        if (result) {
          this.toastr.success('Data Saved Successfully');
        }
      });
    } else {
      this.toastr.error('Something got wrong');
    }
  }
}
