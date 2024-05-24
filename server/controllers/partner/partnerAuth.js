const Users = require("../../models/userModels");

const authPartner = async (req, res, next) => {
  try {
    // Get user information by id
    console.log(req.user,'test auth r2');
    const user = await Users.findOne({
      _id: req.user.id,
    });
    if (user.role !== 2)
      return res.status(403).json({ error: "Admin resources access denied" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authPartner;
