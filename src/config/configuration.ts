export default () => ({
  rmq: {
    vhost: process.env.RMQ_VHOST,
    port: process.env.RMQ_PORT,
    address: process.env.RMQ_ADDRESS,
    user: process.env.RMQ_USER,
    password: process.env.RMQ_PASS,
    url: `amqp://${process.env.RMQ_USER}:${process.env.RMQ_PASS}@${process.env.RMQ_ADDRESS}:${process.env.RMQ_PORT}/${process.env.RMQ_VHOST}`,
    rmqQueueConsume: process.env.RMQ_QUEUE_CONSUME,
    rmqQueueCache: process.env.RMQ_QUEUE_CACHE,
    createConnectionWaitTimeSecond: 10,
  },
  mongodb: {
    dbName:         process.env.MONGO_DB_NAME,
    collectionName: process.env.MONGO_DB_COLLECTION_NAME,
    address:        process.env.MONGO_DB_ADDRESS,
    port:           process.env.MONGO_DB_PORT,
  },
  receiveAsyncDataConsume: '',
  authenticator: {
    url: `http://${process.env.AUTHENTICATOR_HOST}:${process.env.AUTHENTICATOR_PORT}`,
  },
  application: {
    port: process.env.APPLICATION_PORT,
    requestTimeoutSecond: 20,
  },
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    pollingIntervalSecond: 1,
    instances: {
      default: {},
      tokensInstance: {
        keyPrefix: 'tokens:',
        db: 1,
        expireSeconds: 60 * 60,
      }
    }
  },
  mysql: {
    dataPlatformCommonSettingsMysqlKube: {
      url: process.env.NESTJS_DATA_PLATFORM_COMMON_SETTINGS_MYSQL_KUBE_URL,
    },
    dataPlatformAuthenticatorMysqlKube: {
      url: process.env.NESTJS_DATA_PLATFORM_AUTHENTICATOR_MYSQL_KUBE_URL,
    },
  },
  storage: {
    imageStoragePath: process.env.IMAGE_STORAGE_PATH,
    transactionsStoragePath: process.env.TRANSACTIONS_STORAGE_PATH,
  },
  email: {
    host: process.env.EMAIL_HOST,
    secure: false,
    auth: {
      user: process.env.EMAIL_AUTH_USER,
      pass: process.env.EMAIL_AUTH_PASS,
    },
    from: process.env.EMAIL_FROM,
  }
});
