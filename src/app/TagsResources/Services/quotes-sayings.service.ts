import { Injectable } from '@angular/core';
import { TagsResourcesParentService } from './tags-resources-parent.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  appKeywordQuotes,
  appTagsResources,
} from 'TagsResources/models/tags-resources';
@Injectable({
  providedIn: 'root',
})
export class QuotesSayingsService extends TagsResourcesParentService {
  constructor(http: HttpClient, private _http: HttpClient) {
    super(http, 'assets/xmls/Keywords-Quotes.xml');
  }
}
