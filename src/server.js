import "dotenv/config";
import "./db.js";
import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import rentalRouter from "./routers/rentalRouter.js";
import cors from "cors";
import foodsRouter from "./routers/foodsRouter.js";
import userRouter from "./routers/userRouter.js";

const PORT = 8080;
const app = express();

const corsOptions = {
    origin: [
        "http://localhost:3000",
        "https://web-react-class-5th-20230703-eu1k2lll07brk9.sel4.cloudtype.app",
        "https://sensational-dasik-fb8b11.netlify.app",
    ],

    methods: ["GET", "POST"],
    credentials: true,
};

//  미들웨어 부분

app.use(cookieParser());
app.use(cors(corsOptions));
app.use(morgan("dev")); //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/rental", rentalRouter);
app.use("/api/foods", foodsRouter);
app.use("/api/users", userRouter);

// app.get("/test", function (req, res) {
//     res.json({ ok: "안녕하세요" });
// });

const handleListening = () =>
    console.log(`😍server listning on port http://localhost:${PORT}`);

app.listen(PORT, handleListening);
