import { Kafka } from 'kafkajs';
import Event from '../../modules/common/event';

const {
  SERVICE_ID,
  KAFKA_BROKERS,
  KAFKA_TOPIC,
  SERVICE_URL,
  SERVICE_NAME,
  SERVICE_PATH,
} = process.env;

const kafka = new Kafka({
  clientId: SERVICE_ID,
  brokers: KAFKA_BROKERS.split(','),
});

type KEvent = {
  type: string;
  data: { [key: string]: any };
};

const producer = kafka.producer();
const consumer = kafka.consumer({ groupId: `${SERVICE_ID}-group` });

export const sendEvent = async (
  { type, data }: KEvent,
  topic = KAFKA_TOPIC,
) => {
  await producer.send({
    topic,
    messages: [
      {
        value: JSON.stringify({
          type,
          data,
        }),
        timestamp: `${Date.now()}`,
      },
    ],
  });
  Event.emit(type, data);
};

export const subscribeToTopic = async (topic: string) => {
  await consumer.subscribe({ topic });
};

const start = async () => {
  // Producing
  await producer.connect();
  await producer.send({
    topic: KAFKA_TOPIC,
    messages: [
      {
        value: JSON.stringify({
          type: 'start',
          data: {
            modules: [],
            openRoutes: [],
            topic: KAFKA_TOPIC,
            name: SERVICE_NAME,
            path: SERVICE_PATH,
            target: SERVICE_URL,
            statusEndpoint: '/',
            serviceId: SERVICE_ID,
          },
        }),
      },
    ],
  });

  // Consuming
  await consumer.connect();
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });
      const msg = message.value.toJSON();
      Event.emit(msg.type, msg.data);
    },
  });
};

export default start;