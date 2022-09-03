import { AuctionSniperDriver } from './auction-sniper-driver';
import { FakeAuctionServer } from './fake-auction-server';

/**
 * @note
 */
class ApplicationRunner {
  private driver: AuctionSniperDriver | null; // java가 null을 지원하다보니 이렇게..

  constructor() {
    this.driver = null;
  }
  public startSellingItem(auction: any) {
    this.driver = new AuctionSniperDriver(1000);
    this.driver?.showsSniperStatus('joining'); // ES6 symbol을 넣고 싶다.
  }

  public showsSniperHasLostAuction() {
    this.driver?.showsSniperStatus('lost');
  }
}

describe('Auction sniper e2e test', () => {
  const auction = new FakeAuctionServer('item-54321');
  const application = new ApplicationRunner();

  it('sniper joins auction util autcion closes', () => {
    auction.startSellingItem();
    application.startSellingItem(auction);
    auction.hasReceivedJoinRequestFromSniper();
    auction.announceClosed();
    application.showsSniperHasLostAuction();
  });
});
