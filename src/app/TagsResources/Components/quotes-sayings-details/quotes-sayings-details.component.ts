import { DatePipe } from '@angular/common';
import { typeofExpr } from '@angular/compiler/src/output/output_ast';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

import {
  appKeywordQuotes,
  appTagsResources,
} from '../../models/tags-resources';
import { QuotesSayingsService } from '../../Services/quotes-sayings.service';

@Component({
  selector: 'app-quotes-sayings-details',
  templateUrl: './quotes-sayings-details.component.html',
  styleUrls: ['./quotes-sayings-details.component.css'],
})
export class QuotesSayingsDetailsComponent implements OnInit, OnDestroy {
  TagsResourcesObject: appTagsResources;
  header =
    'Quotes & Sayings – Articles, Blogs, Comments, Discussions, Postings';
  title: string = '';
  keywordQuotes = {};
  articleId = '';
  url = '/Quotes-Sayings/';
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
    private QuotesSayingsService: QuotesSayingsService,
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
    this.listSubscribe =
      this.QuotesSayingsService.getKeywordsQuotes().subscribe(
        (data) => {
          this.QuotesSayingsService.parseKeywordQuotes(data).then(
            (data: any) => {
              this.articles = data;
              console.log(data);
              this.TagsResourcesObject.title = `${this.title} Quotes And Sayings`;
              this.TagsResourcesObject.description = `Quotes And Sayings About ${this.title}`;
              this.TagsResourcesObject.image =
                this.QuotesSayingsService.getRandomImage('Quotes-Sayings');
              this.TagsResourcesObject.date = ` ${new Date().toDateString()}`;
              this.datePipe.transform(` ${new Date().toDateString()}`);
              this.TagsResourcesObject.body = '';
              let quotes;
              for (let i = 0; i < this.articles.length; i++) {
                if (this.articles[i].keywords === undefined) {
                  continue;
                }
                if (this.articles[i].keywords.indexOf(this.title) !== -1) {
                  console.log('inside if');
                  quotes = `
                  ${this.articles[i].quote}
                  ~${this.articles[i].author}~
                  `;
                  console.log(`quote> ${quotes}`);
                  this.TagsResourcesObject.body += quotes;
                }
              }
              if (this.TagsResourcesObject === undefined) {
                this.router.navigate(['/Error']);
              }
              this.fillReadthisAndRelatedArticles();
              this.arrayLength = this.articles.length;
            }
          );
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
