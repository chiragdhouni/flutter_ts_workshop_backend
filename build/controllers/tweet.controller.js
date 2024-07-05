"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTweetController = exports.updateTweetController = exports.createTweetController = exports.getTweetController = void 0;
const tweet_repository_1 = require("../repositories/tweet.repository");
const user_repository_1 = require("../repositories/user.repository");
const getTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const tweet = yield (0, tweet_repository_1.getTweetRepo)(tweetId);
        if (tweet)
            res.status(200).json({ "data": tweet });
        else
            res.status(404).json({ "error": "Tweet not found" });
    }
    catch (error) {
        console;
        res.status(500).json({ "error": error });
    }
});
exports.getTweetController = getTweetController;
const createTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.createTweetRepo)(tweet);
        if (success) {
            const updated = yield (0, user_repository_1.updateUserWithTweetRepo)(tweet.adminId, tweet.tweetId);
            if (updated)
                res.status(200).json({ "data": "user updated" });
            else
                res.status(404).json({ "error": "user not updated" });
        }
        else
            res.status(404).json({ "error": "Tweet not created " });
    }
    catch (error) {
        console;
        res.status(500).json({ "error": error });
    }
});
exports.createTweetController = createTweetController;
const updateTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedtweet = req.body;
    try {
        const success = yield (0, tweet_repository_1.updateTweetRepo)(updatedtweet.tweetId, updatedtweet);
        if (success)
            res.status(200).json({ "data": updatedtweet });
        else
            res.status(404).json({ "error": "Tweet not updated " });
    }
    catch (error) {
        console;
        res.status(500).json({ "error": error });
    }
});
exports.updateTweetController = updateTweetController;
const deleteTweetController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const tweetId = req.params.tweetId;
    try {
        const success = yield (0, tweet_repository_1.deleteTweetRepo)(tweetId);
        if (success) {
            const updated = yield (0, user_repository_1.deleteUserTweetWithTweetDeleteRepo)(tweetId);
            if (updated)
                res.status(200).json({ "data": "Tweet deleted" });
            else
                res.status(404).json({ "error": "User not updated" });
        }
    }
    catch (error) {
        console;
        res.status(500).json({ "error": error });
    }
});
exports.deleteTweetController = deleteTweetController;
