import express from "express";
import cors from "cors";
import Routes from "./Routes/routes.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use(Routes);

export default app;