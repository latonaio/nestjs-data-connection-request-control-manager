export default () => ({
  rmq: {
    vhost: process.env.RMQ_VHOST,
    port: process.env.RMQ_PORT,
    address: process.env.RMQ_ADDRESS,
    user: process.env.RMQ_USER,
    password: process.env.RMQ_PASS,
    url: `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_ADDRESS}:${process.env.RMQ_PORT}/${process.env.RMQ_VHOST}`,
    rmqQueueConsume: process.env.RMQ_QUEUE_CONSUME,
  },
  authenticator: {
    url: `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}`,
  },
  application: {
    requestTimeoutSecond: 10,
  },
});
