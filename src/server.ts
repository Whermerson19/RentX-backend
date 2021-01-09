import "reflect-metadata";

import express from "express";

import appRouter from "./routes";

import uploadConfig from "./config/upload";

import "./database";

const app = express();

app.use(express.json());

app.use("/files", express.static(uploadConfig.uploadFolder));

app.use(appRouter);

app.listen(3333, () => console.log("🧛 >> server isRunning << 🧛"));
