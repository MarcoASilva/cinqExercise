import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';

@Component({
  selector: 'cinq-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  users: User[] = [];

  constructor(public userService: UserService) {

  }

  ngOnInit() {

    this.getAllUsers();

  }

  getAllUsers():void {
    
    this.userService.getAll().then(users => this.users = users);

  }

  selectAll(selectedAll: boolean):void {

    for(let user of this.users){

      user.selected = selectedAll;

    };

  }

  download():void {

    let usersContent = JSON.stringify(this.users);

    let anchor = document.createElement('a');

    anchor.style.display = 'none';
    anchor.setAttribute('download', "users.json");
    anchor.setAttribute('href', "data:text/json;charset=UTF-8," + encodeURIComponent(usersContent));

    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);

  }

  delete(id: number):void {

    this.userService.delete([id]).then(() => this.getAllUsers());

  }

  deleteSelected(){

    this.userService.delete(this.users.filter(user => user.selected).map(user => user.id)).then(() => this.getAllUsers());

  }

  usersSelected(): number{

    return this.users.filter(user => user.selected).length;

  }

}
