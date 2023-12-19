const bcrypt = require("bcrypt");
const { UTILISATEUR } = require("../Models/_user");
const { createError } = require("../Service/Error");
require("dotenv").config();

//TODO:
/**----------------------------------------- 
 *  @desc register nouveau user
 *  @route /USER/AJOUTER
 *  @method POST
 *  @access public
 -------------------------------------------*/

module.exports.AJOUTER_USER = async (req, res, next) => {
  try {
    Data = req.body.form;
    console.log(Data);
    // check User exist or not
    const result = await UTILISATEUR.findOne({ Email: Data.Email });
    if (result) return res.status(401).json("This Email is Exist");

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    HashPassword = await bcrypt.hash(Data.Password, salt);
    const dataForm = { ...Data, Password: HashPassword };

    // Save in DB
    const newuser = new UTILISATEUR(dataForm);
    await newuser.save();

    return res.status(200).json(newuser);
  } catch (err) {
    return next(err);
  }
};
