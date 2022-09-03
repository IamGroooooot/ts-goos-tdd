export default class Main {
    constructor(itemId) {
        const status = document.createElement('div');
        status.id = 'sniper-status';
        status.textContent = 'joining';
        document.body.appendChild(status);
    }
}
