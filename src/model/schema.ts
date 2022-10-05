import mongoose from "mongoose"
const newLetterSchema = new mongoose.Schema({
    name:String,
    email:String,
})


export default newLetterSchema