import { AngularPatternsPage } from './app.po';

describe('angular-patterns App', function() {
  let page: AngularPatternsPage;

  beforeEach(() => {
    page = new AngularPatternsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
