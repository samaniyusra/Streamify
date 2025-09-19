import express from "express";
import dotenv from "dotenv";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import { connectDB } from "./lib/db.js";
import cookieparser from "cookie-parser";
import cors from "cors";
import path from "path";
dotenv.config();
const app = express();
const port = 3000;


const __dirname = path.resolve();
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}));
app.use(express.json());
app.use(cookieparser());


app.get("/", (req, res) => {
    res.send("home route working fine");
})

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/chat", chatRoutes);


if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")));

    // app.get("*", (req,res) => {
    //     res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    // })
}
app.listen(port, () => {
    console.log(`app listening on port ${port}`);
    connectDB();
})