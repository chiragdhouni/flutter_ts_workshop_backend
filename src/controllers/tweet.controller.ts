import {Request,Response} from 'express';
import { getTweetRepo,updateTweetRepo,deleteTweetRepo,createTweetRepo } from '../repositories/tweet.repository';
import { ITweetInterface } from '../database/interfaces/tweet.interface';
import { updateUserWithTweetRepo ,deleteUserTweetWithTweetDeleteRepo} from '../repositories/user.repository';

export const getTweetController = async (req:Request,res:Response) => {
    const tweetId=req.params.tweetId as string;
    try {
        const tweet = await getTweetRepo(tweetId);
        if(tweet)    res.status(200).json({"data":tweet});
        else    res.status(404).json({"error":"Tweet not found"});
    } catch (error) {
        console
        res.status(500).json({"error":error});
    }
}


export const createTweetController = async (req:Request,res:Response) => {
    const tweet:ITweetInterface=req.body;
    try {
        const success= await createTweetRepo(tweet);
        if(success){
            const updated = await updateUserWithTweetRepo(tweet.adminId,tweet.tweetId);
            if(updated) res.status(200).json({"data":"user updated"});
            else    res.status(404).json({"error":"user not updated"});
        }   
        else    res.status(404).json({"error":"Tweet not created "});
    } catch (error) {
        console
        res.status(500).json({"error":error});
    }
}


export const updateTweetController = async (req:Request,res:Response) => {

    const updatedtweet:ITweetInterface=req.body;
    try {
        const success= await updateTweetRepo(updatedtweet.tweetId,updatedtweet);
        if(success)   res.status(200).json({"data":updatedtweet});
        else    res.status(404).json({"error":"Tweet not updated "});
    } catch (error) {
        console
        res.status(500).json({"error":error});
    }
}

export const deleteTweetController = async (req:Request,res:Response) => {
    const tweetId=req.params.tweetId as string;
    try {
        const success= await deleteTweetRepo(tweetId);
        if(success)  {
            const updated= await deleteUserTweetWithTweetDeleteRepo(tweetId);
            if(updated) res.status(200).json({"data":"Tweet deleted"});
            else    res.status(404).json({"error":"User not updated"});
        }
    } catch (error) {
        console
        res.status(500).json({"error":error});
    }
}
