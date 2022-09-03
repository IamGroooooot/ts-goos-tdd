export class AuctionSniperDriver {
  constructor(timeoutMillis: number) {
    Cypress.config('defaultCommandTimeout', timeoutMillis);
  }

  // 실제 웹 페이지에서 statusText값이 'lost'인지 'joining'인지
  showsSniperStatus(statusText: string) {
    cy.get('#sniper-status').contains(statusText);
  }
}
