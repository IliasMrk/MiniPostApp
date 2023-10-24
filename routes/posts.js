const express = require('express')
const router = express.Router()

const Post = require('../models/Post')
// Post (Create Data)
router.post('/',async(req,res)=>{
    //console.log(req.body)

    const postData = new Post({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url

    })
    //try to insert data
    try{
        const postToSave = await postData.save()
        res.send(postToSave)
    }catch{
        res.send({message:err})
    }
})


// GET (Read All)
router.get('/', async(req,res)=>{
    try{
        const getPosts = await Post.find()
        res.send(getPosts)

    }catch(err){
        res.send({message:err})
    }
})


//GET by ID (Read By Id)
router.get('/:postId', async(req,res)=>{
    try{
        const getPosts = await Post.findById(req.params.postId)
        res.send(getPosts)

    }catch(err){
        res.send({message:err})
    }
})

// PATCH  (Update Data)

    router.patch('/:postId',async(req,res)=>{
    try{

        const updatePostById = await Post.updateOne(
        {_id:req.params.postId},
        {$set:{
            user:req.body.user,
            title:req.body.title,
            text:req.body.text,
            hashtag:req.body.hashtag,
            location:req.body.location,
            url:req.body.url
        }
    })
    }catch(err){
        res.send({message:err})
    }
})

//Delete

router.delete('/:postId', async(req,res)=>{
    try{
    const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router