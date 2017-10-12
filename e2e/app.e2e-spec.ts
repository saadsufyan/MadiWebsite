import { MadinatiWebsitePage } from './app.po';

describe('madinati-website App', () => {
  let page: MadinatiWebsitePage;

  beforeEach(() => {
    page = new MadinatiWebsitePage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
