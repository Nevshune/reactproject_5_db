import express from "express";
import { getJoonguFoods } from "../controllers/getJoonguFoods.js";

const foodsRouter = express.Router();

foodsRouter.get("/Joongu", getJoonguFoods);

export default foodsRouter;
