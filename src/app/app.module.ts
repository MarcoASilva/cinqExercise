import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user/user.component';
import { AppComponent } from './app.component';
import { UserService } from './user.service';
import { FilterByNamePipe } from './filter-by-name.pipe';

const appRoutes: Routes = [
  { path: 'user-list', component: UserListComponent },
  { path: 'user/:id', component: UserComponent },
  { path: '', redirectTo: '/user-list', pathMatch: 'full' }
];

@NgModule({
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
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
