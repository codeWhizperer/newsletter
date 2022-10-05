import newLetterSchema from "./schema";
import mongoose from "mongoose"
const NewLetter = mongoose.model('newletter', newLetterSchema)


export default NewLetter