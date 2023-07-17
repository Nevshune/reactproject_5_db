import express from "express";
import {
    rentalNotice,
    rentalNoticeWrite,
} from "../controllers/rentalControllers.js";

const rentalRouter = express.Router();

rentalRouter.get("/notice", rentalNotice);
rentalRouter.post("/notice-write", rentalNoticeWrite);

export default rentalRouter;
