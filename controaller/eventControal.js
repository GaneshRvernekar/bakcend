const Event = require("../models/event");

//show all the events
const index = (req,res,next)=>{
  let fetchedDoc;
  Event.find().then(responce=>{

    fetchedDoc=responce;
    return Event.count();
  })
  .then(count=>{
    res.status(200).json({

      message:"posts fetched successfully",
      events:fetchedDoc,
      maxEvents:count
    })
  })
  .catch(error=>{

    res.status(500).json({
      message:"Fetching the posts Failed !!!"
    })
  })
}

//Return single event
const show = (req, res, next) => {
  let eventID = req.body.eventID;
  Event.findById(eventID)
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured while searching event",
      });
    });
};

//add New Event to database
const store = (req, res, next) => {
  let event = new Event({
    ClubID:req.body.ClubID,
    description: req.body.description,
    eDate: req.body.eDate,
    time: req.body.time,
    venue: req.body.venue,
  });
  event
    .save()
    .then((response) => {
      res.json({
        message: "Event added successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured while adding the event!",
      });
    });
};

//Update the event by event ID
const update = (req, res, next) => {
  let eventID = req.body.eventID;

  let updatedData = {
    description: req.body.description,
    eDate: req.body.eDate,
    time: req.body.time,
    venue: req.body.venue,
  };
  Event.findByIdAndUpdate(eventID, { $set: updatedData })
    .then(() => {
      res.json({
        message: "Event Updated successfully!",
      });
    })
    .catch((error) => {
      res.json({
        messsage: "An error occured while updating the event!",
      });
    });
};

//Delete an event
//delete event not working

// const destroy =(req,res,next)=>{
//   console.log("wait deleting");

//   Event.findOneAndDelete({_id:req.params.id}).then(result=>{
//     if(result.n >0)
//       {
//         res.status(200).json({message:"delete successfull"});
//       }else{
//         res.status(401).json({message:"Not Authorized"});
//       }
//   console.log(result);
//   })
//   .catch(error=>{
//     res.status(500).json({
//       message:"Fetching the posts Failed !!!"
//     })
//   });

// res.status(200) .json({message:"post deleted "});
//   console.log(req.params.id);
// }

const destroy = (req, res, next) => {
  Event.findOneAndDelete({id:req.params.id})
    .then(() => {
      res.json({
        message: "Event Deleted successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};

module.exports = {
  index,
  show,
  store,
  update,
  destroy,
};
