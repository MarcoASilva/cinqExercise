import { AppPage } from './app.po';

describe('workspace-project App', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should show 18 users count', async() => {
    page.navigateToUserList();
    expect(page.getUsers()).toBe(18);
  });

  it('should change the first User\'s name', async() => {
    page.navigateToUserList();
    await page.showFirstUser();
    await page.changeUserName();
    await page.clickOkay();
    await page.clickBack();
    let name = await page.checkFirstUserName();
    console.log(name);
    expect(name).toContain('e2e test');
  });

});
