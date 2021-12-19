import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import {
  appAdminArticlesComments,
  appArticleComments,
} from 'Account/models/ArticleDescription';
import { ArticleCommentsService } from 'Account/Services/article-comments.service';
import { connect } from 'http2';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-article-comments',
  templateUrl: './admin-article-comments.component.html',
  styleUrls: ['./admin-article-comments.component.css'],
})
export class AdminArticleCommentsComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  articlesCommentsList: appAdminArticlesComments[] = [];
  pageOfItems: appAdminArticlesComments[] = [];
  mainList: appAdminArticlesComments[] = [];
  edits = [];
  listCount = 0;
  Category = 'All Categories';
  constructor(
    private articleCommentS: ArticleCommentsService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.getAdminArticlesComments();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
  getAdminArticlesComments(isFiltered?: boolean) {
    this.subscription = this.articleCommentS
      .GetAdminArticlesComments()
      .subscribe((result: any) => {
        this.articlesCommentsList = result;
        if (result) {
          if (isFiltered) {
            this.filterArticlesWithCategory(this.Category);
          } else {
            this.mainList = this.articlesCommentsList;
            this.pageOfItems = this.mainList;
            this.listCount = this.mainList.length;
          }
        }
      });
  }
  articleCommentAction(articleComment: appArticleComments, action: string) {
    console.log(
      `comment: ${articleComment.comments} / Id: ${articleComment.id}`
    );
    switch (action) {
      case 'update':
        this.subscription = this.articleCommentS
          .UpdateArticleComments(articleComment)
          .subscribe((result: any) => {
            if (result) {
              this.Category === 'All Categories'
                ? this.getAdminArticlesComments()
                : this.getAdminArticlesComments(true);
            }
          });
        break;
      case 'delete':
        this.subscription = this.articleCommentS
          .DeleteArticleComments(articleComment.id)
          .subscribe(() => {
            this.Category === 'All Categories'
              ? this.getAdminArticlesComments()
              : this.getAdminArticlesComments(true);
          });
        break;
      case 'active':
        let statusComment = {
          ArticleCommentStatus:
            articleComment.articleCommentStatus === 'Active'
              ? 'InActive'
              : 'Active',
          Id: articleComment.id,
        };
        this.subscription = this.articleCommentS
          .UpdateArticleCommentStatus(statusComment)
          .subscribe((result: any) => {
            this.Category === 'All Categories'
              ? this.getAdminArticlesComments()
              : this.getAdminArticlesComments(true);
          });
        break;
      case 'abuse':
        let reportComment = {
          ReportingAbused:
            articleComment.reportingAbused === 'Abused' ? 'Unabused' : 'Abused',
          Id: articleComment.id,
        };
        this.subscription = this.articleCommentS
          .UpdateArticleCommentReporting(reportComment)
          .subscribe((result: any) => {
            this.Category === 'All Categories'
              ? this.getAdminArticlesComments()
              : this.getAdminArticlesComments(true);
          });
        break;
    }
  }
  onChangePage(pageOfItems: appAdminArticlesComments[]) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
  changeSelection(event) {
    this.filterArticlesWithCategory(event.target.value);
  }
  filterArticlesWithCategory(category: string) {
    if (category === 'All Categories') {
      this.mainList = this.articlesCommentsList;
    } else {
      this.Category = category;
      this.mainList = this.articlesCommentsList.filter(
        (e) => e.cat_Name === category
      );
    }
    this.pageOfItems = this.mainList;
    this.listCount = this.mainList.length;
  }
}
