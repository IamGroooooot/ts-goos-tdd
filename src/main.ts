export class Main {
  constructor(itemId: string) {
    const status = document.createElement('div');
    status.id = 'sniper-status';
    status.textContent = 'joining';
    document.body.appendChild(status);
  }
}
