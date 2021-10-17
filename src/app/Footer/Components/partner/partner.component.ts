import { Component, OnInit } from '@angular/core';
import { MetaDefinition } from '@angular/platform-browser';
import { PartnersService } from 'Footer/Services/partners.service';
import { Subscription } from 'rxjs';
import { MetaTagslService } from 'Shared/Services/metaTags.service';
@Component({
  selector: 'app-partner',
  templateUrl: './partner.component.html',
  styleUrls: ['./partner.component.css'],
})
export class PartnerComponent implements OnInit {
  partenersList: any = [];
  metaTags: MetaDefinition[] = [];
  DataLoading = true;
  partnerSunscription: Subscription;
  constructor(
    private meta: MetaTagslService,
    private partnerS: PartnersService
  ) {}
  ngOnInit(): void {
    this.BindPartener();
    this.DataLoading = false;
    this.SetMetaTags();
  }
  SetMetaTags() {
    this.metaTags = [
      { name: 'title', content: 'Partners | ispace1' },
      {
        name: 'description',
        content: 'Read each and every thing at ispace1 about special offers',
      },
    ];
    this.meta.SetPageTitle('Partners | ispace1');
    this.meta.UpdateMetaTags(this.metaTags);
    this.meta.setCanonicalURL();
  }
  BindPartener() {
    this.partnerSunscription = this.partnerS.getList().subscribe(
      (data) => {
        this.partnerS.parsePartnerXml(data).then((data) => {
          this.partenersList = data;
          this.DataLoading = false;
        });
      },
      (err) => {
        throw err;
      }
    );
  }
}
