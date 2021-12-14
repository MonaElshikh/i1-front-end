import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { ArticleDescriptionService } from 'Account/Services/article-description.service';
import { Subscription } from 'rxjs';
import { appPostedArticles } from 'Shared/models/LimitsAndUpgrade';
import { LimitsAndUpgradeService } from 'Shared/Services/limits-upgrade.service';
import { StringLiteralLike } from 'typescript';

@Component({
  selector: 'app-admin-posted-articles',
  templateUrl: './admin-posted-articles.component.html',
  styleUrls: ['./admin-posted-articles.component.css'],
})
export class AdminPostedArticlesComponent implements OnInit, OnDestroy {
  constructor(
    private AdminService: LimitsAndUpgradeService,
    private articleService: ArticleDescriptionService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  postedArticlesSubscription: Subscription;
  PostedArticlesList: appPostedArticles[] = [];
  pageOfItems: appPostedArticles[] = [];
  searchResults: appPostedArticles[] = [];
  categoryParam: string;
  statusParam: string;
  dateParam: Date;
  headerParam: string;
  descriptionParam: string;
  authorParam: string;
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
          this.searchResults = this.PostedArticlesList;
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
  UpdatePostedArticleReporting(article: appPostedArticles, reporting: string) {
    article.reporting = reporting;
    this.postedArticlesSubscription = this.articleService
      .UpdateArticleReporting(article)
      .subscribe((result: any) => {
        if (result) {
          this.getPostedArticles();
        }
      });
  }
  UpdatePostedArticleLock(article: appPostedArticles, lock: number) {
    article.lockUnlock = lock;
    this.postedArticlesSubscription = this.AdminService.UpdatePostedArticleLock(
      article
    ).subscribe((result: any) => {
      if (result) {
        this.getPostedArticles();
      }
    });
  }
  onChangePage(pageOfItems: appPostedArticles[]) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  Search(reset?: boolean) {
    if (reset) {
      this.categoryParam = '';
      this.authorParam = '';
      this.dateParam = null;
      this.headerParam = '';
      this.descriptionParam = '';
      this.statusParam = '';
      this.searchResults = this.PostedArticlesList;
    } else {
      console.log(
        `Category: ${this.categoryParam} .
       Status: ${this.statusParam} .
       Header: ${this.headerParam} .
       Description: ${this.descriptionParam} .
       Date: ${this.dateParam}`
      );
      this.searchResults = this.PostedArticlesList.filter(
        (e) =>
          e.category === this.categoryParam ||
          e.author.indexOf(this.authorParam) !== -1 ||
          e.reporting === this.statusParam ||
          e.onllinStatus === this.statusParam ||
          e.status === this.statusParam ||
          e.header.indexOf(this.headerParam) !== -1 ||
          e.description.indexOf(this.descriptionParam) !== -1 ||
          e.time_created === this.dateParam ||
          e.time_created === null
      );
      console.log(`
      main array: ${this.PostedArticlesList.length}
      returned array length from search : ${this.searchResults.length}.
      the first record of the returned array: ${this.searchResults}`);
    }
  }
}
