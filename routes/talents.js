const express = require('express')

const router = express.Router();

const multer = require('multer');

const Talent = require('../models/talent')

const checkAuth= require("../middlewear/check-auth")

const MIME_TYPE_MAP ={
  'image/png':'png',
  'image/jpeg':'jpg',
  'image/jpg':'jpg',
}

const storage = multer.diskStorage({
  destination:(req,file,cb)=>{
    const isValid =MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid Mime type");
    if(isValid)
    {
      error=null;
    }
    cb(error,"backend/images");
  },
  filename:(req,file,cb)=>{
    const name = file.originalname.toLowerCase().split(' ').join('-');
     const ext = MIME_TYPE_MAP[file.mimetype];
     cb(null,name+'-'+Date.now()+'.'+ext);
  }
});

router.post("/",checkAuth,multer({storage:storage}).single('image'),async (req,res,next)=>{

  console.log("im reaching here ");
  const url = req.protocol+'://'+req.get("host");

  // console.log(req.body.image.fileName)

  const talent = new Talent({
    name:req.body.name,
    year:req.body.year,
    department:req.body.department,
    skill:req.body.skill,
    imagePath:url+"/images/"+req.file.filename,
    creator:req.userData.userId
  })

    console.log("Currently adding the item .");
await talent.save().then(result=>{
      console.log(result);

      res.status(201).json({
        message:"post added successfully",
        talent:{
          id:result._id,
          name:result.name,
          year:result.year,
          department:result.department,
          skill:result.skill,
          imagePath:result.imagePath,
          creator:result.creator
      }
    })
  })
  .catch(error=>{
    res.status(500).json({
      message:"creating the post failed"
    })
  })
  // next();
})


router.delete("/:id",checkAuth,(req,res,next)=>{
  console.log("wait deleting");

  Talent.findOneAndDelete({_id:req.params.id,creator:req.userData.userId}).then(() => {
    res.json({
      message: "Event Deleted successfully",
    });
  })
  .catch((error) => {
    res.json({
      message: "An error occured!",
    });
  });
})

router.put("/:id",checkAuth,multer({storage:storage}).single('image'),(req,res,next)=>{

  let imagePath=req.body.imagePath;
  if(req.file)
  {
    const url = req.protocol+'://'+req.get("host");
    // it means that new file was uploaded here
    imagePath:url+"/images/"+req.file.filename
  }
  console.log(req.file);
  const post = new Talent({
    _id:req.body.id,
    name:req.body.name,
    year:req.body.year,
    department:req.body.department,
    skill:req.body.skill,
    imagePath:imagePath,
    creator:req.userData.userId
  });
  console.log("This is the post"+post);

  Talent.updateOne({_id:req.params.id,creator:req.userData.userId },post).then(
    result=>{
      // console.log(creator);
      console.log(req.userData.userId);
      if(result.nModified>0)
      {
        res.status(200).json({message:"update successfull"});
      }else{
        res.status(401).json({message:"Not Authorized"});
      }
    }
  )
  .catch(error=>{
    res.status(500).json({
      message:"Could not update the post !!"
    })
  })
})

router.get("",(req,res,next)=>{
  let fetchedDoc;
  Talent.find().then(responce=>{

    fetchedDoc=responce;
    return Talent.count();
  })
  .then(count=>{

    res.status(200).json({
      message:"posts fetched successfully",
      talents:fetchedDoc,
      maxTalent:count
    })
  })
  .catch(error=>{

    res.status(500).json({
      message:"Fetching the posts Failed !!!"
    })
  })
})

router.get("/:id",(req,res,next)=>{
  Talent.findById(req.params.id).then(post=>{
    if(post){
      res.status(200).json(post);
    }else{
      res.status(404).json({message:'page not found'})
    }
  })
  .catch(error=>{

    res.status(500).json({
      message:"Fetching the posts Failed !!!"
    })
  })
})

module.exports= router



