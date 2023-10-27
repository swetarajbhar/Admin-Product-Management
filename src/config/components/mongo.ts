import mongoose from "mongoose";

const { MONGO_HOST, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DBNAME } =
  process.env;

interface BootstrapResult {
  success: boolean;
  error?: Error;
}

const bootstrap = async (): Promise<BootstrapResult> => {
  try {
    const mongoURI = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOST}/${MONGO_DBNAME}?retryWrites=true&w=majority`;
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoURI);
    console.log("Database Connected");
    return { success: true };
  } catch (error: any) {
    console.log(error);
    return { success: false, error };
  }
};

export { bootstrap, BootstrapResult };
