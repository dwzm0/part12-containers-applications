/* eslint-disable @typescript-eslint/no-unused-vars */
import express from "express";
import diagnoseRouter from "./routes/diagnoses";
import patientRouter from "./routes/patients";
import cors from "cors";

const app = express();
app.use(cors());

app.use(express.json());

const PORT = 3001;

app.get("/api/ping", (_req, res) => {
  res.send("pong");
});
const elk = "LOLOLOL";
console.log(elk);

app.use("/api/diagnoses", diagnoseRouter);

app.use("/api/patients", patientRouter);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
