import { QrChatPage } from './app.po';

describe('qr-chat App', function() {
  let page: QrChatPage;

  beforeEach(() => {
    page = new QrChatPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
