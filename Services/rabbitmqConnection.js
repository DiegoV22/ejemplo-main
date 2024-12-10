// rabbitmqConnection.js
const amqp = require('amqplib/callback_api');

class RabbitMQConnection {
    static connect(url) {
        return new Promise((resolve, reject) => {
            amqp.connect(url, (error, connection) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(connection);
                }
            });
        });
    }
}

module.exports = RabbitMQConnection;
