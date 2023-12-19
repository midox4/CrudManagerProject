
const cookieParser = require("cookie-parser"); 
const { PROJECT } = require("../Models/project");
const { createError } = require("../Service/Error");
require("dotenv").config();



module.exports.PROJECT_ADD = async (req, res, next) => {
  try {
    Data = req.body.form;
    const result = await PROJECT.findOne({ nameProject : Data.nameProject })
    if(result) return res.status(401).json("name exist")
    // Save in DB
    const newProject = new PROJECT(Data);
    await newProject.save();

    return res
      .status(200)
      .json(newProject);
  } catch (err) {
    return next(err);
  }
};


module.exports.PROJECT_UPDATE = async (req, res, next) => {
  try {
    // // check User exist or not
    const result = await PROJECT.findByIdAndUpdate(req.params.id ,  { Status : 'inProgress' },
      { new: true });

    return res
      .status(200)
      .json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports.PROJECT_UPDATE_COMPLETED = async (req, res, next) => {
  try {
    // // check User exist or not
    const result = await PROJECT.findByIdAndUpdate(req.params.id ,  { Status : 'completed' },
      { new: true });

    return res
      .status(200)
      .json(result);
  } catch (err) {
    return next(err);
  }
};

module.exports.PROJECT_DELETE = async (req, res, next) => {
  try {
    // // check User exist or not
    const result = await PROJECT.findByIdAndDelete(req.params.id);

    return res
      .status(200)
      .json(result);
  } catch (err) {
    return next(err);
  }
};



module.exports.PROJECT_GET = async (req, res, next) => {
  try {
    const result = await PROJECT.find();
    return res
      .status(200)
      .json(result);
  } catch (err) {
    return next(err);
  }
};