import express, { json } from "express";
import ticketRouter from "./routes/index";

const PORT = process.env.PORT || 5000;
const app = express();

app.use(json());

await ticketRouter(app);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
