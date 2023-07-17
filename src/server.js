import "dotenv/config";
import "./db.js";
import express from "express";
import morgan from "morgan";
import rentalRouter from "./routers/rentalRouter.js";

const PORT = 8080;
const app = express();

app.use(morgan("dev")); //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/rental", rentalRouter);

// app.get("/test", function (req, res) {
//     res.json({ ok: "안녕하세요" });
// });

const handleListening = () =>
    console.log(`😍server listning on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
