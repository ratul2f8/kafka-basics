import { Kafka } from "kafkajs";

export async function consumer() {
  try {
    const kafka = new Kafka({
      clientId: "first_app",
      brokers: ["localhost:9092"],
    });

    const kafkaConsumer = kafka.consumer({
      groupId: "testing",
    });

    console.log(`Connecting to kafka consumer...`);
    await kafkaConsumer.connect();
    console.log(`Successfully connected to kafka consumer`);

    await kafkaConsumer.subscribe({
      topic: "User",
      fromBeginning: true,
    });

    await kafkaConsumer.run({
      eachMessage: async (message) => {
        console.log(
          `Name of the person in queue is : ${message.message.value} and the message sis from partition: ${message.partition}`
        );
      },
    });
  } catch (e) {
    console.error("Kafka error: ", e);
  } finally {
    // process.exit();
  }
}
