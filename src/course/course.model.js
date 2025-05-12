import {Schema, model} from 'mongoose';

const courseSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    description:{
        type: String,
        required: true,
    }
})

export default model('Course', courseSchema);