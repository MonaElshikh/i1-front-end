import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { appPostedArticles } from 'Shared/models/LimitsAndUpgrade';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-admin-posted-articles',
  templateUrl: './admin-posted-articles.component.html',
  styleUrls: ['./admin-posted-articles.component.css'],
})
export class AdminPostedArticlesComponent implements OnInit, OnDestroy {
  constructor(
    private AdminService: LimitsAndUpgradeService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  postedArticlesSubscription: Subscription;
  PostedArticlesList: appPostedArticles[] = [];
  pageOfItems: appPostedArticles[] = [];

  ngOnInit(): void {
    this.getPostedArticles();
  }
  ngOnDestroy() {
    if (this.postedArticlesSubscription)
      this.postedArticlesSubscription.unsubscribe();
  }
  getPostedArticles() {
    this.postedArticlesSubscription =
      this.AdminService.GetPostedArticlesForAdmin().subscribe((result: any) => {
        if (result) {
          this.PostedArticlesList = result;
        }
      });
  }
  DeletePostedArticles(id: any) {
    this.postedArticlesSubscription = this.AdminService.DeletePostedArticles(
      id
    ).subscribe((result: any) => {
      if (result) {
        this.getPostedArticles();
      }
    });
  }
  UpdatePostedArticleStatus(article: appPostedArticles, status: string) {
    article.onllinStatus = status;
    this.postedArticlesSubscription =
      this.AdminService.UpdatePostedArticleStatus(article).subscribe(
        (result: any) => {
          if (result) {
            this.getPostedArticles();
          }
        }
      );
  }
  onChangePage(pageOfItems: appPostedArticles[]) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
