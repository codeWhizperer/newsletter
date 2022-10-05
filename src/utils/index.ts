import mongoose from "mongoose";
export const mailSenderConfig = {
    from: "hello@chainedthrift.com",
    emailSubject: "NewsLetter",
    replyTo: "hello@chainedthrift.com",
  };

const connectDB = async () => {
    try {
      const connect = await mongoose.connect(`${process.env.MONGO_URL}`);
      // console.log(`Database connected to ${connect.connection.host}`);
      return connect.connection.host;
    } catch (error) {
      console.log(error);
    }
  };

  export const closeDB = async () => {
    try {
      return await mongoose.connection.close();
    } catch {}
  };
  
  export default connectDB;