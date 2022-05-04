import { consumer } from "./kafka/consumer";
import { producer } from "./kafka/producer";
import { topic } from "./kafka/topic";

async function main() {
  await topic();
  await producer();
  await consumer();
}
main();
