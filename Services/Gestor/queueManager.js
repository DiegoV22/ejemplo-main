// queueManager.js
class QueueManager {
    constructor(channel) {
        this.channel = channel;
    }

    assertQueue(queue, options = { durable: false }) {
        this.channel.assertQueue(queue, options);
    }

    sendToQueue(queue, message) {
        this.channel.sendToQueue(queue, Buffer.from(message));
        console.log(` [x] Sent to "${queue}": ${message}`);
    }
}

module.exports = QueueManager;
