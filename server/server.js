import express, { json } from "express";
import indexRouter from "./routes/index";
import  connecttoDB  from "./utils/db";
const PORT = process.env.PORT || 5000;
const app = express();

app.use(json());

indexRouter(app);
const uri = process.env.MONGO_URL;
app.listen(PORT, async () => {
  await connecttoDB();
  console.log(`Server running on port ${PORT}`);
});
