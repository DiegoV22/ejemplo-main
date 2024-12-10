// consumerController.js
const RabbitMQConnection = require('../Services/rabbitmqConnection');

RabbitMQConnection.connect('amqp://localhost')
    .then(connection => {
        connection.createChannel((error, channel) => {
            if (error) throw error;

            const queue = 'hello';

            channel.assertQueue(queue, { durable: false });

            console.log(` [*] Waiting for messages in "${queue}". To exit press CTRL+C`);
            channel.consume(queue, (msg) => {
                console.log(` [x] Received: ${msg.content.toString()}`);
            }, { noAck: true });
        });
    })
    .catch(error => console.error("Error connecting to RabbitMQ:", error));
