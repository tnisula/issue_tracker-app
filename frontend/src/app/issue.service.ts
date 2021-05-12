

import { Injectable } from '@angular/core';
// import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
// import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Subject } from 'rxjs/Subject';
import { Issue } from './issue.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  /* constructor(private http: Http ) { } */
  constructor(private http: HttpClient ) { }

  getIssues() {
    return this.http.get('http://localhost:3000/issues');
  }

  getIssueById(id: string) {
    return this.http.get('http://localhost:3000/issues/' + id);
  }

  addIssue(issue: Issue) {
    return this.http.post('http://localhost:3000/issues/add', issue);
  }

  updateIssue(id: string, title: string, responsible: string, description: string, severity: string, status: string) {
    // console.log('updateIssue: ' + id);
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    const str = 'http://localhost:3000/issues/update/' + id;
    return this.http.post(str, issue);
    // return this.http.post('http://localhost:3000/issues/update/${id}', issue);
  }

  deleteIssue(id: string) {
    // console.log(id);
    const str = 'http://localhost:3000/issues/delete/' + id;
    return this.http.delete(str);
    // return this.http.delete('http://localhost:3000/issues/delete/');
  }
}
