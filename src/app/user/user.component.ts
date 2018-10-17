import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../user';
declare var $: any;

@Component({
  selector: 'cinq-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = {id: null, firstName: null, lastName: null, age: null, description: null};

  constructor(public userService: UserService, private route: ActivatedRoute) { }

  ngOnInit() {

    console.log(this.route, this.route.snapshot.paramMap);

    let userId = parseInt(this.route.snapshot.paramMap.get('id'));
    this.getUser(userId);

  }

  getUser(userId: number):void {

    console.log(userId);

    this.userService.getById(userId).then(user => {console.log(user); this.user = JSON.parse(JSON.stringify(user))});

  }

  cancel(inputsClasses: string):void {

    if(inputsClasses.indexOf('ng-dirty') == -1){
      return;
    };

    this.showModal();

  }

  showModal(){

    $('#cancelModal').modal();

  }

  discardChanges():void {

    this.getUser(this.user.id);

    if ($ && typeof $ == 'function') $('#discarded').modal(); 

  }

  apply(){

    this.userService.update(this.user).then(() => $ && typeof $ == 'function'? $('#saved').modal() : false);

  }

}
