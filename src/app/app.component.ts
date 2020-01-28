import { Component } from '@angular/core';

import {GitServiceService} from '../services/git-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'GitHubClone';
  userList : any;
  userRepoDetails : any;
  searchText : any;
  tempUserList: any;
  users: any [] = [];
  showUserRepos: boolean = false;
  dtOptions: DataTables.Settings[] = [];
  dtTrigger: Subject<any> = new Subject();
  showProperty = 'name';
  reverse : boolean = false;

  constructor(private gitService : GitServiceService ){
  }
  ngOnInit(){
   
    this.getUserList();
  }
  getUserList(){
    this.gitService.getUsers().subscribe(data=>{
      this.userList = data;
      this.tempUserList = data;
      this.dtTrigger.next();
      let temp = {}
      for(let i=0 ; i <this.userList.length ;i++){
        temp = {login: this.userList[i].login, repos_url : this.userList[i].repos_url}
        this.users.push(temp);
        temp = {};
      }
    },(error=>{

    }))
  }
  getUserDetails(userName){
    this.dtTrigger.unsubscribe();
    this.gitService.getUserRepoDetails(userName).subscribe(data=>{
      this.userRepoDetails = data;
      this.showUserRepos = true;
    },(error=>{

    }))
  }
  goBack(){
    window.location.reload();
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  sortOrder(propToSort){
    console.log("yes")
    this.showProperty = propToSort;
    if(this.reverse){
      this.reverse = false;
    }
    else{
      this.reverse = true;
    }
  }

}
