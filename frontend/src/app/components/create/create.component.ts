import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router} from '@angular/router';

import { Issue } from '../../issue.model';
import { IssueService } from '../../issue.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  createForm: FormGroup;
  issues: Issue[];
  newIssue: any = {}; // Issue;
  editIssue: Issue;

  constructor(private issueService: IssueService, private fb: FormBuilder, private router: Router) {
    this.createForm = this.fb.group({
      title: ['', Validators.required],
      responsible: '',
      description: '',
      severity: ''
    });
  }

  ngOnInit() {
  }

  addNewIssue(title: string, responsible: string, description: string, severity: string) {

      this.newIssue.title = title;
      this.newIssue.responsible = responsible,
      this.newIssue.description = description,
      this.newIssue.severity = severity,
      this.newIssue.status = status;
      this.issueService.addIssue(this.newIssue).subscribe(() => {
        this.router.navigate(['/list']);
      });
  }

  getIssues() {
    this.issueService.getIssues()
      .subscribe((data: Issue[]) => {
      this.issues = data;
      console.log(this.issues);
      });
  }
}
