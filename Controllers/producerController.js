// producerController.js
const RabbitMQService = require('../Services/rabbitmqService');
const config = require('../config.json');

const rabbitMQService = new RabbitMQService(config.rabbitmq.url);

rabbitMQService.connectAndSend(config.rabbitmq.queue, config.rabbitmq.message);
