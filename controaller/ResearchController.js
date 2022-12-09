const Research = require("../models/Research");
const { response } = require("express");

const addResearch = (req, res, next) => {
  let research = new Research({
    resID: req.body.resID,
    resName: req.body.resName,
    description: req.body.description,
    name: req.body.name,
    contact: req.body.contact,
    email: req.body.email,
  });
  research
    .save()
    .then((response) => {
      res.json({
        message: "Research added successfully!",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured while adding the Research Project!",
      });
    });
};

const index = (req, res, next) => {
  let fetchedDoc;
  Research.find().then(responce => {

    fetchedDoc = responce;
    return Research.count();
  })
    .then(count => {
      res.status(200).json({

        message: "posts fetched successfully",
        researches: fetchedDoc,
        maxResearches: count
      })
    })
    .catch(error => {

      res.status(500).json({
        message: "Fetching the posts Failed !!!"
      })
    })
}


const destroy = (req, res, next) => {
  Research.findOneAndDelete({ id: req.params.id })
    .then(() => {
      res.json({
        message: "Research Deleted successfully",
      });
    })
    .catch((error) => {
      res.json({
        message: "An error occured!",
      });
    });
};


module.exports = {
  addResearch,
  index,
  destroy,
};
