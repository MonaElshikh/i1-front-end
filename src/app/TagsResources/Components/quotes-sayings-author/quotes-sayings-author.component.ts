import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';
import {
  appAuthordQuotes,
  appTagsResources,
} from 'TagsResources/models/tags-resources';
import { QuotesSayingsByAuthorService } from 'TagsResources/Services/quotes-sayings-by-author.service';

import { QuotesSayingsService } from '../../Services/quotes-sayings.service';

@Component({
  selector: 'app-quotes-sayings-author',
  templateUrl: './quotes-sayings-author.component.html',
  styleUrls: ['./quotes-sayings-author.component.css'],
})
export class QuotesSayingsAuthorComponent implements OnInit, OnDestroy {
  constructor(
    private QuotesSayingsByAuthorService: QuotesSayingsByAuthorService
  ) {}
  articlesList: appTagsResources[] = [];
  auhtorsQuotes: appAuthordQuotes[] = [];
  subscribtion: Subscription;
  authors = [];
  url = '/Quotes-Sayings-author/';
  header =
    'Quotes & Sayings – Articles, Blogs, Comments, Discussions, Postings';
  lbl1 =
    'Here you will find the best collection of articles on Quotes & Sayings.';
  lbl2 = 'Please feel free to browse them and leave your comments.';
  ngOnInit(): void {
    this.fillArticleList();
  }
  fillArticleList() {
    this.QuotesSayingsByAuthorService.clearList(this.articlesList);
    (this.subscribtion = this.QuotesSayingsByAuthorService.getList().subscribe(
      (data) => {
        this.QuotesSayingsByAuthorService.parseAuthorQuotes(data).then(
          (data: any) => {
            this.auhtorsQuotes = data;
            for (let i = 0; i < this.auhtorsQuotes.length; i++) {
              if (
                this.auhtorsQuotes[i].author === '' ||
                this.auhtorsQuotes[i].author === undefined
              ) {
                continue;
              }
              this.authors.push(this.auhtorsQuotes[i].author);
            }
            //print all auhtors
            console.log(`all authors list length ${this.authors.length}`);
            console.log(`all authors list ${this.authors}`);

            //print net auhtors
            this.authors = this.QuotesSayingsByAuthorService.uniqBy(
              this.authors,
              JSON.stringify
            );
            console.log(`net authors list length ${this.authors.length}`);
            console.log(`net authors list  ${this.authors}`);

            //loop authors and fill article list
            for (let auth of this.authors) {
              this.articlesList.push({
                id: '',
                title: `${auth} Quotes And Sayings`,
                description: `Quotes And Sayings About ${auth}`,
                body: '',
                image: '',
                date: '',
                authors: { author: [{ authorLink: '', authorName: '' }] },
              });
            }
          }
        );
      }
    )),
      (error: AppErrorHandler) => {
        throw error;
      };
  }
  ngOnDestroy() {
    if (this.subscribtion) this.subscribtion.unsubscribe();
  }
}
