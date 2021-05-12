import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppRoutingModule } from '../../app.routing.module';
import { MatTableDataSource } from '@angular/material';

import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  issues: Issue[];
  // displayedColumns = ['title', 'responsible', 'severity', 'status', 'actions'];
  displayedColumns: string[] = ['title', 'responsible', 'severity', 'status', 'actions'];

  constructor(private issueService: IssueService, private router: Router) { }

  ngOnInit() {
    /*
    this.issueService.getIssues().subscribe((issues) => {
       console.log(issues);
    });*/
    this.fetchIssues();
  }

  fetchIssues() {
    this.issueService
    .getIssues()
    .subscribe((data: Issue[]) => {
      this.issues = data;
      // console.log(this.issues);
    });
  }

  editIssue(id: string) {
     // console.log('editIssue: ' + id);
     const str = '/edit/' + id;
     // this.router.navigate(['/edit/${id}']); // ei toiminut
     this.router.navigate([str]);
  }

  deleteIssue(id: string) {
    // console.log('ID: ' + id);
    this.issueService.deleteIssue(id).subscribe(() => {
      this.fetchIssues();
    });
  }
}
