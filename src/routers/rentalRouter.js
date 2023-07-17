import express from "express";
import {
    reatalNoticeDetail,
    rentalNotice,
    rentalNoticeWrite,
} from "../controllers/rentalControllers.js";

const rentalRouter = express.Router();

rentalRouter.get("/notice", rentalNotice);
rentalRouter.post("/notice-write", rentalNoticeWrite);
rentalRouter.get("/notice-detail/:id", reatalNoticeDetail);

export default rentalRouter;
