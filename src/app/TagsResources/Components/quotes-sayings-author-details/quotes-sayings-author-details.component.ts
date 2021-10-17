import { DatePipe } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { QuotesSayingsByAuthorService } from 'TagsResources/Services/quotes-sayings-by-author.service';

import {
  appAuthordQuotes,
  appTagsResources,
} from '../../models/tags-resources';

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
  author = '';
  list: any = [];
  articlesList: any = [];
  readThisList: any = [];
  extraList = [];
  articles: appAuthordQuotes[];
  authors: any = [];
  arrayLength: number;
  subscript: Subscription;
  listSubscribe: Subscription;
  subscription: Subscription;
  constructor(
    private QuotesSayingsAuthorService: QuotesSayingsByAuthorService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private datePipe: DatePipe
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.fillAllArticles();
  }
  filKeywordsQuotes() {
    this.QuotesSayingsAuthorService.clearList(this.list);
    for (let i = 0; i < this.articles.length; i++) {
      if (
        this.articles[i].author === '' ||
        this.articles[i].author === undefined
      ) {
        continue;
      }
      this.authors.push(this.articles[i].author);
    }

    for (let i = 0; i < this.author.length; i++) {
      if (this.author[i] === this.author) {
        continue;
      }
      this.list.push({
        id: i.toString(),
        title: this.authors[i] + ' Quotes And Sayings',
        description: 'Quotes And Sayings About ' + this.authors[i],
        body: '',
        image: '',
        date: '',
        authors: { author: [{ authorLink: '', authorName: '' }] },
      });
    }
    console.log(
      `all author quotes list length from filKeywordsQuotes fun ${this.list.length}`
    );
    return this.list;
  }
  fillReadthisAndRelatedArticles() {
    //clear lists
    this.QuotesSayingsAuthorService.clearList(this.readThisList);
    this.QuotesSayingsAuthorService.clearList(this.articlesList);
    this.QuotesSayingsAuthorService.clearList(this.extraList);
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
      this.author = this.title
        .substring(0, this.title.indexOf('Quotes'))
        .trim();
      console.log(`Quote author ${this.author}`);
    });
    //fill the main list
    this.listSubscribe = this.QuotesSayingsAuthorService.getList().subscribe(
      (data) => {
        this.QuotesSayingsAuthorService.parseAuthorQuotes(data).then(
          (data: any) => {
            this.articles = data;
            this.TagsResourcesObject.title = this.title;
            this.TagsResourcesObject.description = `Quotes And Sayings About ${this.author}`;
            this.TagsResourcesObject.image =
              this.QuotesSayingsAuthorService.getRandomImage('Quotes-Sayings-author');
            this.TagsResourcesObject.date = ` ${new Date().toDateString()}`;
            this.datePipe.transform(` ${new Date().toDateString()}`);
            this.TagsResourcesObject.body = '';
            let quotes;
            console.log(`articles list length ${this.articles.length}`);
            for (let i = 0; i < this.articles.length; i++) {
              if (this.articles[i].author.trim() === this.author) {
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
          }
        );
      },
      (error: AppErrorHandler) => {
        throw error;
      }
    );
  }
  ngOnDestroy() {
    if (this.subscript) this.subscript.unsubscribe();
    if (this.listSubscribe) this.listSubscribe.unsubscribe();
    if (this.subscription) this.subscription.unsubscribe();
  }
}
