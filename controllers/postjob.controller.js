const express = require('express');
const PostJobModel = require('../model/postjob.model');
const auth = require('../middleware/auth.middleware');
const postJobRoute = express.Router()
const uuid = require("uuid");
const JobFormModel = require('../model/jobform.model');

postJobRoute.post("/postjob",auth, async (req, res) => {
  try {
    const uniqueID = uuid.v4();
    const payLoad = req.body
    payLoad.uniqueID = uniqueID
    payLoad.jobResponse = false;
    const newJob = new PostJobModel(payLoad)
    await newJob.save()
    res.status(201).send({
      msg: "Job posted successfully",
      uniqueID: uniqueID
    })
  } catch (error) {
    res.status(400).send({
      msg: error.message
    })
  }
})

postJobRoute.get("/alljobs", auth, async (req, res) => {
  try {
  const data = await PostJobModel.find({ userID: req.body.userID });
  res.status(200).send({
    msg: data
  })
  } catch (error) {
    res.status(400).send({
      msg: error.message
    })
  }
  
})
postJobRoute.get("/onejob/:id", async (req, res) => {
  const {id} = req.params
  const data = await PostJobModel.findOne({ uniqueID: id });
  res.status(200).send({
    msg: data
  })
})

postJobRoute.post("/jobform", async(req, res)=>{
  const payLoad = req.body 
  const jobForm = new JobFormModel(payLoad)
  await jobForm.save()
  res.status(200).send({
    msg:"jobForm saved successfully"
  })
})

module.exports = postJobRoute