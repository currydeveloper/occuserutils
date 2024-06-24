import { Component, OnInit } from '@angular/core';
import { UserserviceService, userinfo } from './services/userservice.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'src-ui';
  user!: string;
  currentuser!:userinfo;
  constructor(private userservice:UserserviceService){

  }
  ngOnInit(): void {
      console.log("Starting the onInit command");
      this.getUserInfo();
  }

  private async getUserInfo(){
    console.log("Entering the getUserInfo");
    this.currentuser=await this.userservice.getCurrentUser();
    console.log("Got the user as:"+JSON.stringify(this.currentuser));
    this.user=this.currentuser.name;
  }
  
}
