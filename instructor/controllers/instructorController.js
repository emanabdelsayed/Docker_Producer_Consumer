import { Question } from "../models/question.js";
import { kafkaSend } from "./kafkaProducer.js";

const sendQuestion = (res, questionData, method) => {
  try {
    const question = new Question(questionData, method);
    kafkaSend(question);
    return res.status(200).json("message sent");
  } catch (err) {
    console.log(err);
    return res.status(400).json(err);
  }
};

export default { sendQuestion };
