const RabbitMQService = require('../Services/rabbitmqService');
const config = require('../config.json');

const rabbitMQService = new RabbitMQService(config.rabbitmq.url);

// Enviar mensaje al Direct Exchange con routing key 'marketing'
rabbitMQService.connectAndSend(
    '', // Sin cola directa
    "El equipo de marketing debe preparar una campaña.",
    'directExchange', // Nombre del exchange
    'marketing',      // Routing key
    'direct'          // Tipo del exchange
);
