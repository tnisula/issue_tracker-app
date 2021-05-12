import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material';

import { IssueService } from '../../issue.service';
import { Issue } from '../../issue.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  id: string;
  issue: any = {};
  updateDataIssue: any = {}; // Issue;
  updateForm: FormGroup;


  constructor(private issueService: IssueService, private router: Router,
              private route: ActivatedRoute, private snackBar: MatSnackBar, private fb: FormBuilder ) {

      this.createForm();
  }

  createForm() {
    this.updateForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: '',
      status: ''
    });

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
      // console.log('ngOnInit issue.id ' + this.id);
      // this.issue.id = '5cb9cf434e00611cd88c22c4';

      this.issueService.getIssueById(this.id).subscribe(res => {
        this.issue = res;
        this.updateForm.get('title').setValue(this.issue.title);
        this.updateForm.get('responsible').setValue(this.issue.responsible);
        this.updateForm.get('description').setValue(this.issue.description);
        this.updateForm.get('severity').setValue(this.issue.severity);
        this.updateForm.get('status').setValue(this.issue.status);
      });
    });
  }

  updateIssue(title: string, responsible: string, description: string, severity: string, status: string) {
/*
    console.log('updateIssue this.id ' + this.id);
    this.updateDataIssue.id = this.id;
    this.updateDataIssue.title = title;
    this.updateDataIssue.responsible = responsible;
    this.updateDataIssue.description = description;
    this.updateDataIssue.severity = severity;
    this.updateDataIssue.status = status;
    // console.log('updateDataIssue ' + this.updateDataIssue);
*/
    this.issueService.updateIssue(this.id, title, responsible, description, severity, status)
    .subscribe(() => {
      this.snackBar.open('Issue updated successfully', 'OK', { duration: 3000 });
    });
  }
}
