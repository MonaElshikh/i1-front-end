import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TagsResourcesParentService } from './tags-resources-parent.service';

@Injectable({
  providedIn: 'root',
})
export class QuotesSayingsByAuthorService extends TagsResourcesParentService {
  constructor(private _http: HttpClient, http: HttpClient) {
    super(http, 'assets/xmls/Authors-Quotes.xml');
  }
}
