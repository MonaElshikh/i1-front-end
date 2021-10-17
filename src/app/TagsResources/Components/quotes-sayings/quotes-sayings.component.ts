import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppErrorHandler } from 'Shared/models/app-error-handler';
import {
  appKeywordQuotes,
  appTagsResources,
} from 'TagsResources/models/tags-resources';
import { QuotesSayingsService } from '../../Services/quotes-sayings.service';

@Component({
  selector: 'app-quotes-sayings',
  templateUrl: './quotes-sayings.component.html',
  styleUrls: ['./quotes-sayings.component.css'],
})
export class QuotesSayingsComponent implements OnInit, OnDestroy {
  constructor(private QuotesSayingsService: QuotesSayingsService) {}
  articlesList: appTagsResources[] = [];
  keyWordQuotes: appKeywordQuotes[] = [];
  keys: string[] = [];
  keywords = '';
  subscribtion: Subscription;
  url = '/Quotes-Sayings/';
  header =
    'Quotes & Sayings – Articles, Blogs, Comments, Discussions, Postings';
  lbl1 =
    'Here you will find the best collection of articles on Quotes & Sayings.';
  lbl2 = 'Please feel free to browse them and leave your comments.';
  ngOnInit(): void {
    this.fillArticleList();
  }

  fillArticleList() {
    this.QuotesSayingsService.clearList(this.articlesList);
    (this.subscribtion = this.QuotesSayingsService.getList().subscribe(
      (data) => {
        this.QuotesSayingsService.parseKeywordQuotes(data).then((data: any) => {
          this.keyWordQuotes = data;
          for (let i = 0; i < this.keyWordQuotes.length; i++) {
            this.keywords += `${this.keyWordQuotes[i].keywords
              .split(/\s/)
              .join('')},`;
          }
          this.keys = this.keywords.split(',');
          this.keys = this.QuotesSayingsService.uniqBy(
            this.keys,
            JSON.stringify
          );
          for (let i = 0; i < this.keys.length; i++) {
            if (this.keys[i] === '') {
              continue;
            }
            this.articlesList.push({
              id: i.toString(),
              title: this.keys[i] + ' Quotes And Sayings',
              description: 'Quotes And Sayings About ' + this.keys[i],
              body: '',
              image: '',
              date: '',
              authors: { author: [{ authorLink: '', authorName: '' }] },
            });
          }
        });
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
