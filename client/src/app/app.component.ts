import { Component } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public userList: any = null;
  constructor(private _userService: UserService){
    this._userService.getUsersFromDb().subscribe((resp:any)=>{
      console.log("data from api =>", resp);
      this.userList = resp;
    });
  }
  title = 'client';
}
