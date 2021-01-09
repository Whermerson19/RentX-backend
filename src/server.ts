import "reflect-metadata";

import express from "express";

import appRouter from "./routes";

import "./database";

const app = express();

app.use(express.json());

app.use(appRouter);

app.listen(3333, () => console.log("🧛 >> server isRunning << 🧛"));