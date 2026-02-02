import express from "express";
import protect from "../middleware/auth.middleware.js";
import { createTask, getTasks, getTaskById, updateTask, deleteTask } from "../controller/task.controller.js";

const taskRoute = express.Router();

taskRoute.use(protect);

taskRoute.route("/")
  .post(createTask)
  .get(getTasks);

taskRoute.route("/:id")
  .get(getTaskById)
  .put(updateTask)
  .delete(deleteTask);

export default taskRoute;
