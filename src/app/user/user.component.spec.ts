import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { RouterModule, Routes, convertToParamMap } from '@angular/router';

import { UserComponent } from './user.component';
import { UserService } from '../user.service';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { UserListComponent } from '../user-list/user-list.component';
import { FilterByNamePipe } from '../filter-by-name.pipe';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';
import { Observable, of } from 'rxjs';

const appRoutes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: '/user/1', pathMatch: 'full' }
];

declare var require: any;
let users = require('../users.json');

describe('UserComponent', () => {
  let component: UserComponent;
  let fixture: ComponentFixture<UserComponent>;

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
      providers: [UserService, {provide: APP_BASE_HREF, useValue : '/' }, {provide: ActivatedRoute, useValue: {snapshot: {paramMap: {get: ()=> 1} /*of(convertToParamMap({id: 1}))*/ } } } ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  let service = new UserService();

  beforeEach(fakeAsync(() => {
    component = new UserComponent(service, new ActivatedRoute()); 
    //spyOn(service, 'getById').and.returnValue(new Promise((resolve) => resolve(users.filter(user => user.id == 1)[0])).then((user) => console.log(user)));
    tick();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  it('getUser(RouteParam -> id = 1) should get User with id == 1', fakeAsync(() => {
    component.getUser(1);
    tick();
    expect(component.user.id).toBe(users.filter(user => user.id == 1)[0].id);
  }));
  
  it('cancel with no changes should not call showModal', () => {
    spyOn(component, 'showModal');
    component.cancel('');
    expect(component.showModal).toHaveBeenCalledTimes(0);
  });
  
  it('cancel with changes should call showModal', () => {
    spyOn(component, 'showModal');
    component.cancel('ng-dirty');
    expect(component.showModal).toHaveBeenCalled();
  });
  
  it('discardChanges should call getById from UserService', () => {
    spyOn(service, 'getById').and.returnValue(Promise.resolve(users.filter(user => user.id == 1)[0]));
    component.discardChanges();
    expect(service.getById).toHaveBeenCalled();
  });
  
  it('apply should call update from UserService', fakeAsync(() => {
    let user = users.filter(user => user.id == 1)[0];
    spyOn(service, 'getById').and.returnValue(Promise.resolve(user));
    component.getUser(1);
    tick();
    spyOn(service, 'update').and.returnValue(Promise.resolve())
    component.apply();
    expect(service.update).toHaveBeenCalledWith(user);
  }));

});
