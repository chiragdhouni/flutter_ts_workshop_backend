import mongoose from "mongoose";
import UserModel from "../database/models/user.model";
import { IUserInterface } from "../database/interfaces/user.interface";

export const getUserRepo = async (userId: string): Promise<IUserInterface | null> => {
    try {
        const user = await UserModel.findOne({uid: userId});
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const createUserRepo = async (user:IUserInterface): Promise<Boolean> => {
    try {
        await UserModel.create(user);
        return true;
    
    } catch (error) {
        console.log(error);
        return false;
    }
};



export const deleteUserRepo = async (userId :String): Promise<Boolean> => {
    try {
        const deleted = await UserModel.findOneAndDelete({uid: userId});
        if(deleted) return true;
        else    return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUserRepo = async (userId: string, updateduser:IUserInterface): Promise<Boolean> => {
    try {
        const updated = await UserModel.findOneAndUpdate({uid: userId}, updateduser,{new:true});
        if(updated) return true;
        else    return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const updateUserWithTweetRepo = async (userId: string, tweetId: string): Promise<Boolean> => {
    try {
        const updated = await UserModel.findOneAndUpdate({uid: userId}, {$push: {tweets: tweetId}});
        if(updated) return true;
        else    return false;
    } catch (error) {
        console.log(error);
        return false;
    }
};

export const deleteUserTweetWithTweetDeleteRepo = async (tweetId: string): Promise<Boolean> => {
    try {
        const updated = await UserModel.updateOne({tweets: tweetId}, {$pull: {tweets: tweetId}});
        if(updated) return true;
        else    return false;
    } catch (error) {
        console.log(error);
        return false;
    }
}