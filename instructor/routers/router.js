import { Router } from "express";
import instructorController from "../controllers/instructorController.js";

const router = Router();

router.post("/add-question", (req, res) => {
  return instructorController.sendQuestion(res, req.body, "add");
});

router.delete("/delete-question", (req, res) => {
  return instructorController.sendQuestion(res, req.body, "delete");
});

export default router;
