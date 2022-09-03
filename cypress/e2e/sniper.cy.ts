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
