import pkg from "mongoose";
const { connect, connection, set } = pkg;

const getUrl = async () => {
  const DB_HOST = process.env.DB_HOST || "localhost";
  const DB_PORT = process.env.DB_PORT || 27017;
  const DB_DATABASE = process.env.DB_DATABASE || "files_manager";
  const url = `mongodb://${DB_HOST}:${DB_PORT}` || process.env.MONGO_URL;
  await connectDB(url);
};
const connectDB = (url) => {
  try {
    connection.once("open", () => console.log("MongoDB connected"));
    set("strictQuery", false);
    return connect(url);
  } catch (e) {
    process.exit(1);
  }
};

export default getUrl;
