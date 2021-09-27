import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { AppErrorHandler } from 'Shared/models/app-error-handler';
import { appTagsResources } from '../../models/tags-resources';
import { ActivityPartnerService } from '../../Services/activity-partner.service';
import { MetaTagslService } from 'Shared/Services/metaTags.service';

@Component({
  selector: 'app-activity-partner-details',
  templateUrl: './activity-partner-details.component.html',
  styleUrls: ['./activity-partner-details.component.css']
})
export class ActivityPartnerDetailsComponent implements OnInit , OnDestroy {
  TagsResourcesObject: appTagsResources;
  header = 'Activity Partner – Articles, Blogs, Comments, Discussions, Postings';
  title: string = ''; articleId: string = '';
  url = '/Activity-Partner/';
  menuUrl="/Resources";
  list: any = [];
  articlesList: any = [];
  readThisList: any = [];
  extraList = [];
  articles:any=[];
  arrayLength: number;
  subscript: Subscription;
  listSubscribe:Subscription;
  constructor(
    private ActivityPartnerService: ActivityPartnerService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private metaService: MetaTagslService) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  ngOnInit(): void {
    this.fillAllArticles();
  }
  fillAllArticles() {
    //get title parameter
    this.subscript = this.activeRoute.paramMap
      .subscribe(params => {
        this.title = params.get('title').split('-').join(' ');
      });
    //fill the main list
    this.listSubscribe = this.ActivityPartnerService.getList()
      .subscribe((data) => {
        this.ActivityPartnerService.parseXML(data)
          .then((data) => {
            this.articles = data;
            //get the current article, readthis and related articles
            if (this.title) {
              this.TagsResourcesObject = this.ActivityPartnerService.getByTitle(this.articles, this.title);
              if (this.TagsResourcesObject === undefined) {
                this.router.navigate(['/Error']);
              }
              this.fillReadthisAndRelatedArticles(this.title, this.articles);
              this.arrayLength = this.articles.length;
            }
          });
      }, (error: AppErrorHandler) => {
        throw  error;
      });
  }
  fillReadthisAndRelatedArticles(title: string, list: any[]) {
    //clear lists
    this.ActivityPartnerService.clearList(this.readThisList);
    this.ActivityPartnerService.clearList(this.articlesList);
    this.ActivityPartnerService.clearList(this.extraList);
    this.extraList = this.ActivityPartnerService.getReadthisAndRelatedArticles(list ,title).reverse();
    //fill read this articles
    for (var i = 0; i < 2; i++) {
      this.readThisList.push(this.extraList[i]);
    }
    //fill related articles
    for (var o = 2; o < 7; o++) {
      this.articlesList.push(this.extraList[o]);
    }
  }
  ngOnDestroy() {
   if(this.subscript) this.subscript.unsubscribe();
   if(this.listSubscribe)this.listSubscribe.unsubscribe();
  }
}
