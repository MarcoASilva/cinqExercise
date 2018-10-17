import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';

declare var require: any;
let users = require('./users.json');

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  let service: UserService;

  beforeEach(() => { service = new UserService(); });
  
  it('getAll should return users.json content', () => {
    spyOn(service, 'getAll').and.returnValue(Promise.resolve(users));
    service.getAll().then(users => expect(users).toBe(users));
  });
  
  it('getById(1) should return users.json with id 1', () => {
    service.getById(1).then(user => expect(user.id).toBe(users.filter(user => user.id == 1)[0].id));
  });
  
  it('update should change users attribute', () => {
    service.users = users;
    let user = JSON.parse(JSON.stringify(users[0]));
    user.firstName = 'TESTING UPDATE';
    service.update(user)
    expect(service.users[0].firstName).toBe('TESTING UPDATE');
  });
  
  it('delete should delete the user of id == 1', () => {
    service.users = users;
    service.delete([1]);
    console.log(service.users);
    expect(service.users.filter(user => user.id == 1).length).toBe(0);
  });

});
