import { Router } from "express";
import studentController from "../controllers/studentController.js";

const router = Router();

router.get("/get-question", async (req, res) => {
  try {
    const question = await studentController.getQuestion(req.body);
    res.status(200).json(question);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

router.get("/get-all-question", async (req, res) => {
  try {
    const questions = await studentController.getAllQuestion();
    res.status(200).json(questions);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

export default router;
