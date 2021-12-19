import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { AdminService } from 'app/Admin/Services/admin-service';
import { Subscription } from 'rxjs';
import { appUpgrade } from 'Shared/models/LimitsAndUpgrade';

@Component({
  selector: 'app-admin-upgrade',
  templateUrl: './admin-upgrade.component.html',
  styleUrls: ['./admin-upgrade.component.css'],
})
export class AdminUpgradeComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  upgradesList: appUpgrade[] = [];
  pageOfItems: appUpgrade[] = [];

  constructor(
    private adminS: AdminService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.getAdminUpgrades();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  getAdminUpgrades() {
    this.subscription = this.adminS
      .getActiveUpgradesForAdmin()
      .subscribe((result: any) => {
        if (result) {
          this.upgradesList = result;
        }
      });
  }
  adminUpgradeAction(id: number, action: string) {
    let adminUpgrade = { id: id, adminStatus: action };
    this.subscription = this.adminS
      .requestUpgradeAdminAction(adminUpgrade)
      .subscribe((result: any) => {
        if (result) {
          this.getAdminUpgrades();
        }
      });
  }
  onChangePage(pageOfItems: appUpgrade[]) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
