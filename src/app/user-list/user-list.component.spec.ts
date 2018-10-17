import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterModule, Routes } from '@angular/router';

import { UserListComponent } from './user-list.component';
import { UserService } from '../user.service';
import { UserComponent } from '../user/user.component';
import { FilterByNamePipe } from '../filter-by-name.pipe';
import { AppComponent } from '../app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { reject } from 'q';

const appRoutes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: '/user-list', pathMatch: 'full' }
];

declare var require: any;
let users = require('../users.json');

describe('UserListComponent', () => {
  let component: UserListComponent;
  let fixture: ComponentFixture<UserListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        UserListComponent,
        UserComponent,
        FilterByNamePipe
      ],
      imports: [
        BrowserModule,
        RouterModule.forRoot(
          appRoutes,
          { enableTracing: true } // <-- debugging purposes only
        ),
        FormsModule
      ],
      providers: [UserService, {provide: APP_BASE_HREF, useValue : '/' }]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  let service = new UserService();

  beforeEach(() => { component = new UserListComponent(service); });
  
  it('getAllUsers should get all users from users.json', fakeAsync(() => {
    spyOn(service, 'getAll').and.returnValue(Promise.resolve(users));
    component.getAllUsers();
    tick();
    expect(component.users).toBe(users);
    expect(service.getAll).toHaveBeenCalled();
  }));
  
  it('selectAll(true) should imply the value true to every user.selected attribute', () => {
    spyOn(service, 'getAll').and.returnValue(Promise.resolve(users));
    component.getAllUsers();
    setTimeout(() => {
      component.selectAll(true);
      component.users.forEach(user => {expect(user.selected).toBe(true)});
    }, 1000);
  });
  
  it('selectAll(false) should imply the value false to every user.selected attribute', () => {
    spyOn(service, 'getAll').and.returnValue(Promise.resolve(users));
    component.getAllUsers();
    setTimeout(() => {
      component.selectAll(false);
      component.users.forEach(user => {expect(user.selected).toBe(false)});
    }, 1000);
  });
  
  it('delete(1) should delete user with id == 1', () => {
    spyOn(service, 'delete').and.returnValue(Promise.resolve());
    component.users = users;
    component.delete(1);
    expect(service.delete).toHaveBeenCalledWith([1]);
  });
  
  it('deleteSelected with all users selected should empty the users array', fakeAsync(() => {
    spyOn(service, 'getAll').and.returnValue(Promise.resolve([]));
    spyOn(service, 'delete').and.returnValue(Promise.resolve());
    component.getAllUsers();
    tick();
    component.users = users;
    component.selectAll(true);
    component.deleteSelected();
    expect(service.delete).toHaveBeenCalledWith(users.map(user => user.id));
  }));
  
  it('usersSelected should return the number of selected users', () => {
    component.users = users;
    component.selectAll(true);
    expect(component.usersSelected()).toBe(18);
  });

});
