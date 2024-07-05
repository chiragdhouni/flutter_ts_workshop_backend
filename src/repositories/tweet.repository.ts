import mongoose from "mongoose";
import TweetModel from "../database/models/tweet.model";
import { ITweetInterface } from "../database/interfaces/tweet.interface";

export const getTweetRepo = async (tweetId: string): Promise<ITweetInterface | null> => {
    try {
        const Tweet = await TweetModel.findOne({tweetId: tweetId});
        return Tweet;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const createTweetRepo = async (tweet:ITweetInterface): Promise<Boolean> => {
    try {
        await TweetModel.create(tweet);
        return true;
    
    } catch (error) {
        console.log(error);
        return false;
    }
};



export const deleteTweetRepo = async (tweetId :String): Promise<Boolean> => {
    try {
        const deleted = await TweetModel.findOneAndDelete({tweetId: tweetId});
        if(deleted) return true;
        else    return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateTweetRepo = async (tweetId: string, updatedTweet:ITweetInterface): Promise<Boolean> => {
    try {
        const updated = await TweetModel.findOneAndUpdate({tweetId: tweetId}, updatedTweet,{new:true});
        if(updated) return true;
        else    return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};