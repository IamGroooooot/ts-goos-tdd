/**
 * Redis Pub/Sub server for fake auction events
 * @note Redis도 Fake다.
 * @note Fake Double 참고
 */
class FakeRedisPubSub {
  private static instance: FakeRedisPubSub;

  private subscribes: {
    [channel: string]: ((message: string, channel: string) => void)[];
  };
  private constructor() {
    this.subscribes = {};
  }

  public static getInstance() {
    if (!FakeRedisPubSub.instance) FakeRedisPubSub.instance = new FakeRedisPubSub();
    return FakeRedisPubSub.instance;
  }

  public subscribe(
    channel: string,
    callback: (message: string, channel: string) => void
  ) {
    if (!this.subscribes[channel]) this.subscribes[channel] = [];
    this.subscribes[channel].push(callback);
  }

  public publish(channel: string, message: string) {
    this.subscribes[channel]?.forEach((item) => item(message, channel));
  }

  public close(channel: string) {
    this.publish(channel, 'close');
    delete this.subscribes[channel];
  }

  public quit() {
    this.subscribes = {};
  }

  get subscribeCount() {
    return Object.keys(this.subscribes).length;
  }
}

/**
 * @note 이부분은 GOOS 책과 많이 다르게 구현된다.
 * 책에서는 XMPP 프로토콜을 사용하는 XMPP 서버를 사용하고 있지만,
 * 우리는 Redis Pub/Sub을 사용한다.
 */
export class FakeAuctionServer {
  public itemId: string;

  private redisClient: FakeRedisPubSub;

  get topic() {
    return `auction-${this.itemId}`;
  }

  constructor(itemId: string) {
    this.redisClient = FakeRedisPubSub.getInstance();

    this.itemId = itemId;
  }

  public startSellingItem() {
    // SKIP :: redis instance
    this.redisClient.subscribe(this.topic, (message, channel) => {});
  }

  public hasReceivedJoinRequestFromSniper() {
    return new Promise((resolve, reject) => {
      if (this.redisClient.subscribeCount == 0) {
        reject(Error('Join Request Not Received'));
      } else {
        resolve('');
      }
    });
  }

  public announceClosed() {
    this.redisClient.publish(this.topic, 'close');
  }
}
