import { Injectable } from '@angular/core';
import { User } from './user';
declare var require: any;
let users = require('./users.json');

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users: User[] = [];

  constructor() {

    users.map(user => this.users.push({id: user.id, firstName: user.firstName, lastName: user.lastName, age: user.age, description: user.description}))

  }

  getAll(): Promise<User[]>{

    return new Promise((resolve, reject) => {
      
      resolve(this.users);

    });

  }

  getById(id: number): Promise<User>{

    return new Promise((resolve, reject) => {

      resolve(this.users.filter(user => user.id == id)[0]);

    });

  }

  delete(ids: number[]){

    return new Promise((resolve, reject) => {

      this.users = this.users.filter(user => !ids.includes(user.id));

      resolve();

    });

  }

  update(modifiedUser: User){

    return new Promise((resolve, reject) => {

      this.users.splice(this.users.findIndex(user => user.id == modifiedUser.id), 1, modifiedUser);

      resolve();

    });  

  };

}
