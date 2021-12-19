import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'Shared/shared.module';
import { AdminLoginComponent } from './Components/admin-login/admin-login.component';
import { AdminLeftMenuComponent } from './Components/admin-left-menu/admin-left-menu.component';
import { AdminHomeComponent } from './Components/admin-home/admin-home.component';
import { AdminLimitsComponent } from './Components/admin-limits/admin-limits.component';
import { AdminMembershipsComponent } from './Components/admin-memberships/admin-memberships.component';
import { AdminTopNavComponent } from './Components/admin-top-nav/admin-top-nav.component';
import { AdminEditProfileComponent } from './Components/admin-edit-profile/admin-edit-profile.component';
import { AdminPostedArticlesComponent } from './Components/admin-posted-articles/admin-posted-articles.component';
import { AdminInboxComponent } from './Components/admin-inbox/admin-inbox.component';
import { AdminArticleCommentsComponent } from './Components/admin-article-comments/admin-article-comments.component';
import { AdminUpgradeComponent } from './Components/admin-upgrade/admin-upgrade.component';
@NgModule({
  declarations: [
    AdminLoginComponent,
    AdminLeftMenuComponent,
    AdminHomeComponent,
    AdminLimitsComponent,
    AdminMembershipsComponent,
    AdminTopNavComponent,
    AdminEditProfileComponent,
    AdminPostedArticlesComponent,
    AdminInboxComponent,
    AdminArticleCommentsComponent,
    AdminUpgradeComponent,
  ],
  imports: [SharedModule, RouterModule.forChild([])],
})
export class AdminModule {}
