import {connect} from "mongoose";
import { MONGODB_URI } from "./config";

export const connectDB = async () => {
    try {
        await connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Connected")
    } catch (error) {
        console.log(error)
    }
}
