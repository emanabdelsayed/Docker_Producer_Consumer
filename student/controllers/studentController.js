import sequelize from "sequelize";
import { Question } from "../models/question.js";

const db = new sequelize(process.env.POSTGRES_URL);

db.options.logging = (message) => {
  if (message.startsWith("Executing")) {
    // Do nothing
  } else {
    console.log(message);
  }
};

const QuestionDB = db.define("question", {
  id: {
    type: sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  questionText: sequelize.STRING,
});

db.sync({ force: true });

const addQuestion = async (questionData) => {
  try {
    const question = new Question(questionData);
    const result = await QuestionDB.findByPk(question.id);
    if (!result) {
      await QuestionDB.create({
        id: question.id,
        questionText: question.questionText,
      });
      console.log("question added successfully");
    } else console.log("question Id Already Exist");
  } catch (err) {
    console.log(err);
  }
};

const deleteQuestion = async (questionData) => {
  try {
    const result = await QuestionDB.findByPk(questionData.id);
    if (result) {
      await QuestionDB.destroy({
        where: {
          id: questionData.id,
        },
      });
      console.log("question deleted!");
    } else console.log("question not found!");
  } catch (err) {
    console.log(err);
  }
};

const getQuestion = async (questionData) => {
  return QuestionDB.findByPk(questionData.id);
};

const getAllQuestion = async () => {
  return QuestionDB.findAll();
};



export default { addQuestion, deleteQuestion, getQuestion, getAllQuestion };
