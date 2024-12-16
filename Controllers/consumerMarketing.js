const RabbitMQConnection = require('../Services/rabbitmqConnection');

RabbitMQConnection.connect('amqp://localhost')
    .then(connection => {
        connection.createChannel((error, channel) => {
            if (error) throw error;

            const exchange = 'directExchange';
            const routingKey = 'marketing';

            // Declarar el exchange directo
            channel.assertExchange(exchange, 'direct', { durable: false });

            // Crear una cola temporal exclusiva
            channel.assertQueue('', { exclusive: true }, (error, q) => {
                if (error) throw error;

                console.log(` [*] Waiting for messages with routing key '${routingKey}'`);

                // Enlazar la cola al exchange con la routing key
                channel.bindQueue(q.queue, exchange, routingKey);

                // Consumir mensajes
                channel.consume(q.queue, (msg) => {
                    console.log(` [x] Received: ${msg.content.toString()}`);
                }, { noAck: true });
            });
        });
    })
    .catch(error => console.error("Error connecting to RabbitMQ:", error));
