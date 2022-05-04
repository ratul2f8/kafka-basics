import { Kafka } from "kafkajs";

export async function topic() {
  try {
    const kafka = new Kafka({
      clientId: "first_app",
      brokers: ["localhost:9092"],
    });

    const kafkaAdmin = kafka.admin();
    console.log(`Connecting to kafka admin...`);
    await kafkaAdmin.connect();
    console.log(`Successfully connected to kafka admin`);

    console.log(`Creating kafka topics...`);
    await kafkaAdmin.createTopics({
      topics: [
        {
          topic: "User",
          numPartitions: 2,
        },
      ],
    });
    console.log(`Kafka topic created sucessfully ;)`);
    await kafkaAdmin.disconnect();
  } catch (e) {
    console.error("Kafka error: ", e);
  } finally {
    // process.exit();
  }
}
