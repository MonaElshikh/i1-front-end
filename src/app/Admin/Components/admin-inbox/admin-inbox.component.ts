import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { appTicketDetailstbl, appTicketMaster } from 'Account/models/support';
import { SupportService } from 'Account/Services/support.service';
import { Subscription } from 'rxjs';
import { LocalstorageService } from 'Shared/Services/local-storage.service';

@Component({
  selector: 'app-admin-inbox',
  templateUrl: './admin-inbox.component.html',
  styleUrls: ['./admin-inbox.component.css'],
})
export class AdminInboxComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  adminTicketsList: appTicketMaster[] = [];
  pageOfItems: appTicketMaster[] = [];
  ticktesDetailsList: appTicketDetailstbl[] = [];
  adminId;
  ticketId;
  profileId;
  selected = [];
  ShowNewTicket = false;
  ShowTicketDetails = false;
  ProblemStatus = '';
  replyMeesage = '';
  users = '';
  userName = '';
  problemRemainingChars = 0;
  subjectRemainingChars = 0;
  messageRemainingChars = 0;
  constructor(
    private supportS: SupportService,
    private localStorage: LocalstorageService,
    @Inject(PLATFORM_ID) private platformId: any
  ) {}

  ngOnInit(): void {
    this.adminId = parseInt(this.localStorage.getItem('id'));
    this.bindAdminTicketLists();
  }
  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  async bindAdminTicketLists() {
    this.subscription = await (
      await this.supportS.GetAdminTickets(this.adminId)
    ).subscribe((result: any) => {
      if (result) {
        this.adminTicketsList = result;
        console.log(`admin tickets list : ${this.adminTicketsList.length};
        }`);
      }
    });
  }
  //Add admin ticket
  //Add new ticket
  async createTicket(frm: NgForm) {
    console.log(frm.value);
    this.users = frm.value['users'].split(' ');
    console.log(`users: ${this.users}`);
    const ticket = {
      // UserId: this.profileId,
      TypeOfProblem: frm.value['typeOfProblem'],
      ProblemName: frm.value['Subject'],
      UserComments: frm.value['problem'],
      isAdmin: '1',
    };
    console.log('new ticket>> ' + ticket);
    if (frm.valid) {
      this.subscription = (await this.supportS.AddTicket(ticket)).subscribe(
        () => {
          this.bindAdminTicketLists();
          this.ShowNewTicket = false;
          this.ShowTicketDetails = false;
          this.clearRowsStyle();
        }
      );
    } else {
      console.log(`form not valid`);
    }
  }
  //Add admin reply ticket
  async ReplyTicket() {
    const ticket = {
      Id: this.ticketId,
      AdminId: this.adminId,
      UserId: this.profileId,
      UserComments: this.replyMeesage,
      ProblemStatus: this.ProblemStatus,
      AdminComments: this.replyMeesage,
    };
    console.log(`sent ticekt> ${ticket}`);
    this.subscription = (
      await this.supportS.AddAdminTicketReply(ticket)
    ).subscribe(() => {
      this.replyMeesage = '';
      this.messageRemainingChars = 0;
      this.bindTicketDetails(this.ticketId);
    });
  }
  //Open ticket Details
  openTicketDetails(ticket: appTicketMaster, RowIndex: number) {
    this.clearRowsStyle();
    this.selected[RowIndex] = true;
    this.ticketId = ticket.id;
    this.profileId = ticket.userId;
    this.ProblemStatus = ticket.problemStatus;
    this.userName = ticket.sname;
    this.ShowTicketDetails = true;
    console.log('ticket id>> ' + this.ticketId);
    this.bindTicketDetails(this.ticketId);
  }
  //Bind Ticket details
  async bindTicketDetails(id) {
    this.subscription = (await this.supportS.GetTicketsDetials(id)).subscribe(
      (result: any) => {
        if (result) {
          this.ticktesDetailsList = result;
        }
      }
    );
  }
  showHideButtons(action: string) {
    this.clearRowsStyle();
    switch (action) {
      case 'newticket':
        this.ShowNewTicket = true;
        this.ShowTicketDetails = false;
        break;
      case 'cancelnew':
        this.ShowNewTicket = false;
        this.subjectRemainingChars = 0;
        break;
      case 'cancelreply':
        this.ShowTicketDetails = false;
        this.replyMeesage = '';
        this.messageRemainingChars = 0;
        break;
    }
  }
  clearRowsStyle() {
    for (var i = 0; i < this.adminTicketsList.length; i++) {
      this.selected[i] = false;
    }
  }
  onChangePage(pageOfItems: Array<any>) {
    // update current page of items
    this.pageOfItems = pageOfItems;
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }
}
