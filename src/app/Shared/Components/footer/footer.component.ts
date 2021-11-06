import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
})
export class FooterComponent implements OnInit {
  isFooterExpand = true;
  constructor(
    private route: Router,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}
  ngOnInit(): void {}
  resourcesCollapse = true;
  tagsCollapse = true;
  OpenTagsResourcesMenu(url: string) {
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
    this.route.navigate([url]);
  }

  toggleDisplay() {
    this.isFooterExpand = !this.isFooterExpand;
    // switch (box) {
    //   case 'tags':
    //     this.tagsCollapse = !this.tagsCollapse;
    //     break;
    //   case 'resources':
    //     this.resourcesCollapse = !this.resourcesCollapse;
    //     break;
    // }
  }
}
