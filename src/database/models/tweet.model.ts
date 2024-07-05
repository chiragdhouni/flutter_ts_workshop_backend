
import mongoose, { Schema } from "mongoose";
import { ITweetInterface } from "../interfaces/tweet.interface";

const tweetSchema = new Schema<ITweetInterface>({
    tweetId:{type: String, required: true},
    adminId:{type:String,required:true},
    content:{type: String, default:""},
    createdAt:{type:String,required:true},



});

const TweetModel=mongoose.model<ITweetInterface>("TweetModel",tweetSchema);
export default TweetModel;
