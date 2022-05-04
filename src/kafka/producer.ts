import { Kafka } from "kafkajs";
import { faker } from "@faker-js/faker";

const getPartition = (name: string) => {
  return (name.toLowerCase()[0] ?? "a") < "n" ? 0 : 1;
};

export async function producer() {
  try {
    const kafka = new Kafka({
      clientId: "first_app",
      brokers: ["localhost:9092"],
    });

    const kafkaProducer = kafka.producer();
    console.log(`Connecting to kafka producer...`);
    await kafkaProducer.connect();
    console.log(`Successfully connected to kafka producer`);

    console.log(`Sending kafka message...`);
    const fakeNames = [0, 1, 2].map((obj) => faker.name.findName());
    const result = await kafkaProducer.send({
      topic: "User",
      messages: fakeNames.map((obj) => {
        return {
          partition: getPartition(obj),
          value: obj,
        };
      }),
    });
    console.log(
      `Kafka message sent sucessfully. Returned result is: ${JSON.stringify(
        result
      )}`
    );
    await kafkaProducer.disconnect();
  } catch (e) {
    console.error("Kafka error: ", e);
  } finally {
    // process.exit();
  }
}
