import { browser, by, element, $ } from 'protractor';

export class AppPage {
  navigateToUserList() {
    return browser.get('/user-list');
  }

  getUsers(){
    return element.all(by.css('.user-lines')).count();
  }

  showFirstUser(){    
    return element(by.css('.user-lines .btn-primary')).click()
  }

  changeUserName(){
    return element(by.css('#first-name-input')).sendKeys('e2e test').then(() => element(by.css('#apply-btn')).click().then(() => element(by.css('#save-btn')).click()));
  }

  clickOkay(){
    return element(by.css('#saved-ok-btn')).click();
  }

  clickBack(){
    return element(by.css('.text-secondary')).click();
  }

  checkFirstUserName(){
    return element(by.css('.user-lines .col-user-name')).getText();
  }

}
