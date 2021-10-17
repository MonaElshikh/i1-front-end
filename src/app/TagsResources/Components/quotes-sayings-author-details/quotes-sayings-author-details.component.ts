import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
import { QuotesSayingsByAuthorService } from 'TagsResources/Services/quotes-sayings-by-author.service';

import {
  appKeywordQuotes,
  appTagsResources,
} from '../../models/tags-resources';
import { QuotesSayingsService } from '../../Services/quotes-sayings.service';

@Component({
  selector: 'app-quotes-sayings-author-details',
  templateUrl: './quotes-sayings-author-details.component.html',
  styleUrls: ['./quotes-sayings-author-details.component.css'],
})
export class QuotesSayingsAuthorDetailsComponent implements OnInit, OnDestroy {
  TagsResourcesObject: appTagsResources;
  header =
    'Quotes & Sayings – Articles, Blogs, Comments, Discussions, Postings';
  title: string = '';
  articleId = '';
  url = '/Quotes-Sayings-author/';
  menuUrl = '/Tags';
  list: any = [];
  articlesList: any = [];
  readThisList: any = [];
  extraList = [];
  articles: appKeywordQuotes[];
  arrayLength: number;
  subscript: Subscription;
  listSubscribe: Subscription;
  subscription: Subscription;
  constructor(
    private QuotesSayingsService: QuotesSayingsByAuthorService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.fillAllArticles();
  }
  fillAllArticles() {
    this.TagsResourcesObject = {} as appTagsResources;
    //get title parameter
    this.subscript = this.activeRoute.paramMap.subscribe((params) => {
      this.title = params.get('title').split('-').join(' ');
      this.title = this.title.substring(0, this.title.indexOf('Quotes')).trim();
      console.log(`Quote keyword ${this.title}`);
    });
    //fill the main list
    this.listSubscribe = this.QuotesSayingsService.getAuthorQuotes().subscribe(
      (data) => {
        this.QuotesSayingsService.parseAuthorQuotes(data).then((data: any) => {
          this.articles = data;
          this.TagsResourcesObject.title = `${this.title} Quotes And Sayings`;
          this.TagsResourcesObject.description = `Quotes And Sayings About ${this.title}`;
          this.TagsResourcesObject.image =
            this.QuotesSayingsService.getRandomImage('Quotes-Sayings');
          this.TagsResourcesObject.date = ` ${new Date().toDateString()}`;
          this.TagsResourcesObject.body = '';
          let quotes;
          console.log(`title ${this.title}`);
          for (let i = 0; i < this.articles.length; i++) {
            if (this.articles[i].author === undefined) {
              continue;
            }
            console.log(
              `this.articles[i].author ${this.articles[i].author.trim()}`
            );
            if (this.articles[i].author.trim() === this.title) {
              console.log('inside if');
              quotes = `
                  ${this.articles[i].quote}
                  `;
              this.TagsResourcesObject.body += quotes;
            }
          }
          if (this.TagsResourcesObject === undefined) {
            this.router.navigate(['/Error']);
          }
          this.fillReadthisAndRelatedArticles();
          this.arrayLength = this.articles.length;
        });
      },
      (error: AppErrorHandler) => {
        throw error;
      }
    );
  }
  fillReadthisAndRelatedArticles() {
    //clear lists
    this.QuotesSayingsService.clearList(this.readThisList);
    this.QuotesSayingsService.clearList(this.articlesList);
    this.QuotesSayingsService.clearList(this.extraList);
    (this.subscription = this.QuotesSayingsService.getList().subscribe(
      (data) => {
        this.QuotesSayingsService.parseXML(data, true).then((data) => {
          this.list = data;
          this.extraList =
            this.QuotesSayingsService.getReadthisAndRelatedArticles(
              this.list,
              this.title
            ).reverse();
          //fill read this articles
          for (var i = 0; i < 2; i++) {
            this.readThisList.push(this.extraList[i]);
          }
          //fill related articles
          for (var o = 2; o < 7; o++) {
            this.articlesList.push(this.extraList[o]);
          }
        });
      }
    )),
      (error: AppErrorHandler) => {
        throw error;
      };
  }
  ngOnDestroy() {
    if (this.subscript) this.subscript.unsubscribe();
    if (this.listSubscribe) this.listSubscribe.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
  }
}
