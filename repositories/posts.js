
const Posts = require("../schema/posts"); 
const bans = require("../schema/ban")

class PostsRepository {

    createPosts = async (userId, nickName, title, content, location, cafe, date, time, map, partyMember, participant, nowToClose) => {
        await Posts.create({userId, nickName, title, content, location, cafe, date, time, map, partyMember, participant:nickName, expireAt: nowToClose
        });
        return;
    };

    findAllPosts = async(skip) => {
        const findAllPosts = await Posts.find({}, undefined, {skip, limit:5}).sort('createdAt');
        return findAllPosts;
    }
    
    findOnePost = async(postId) => {
        const findOnePosts = await Posts.findOne({_id:postId})
        return findOnePosts;
    }

    updatePost = async(postId, userId, title, content, location, cafe, date, time, map, partyMember) => {
        await Posts.updateOne(
            {_id:postId, userId:userId},{$set:{title:title,content:content,location:location,cafe:cafe,date:date,time:time,map:map,partyMember:partyMember}}
        )
        return 
    }

    deletePost = async(postId, userId) => {
        await Posts.deleteOne({_id:postId, userId:userId});
        return
    }

    participateMember = async(postId,userId, nickName) => {
        await Posts.updateOne({_id:postId, userId:userId}, {$push:{participant: nickName}})
        return
    }

    banMember = async(postId, nickName) => {
        await Posts.updateOne({_id:postId},{$push:{banUser: nickName}})
        await Posts.updateOne({_id:postId},{$pull:{participant: nickName}})
        return
    }

    cancelBanMember = async(postId, nickName) => {
        await Posts.updateOne({_id:postId},{$pull:{banUser:nickName}})
        return
    }

    closeParty = async(postId, userId) => {
        await Posts.updateOne({_id: postId}, { $set: { closed: 1, expireAt: "" } });
    }
}

module.exports = PostsRepository;