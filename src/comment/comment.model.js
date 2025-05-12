import {Schema, model} from 'mongoose';

const commentSchema = new Schema({
    user:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    post:{
        type: Schema.Types.ObjectId,
        ref: 'Post',
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    status:{
        type: Boolean,
        default: true,
    }


})

export default model('Comment', commentSchema);