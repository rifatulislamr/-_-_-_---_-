const {isSignedIn}=require("./controller/Auth");
const AuthController=require("./controller/Auth")
const express=require("express")
const router=express.Router()
const PostsController=require("./controller/Posts");


//Route with isSignedIn 

router.get('/testauthroute',isSignedIn,(req,res)=>{
    res.send("A protected route")
    res.json(req.auth)
    })

// Post 
router.post('/posts/create',PostsController.createPost);

//Getting All Posts

router.get('/posts',PostsController.getPost)

//Getting singel Posts by id

router.get('/posts/:id',PostsController.findSinglePost)

//Updating a single post

router.put('/posts/:id',PostsController.updatePost);

//Delete a post by id

router.delete('/posts/:id',PostsController.deletePost);

router.get('/', (req,res) => {
    res.send("Hello , i am from Database")
})




//SignUp route
router.post('/signup',AuthController.signup)


//SignIn route

router.post('/signin',AuthController.signin);










module.exports=router