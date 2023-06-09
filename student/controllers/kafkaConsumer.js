import { KafkaClient, Consumer } from "kafka-node";
import studentController from "./studentController.js";

export const kafkaConsumer = () => {
  const client = new KafkaClient({
    kafkaHost: process.env.KAFKA_BOOTSTRAP_SERVERS,
  });
  const consumer = new Consumer(client, [{ topic: process.env.KAFKA_TOPIC }], {
    autoCommit: false,
  });
  consumer.on("message", async (message) => {
    const questionData = JSON.parse(message.value);
    console.log(questionData);
    if (questionData.method === "add") studentController.addQuestion(questionData);
    else if (questionData.method === "delete")
      studentController.deleteQuestion(questionData);
  });

  consumer.on("error", (err) => {
    console.log(err);
  });
};
