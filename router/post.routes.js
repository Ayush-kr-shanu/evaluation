const express = require("express");
const { PostModel } = require("../model/post.model");

const postRouter = express.Router();

postRouter.get("/", async (req, res) => {
  const post = await PostModel.find();
  res.send(post);
});

// postRouter.get('/top',async(req,res)=>{
//     const post = await PostModel.find({})
// })

postRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const post = new PostModel(payload);
    await post.save();
    res.send({ msg: "Post done" });
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

postRouter.patch("/update/:id", async (req, res) => {
  const postID = req.params.id;
  try {
    const updates = req.body;
    const updatedPost = await PostModel.findByIdAndUpdate(postID, updates, {
      new: true,
    });
    res.send({ msg: `Post with id ${postID} has been update`,post: updatedPost  });
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

postRouter.delete("/delete/:id", async (req, res) => {
  const postID = req.params.id;
  try {
    await PostModel.findByIdAndUpdate({ _id: postID });
    res.send({ msg: `Post with id ${postID} has been deleted` });
  } catch (err) {
    res.send({ msg: "Something went wrong", err: err.message });
  }
});

module.exports = {
  postRouter,
};
