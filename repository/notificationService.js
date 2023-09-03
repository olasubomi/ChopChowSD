const Pusher = require("pusher");
const pusherClient = require('pusher-client');

class NotificationService {
  pusher;
  pusherClient;

  static initialize() {
    try {
      this.pusher = new Pusher({
        appId: process.env.PUSHER_ID,
        key: process.env.PUSHER_KEY,
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER,
        useTLS: true,
      });


      this.pusherClient = new pusherClient(process.env.PUSHER_KEY, {
        secret: process.env.PUSHER_SECRET,
        cluster: process.env.PUSHER_CLUSTER,
      });
      console.log("client initialized")
    } catch (error) {
      console.log("pusher initialization error")

    }

  }

  // Publish a message to a specific channel
  static async publishMessage(channelName, eventName, data) {
    try {
      await this.pusher.trigger(channelName, eventName, data);
      console.log(`Message published to ${channelName}`);
    } catch (error) {
      console.error(`Error publishing message: ${error}`);
    }
  }

  // Subscribe to a channel and listen for events
  static subscribeAndListen(channelName, eventName, callback) {

    console.log({ pusher: this.pusher })

    const channel = this.pusherClient.subscribe(channelName);

    channel.bind(eventName, (data) => {
      console.log(`Received message on channel ${channelName}:`, data);
      if (callback && typeof callback === "function") {
        callback(data);
      }
    });
  }
}

NotificationService.initialize()

module.exports = { NotificationService };
