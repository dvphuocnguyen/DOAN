const Users = require("../../models/userModels");

const authAdmin = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await Users.findOne({
        _id: req.user.id,
    });
    console.log(user,'xyz test');
    if (user.role !== 1)
      return res.status(403).json({ error: "Admin resources access denied" });

    next();
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = authAdmin;
