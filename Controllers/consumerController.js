const RabbitMQConnection = require('../Services/rabbitmqConnection');

RabbitMQConnection.connect('amqp://localhost')
    .then(connection => {
        connection.createChannel((error, channel) => {
            if (error) throw error;

            const exchange = 'fanoutExchange';

            // Declarar el exchange fanout
            channel.assertExchange(exchange, 'fanout', { durable: false });

            // Crear una cola temporal y exclusiva
            channel.assertQueue('', { exclusive: true }, (error, q) => {
                if (error) throw error;

                console.log(` [*] Waiting for messages in Fanout Exchange. Queue: ${q.queue}`);

                // Enlazar la cola al exchange
                channel.bindQueue(q.queue, exchange, '');

                // Consumir mensajes
                channel.consume(q.queue, (msg) => {
                    console.log(` [x] Received: ${msg.content.toString()}`);
                }, { noAck: true });
            });
        });
    })
    .catch(error => console.error("Error connecting to RabbitMQ:", error));
