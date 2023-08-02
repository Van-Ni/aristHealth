import { AristBaseTemplatePage } from './app.po';

describe('AristBase App', function() {
  let page: AristBaseTemplatePage;

  beforeEach(() => {
    page = new AristBaseTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
