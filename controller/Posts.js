const Posts=require("../model/Post");


exports.createPost=async(req,res) =>{
    const post=new Posts({
        title: req.body.title,
        description: req.body.description
    })
    try{
        const postsave=await post.save();
        res.json(postsave)
    } catch (error){
        console.log(error);
        
    }
}

//Getting all posts
exports.getPost= async (req,res) => {
    try{
        const posts = await Posts.find();
        res.json(posts)

    }catch(error){
        res.send("Error", error)
    }
}

//Getting a single post by id

exports.findSinglePost = async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//updating single post by id

exports.updatePost = async (req, res) => {
    try {
        const postUpdate = await Posts.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        
        if (!postUpdate) {
            return res.status(404).json({ message: "Post not found" });
        }
        
        res.json(postUpdate);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//Deleting a post by id

exports.deletePost = async (req, res) => {
    try {
        const postDelete = await Posts.findByIdAndDelete(req.params.id);

        if (!postDelete) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.json({ message: "Post deleted successfully", post: postDelete });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
