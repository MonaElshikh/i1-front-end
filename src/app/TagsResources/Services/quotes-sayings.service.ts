import { Injectable } from '@angular/core';
import { TagsResourcesParentService } from './tags-resources-parent.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
@Injectable({
  providedIn: 'root',
})
export class QuotesSayingsService extends TagsResourcesParentService {
  constructor(http: HttpClient, private _http: HttpClient) {
    super(http, 'assets/xmls/Quotes-Sayings.xml');
  }

  getKeywordsQuotes() {
    return this._http.get('assets/xmls/Keywords-Quotes.xml', {
      responseType: 'text',
    });
  }

}
