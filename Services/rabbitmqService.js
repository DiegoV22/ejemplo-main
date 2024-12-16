const RabbitMQConnection = require('./rabbitmqConnection');
const QueueManager = require('./Gestor/queueManager');

class RabbitMQService {
    constructor(url) {
        this.url = url;
    }

    async connectAndSend(queue, message, exchange = '', routingKey = '', exchangeType = 'fanout') {
        try {
            const connection = await RabbitMQConnection.connect(this.url);
            const channel = await this.createChannel(connection);

            if (exchange) {
                // Declarar el exchange con el tipo dinámico
                channel.assertExchange(exchange, exchangeType, { durable: false });
                channel.publish(exchange, routingKey, Buffer.from(message));
                console.log(` [x] Sent to exchange "${exchange}" with type "${exchangeType}": ${message}`);
            } else {
                const queueManager = new QueueManager(channel);
                queueManager.assertQueue(queue);
                queueManager.sendToQueue(queue, message);
            }

            setTimeout(() => {
                connection.close();
            }, 500);
        } catch (error) {
            console.error("Error in RabbitMQService:", error);
        }
    }

    createChannel(connection) {
        return new Promise((resolve, reject) => {
            connection.createChannel((error, channel) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(channel);
                }
            });
        });
    }
}

module.exports = RabbitMQService;
