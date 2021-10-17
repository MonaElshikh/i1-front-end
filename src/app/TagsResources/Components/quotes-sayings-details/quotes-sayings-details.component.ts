import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';

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
  key = '';
  keywordQuotes = {};
  articleId = '';
  url = '/Quotes-Sayings/';
  menuUrl = '/Tags';
  list: appTagsResources[] = [];
  articlesList: appTagsResources[] = [];
  readThisList: appTagsResources[] = [];
  extraList: appTagsResources[] = [];
  articles: appKeywordQuotes[];
  arrayLength: number;
  keyWordQuotes: appKeywordQuotes[] = [];
  keys: string[] = [];
  keywords = '';
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
  ngOnDestroy() {
    if (this.subscript) this.subscript.unsubscribe();
    if (this.listSubscribe) this.listSubscribe.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
  }
  filKeywordsQuotes() {
    this.QuotesSayingsService.clearList(this.list);
    this.keyWordQuotes = this.articles;
    for (let i = 0; i < this.keyWordQuotes.length; i++) {
      this.keywords += `${this.keyWordQuotes[i].keywords
        .split(/\s/)
        .join('')},`;
    }
    this.keys = this.keywords.split(',');
    this.keys = this.QuotesSayingsService.uniqBy(this.keys, JSON.stringify);
    for (let i = 0; i < this.keys.length; i++) {
      if (this.keys[i] === '' || this.key[i] === this.key) {
        continue;
      }
      this.list.push({
        id: i.toString(),
        title: this.keys[i] + ' Quotes And Sayings',
        description: 'Quotes And Sayings About ' + this.keys[i],
        body: '',
        image: '',
        date: '',
        authors: { author: [{ authorLink: '', authorName: '' }] }
      });
    }
    console.log(
      `all keys quote list length from filKeywordsQuotes fun ${this.list.length}`
    );
    return this.list;
  }
  fillReadthisAndRelatedArticles() {
    //clear lists
    this.QuotesSayingsService.clearList(this.readThisList);
    this.QuotesSayingsService.clearList(this.articlesList);
    this.QuotesSayingsService.clearList(this.extraList);
    this.extraList = this.filKeywordsQuotes().reverse();
    console.log(`extra list length  ${this.extraList.length}`);
    //fill read this articles
    for (var i = 0; i < 2; i++) {
      this.readThisList.push(this.extraList[i]);
    }
    //fill related articles
    for (var o = 2; o < 7; o++) {
      this.articlesList.push(this.extraList[o]);
    }
  }
  fillAllArticles() {
    this.TagsResourcesObject = {} as appTagsResources;
    //get title parameter
    this.subscript = this.activeRoute.paramMap.subscribe((params) => {
      this.title = params.get('title').split('-').join(' ');
      this.key = this.title.substring(0, this.title.indexOf('Quotes')).trim();
      console.log(`Quote keyword ${this.key}`);
    });
    //fill the main list
    this.listSubscribe = this.QuotesSayingsService.getList().subscribe(
      (data) => {
        this.QuotesSayingsService.parseKeywordQuotes(data).then((data: any) => {
          this.articles = data;
          this.TagsResourcesObject.title = this.title;
          this.TagsResourcesObject.description = `Quotes And Sayings About ${this.key}`;
          this.TagsResourcesObject.image =
            this.QuotesSayingsService.getRandomImage('Quotes-Sayings');
          this.TagsResourcesObject.date = ` ${new Date().toDateString()}`;
          this.datePipe.transform(` ${new Date().toDateString()}`);
          this.TagsResourcesObject.body = '';
          let quotes;
          console.log(`articles list length ${this.articles.length}`);
          for (let i = 0; i < this.articles.length; i++) {
            if (this.articles[i].quote.includes(this.key.toLowerCase())) {
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
        });
      },
      (error: AppErrorHandler) => {
        throw error;
      }
    );
  }
}
