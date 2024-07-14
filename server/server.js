import { createServer } from "http";
import indexRouter from "./routes/index";
import connecttoDB from "./utils/db";
const PORT = process.env.PORT || 5000;

const server = createServer(indexRouter);

(async () => {
  await connecttoDB();
  server.listen(PORT, () =>
    console.log(`Listening to port @ http://localhost:${PORT}`)
  );
})();
