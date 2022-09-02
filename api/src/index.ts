import express from "express";
import cors from "cors";
import stats from "./routes/stats";

const options: cors.CorsOptions = {}; // Allow all CORS

export const app = express();
app.use(cors(options));
app.use(express.json());

// Diagnostic Routes
app.use(stats);

const port = 8080;

app.listen(port, async () => {
  return console.log(`Server is listening on ${port}`);
});
