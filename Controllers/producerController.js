const RabbitMQService = require('../Services/rabbitmqService');
const config = require('../config.json');

const rabbitMQService = new RabbitMQService(config.rabbitmq.url);

// Enviar mensaje al Exchange fanout
rabbitMQService.connectAndSend(
    '', // Sin cola directa
    "¡Nuevos peluches disponibles para todos!",
    'fanoutExchange' // Nombre del exchange
);
