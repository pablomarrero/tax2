import { TaxiGoPage } from './app.po';

describe('taxi-go App', () => {
  let page: TaxiGoPage;

  beforeEach(() => {
    page = new TaxiGoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
