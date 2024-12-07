import express from "express";
import {
  listTaskFront,
  insertTaskFront,
  delTaskFront,
  editTaskFront,
  detailTaskFront,
  countTaskFront,
  seachTaskFront,
} from "../controllers/controller.js";

const router = express.Router();

router.get("/list-tasks", listTaskFront); 
router.get("/search/:q", seachTaskFront); 
router.post("/insert-task", insertTaskFront);
router.delete("/del-task/:id", delTaskFront);  
router.put("/edit-task", editTaskFront);
router.get("/details-task/:id", detailTaskFront);
router.get("/count-task/", countTaskFront);

export default router;
