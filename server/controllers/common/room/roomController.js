const User = require("../../../models/userModels");
const Room = require("../../../models/roomModels");

const createRoom = async (req, res) => {
  const { name, description, cost } = req.body;

  try {
    const newRoom = new Room({
      name,
      description,
      cost,
      owner: req.user.id,
    });
    await newRoom.save();

    const userUpdateResult = await User.findByIdAndUpdate(
      req.user.id,
      { $push: { rooms: newRoom._id } },
      { new: true, useFindAndModify: false }
    );

    // console.log("User Update Result:", userUpdateResult); // Ghi log kết quả

    if (!userUpdateResult) {
      throw new Error("Failed to update user's rooms");
    }

    res
      .status(201)
      .json({ message: "Room created successfully", room: newRoom });
  } catch (error) {
    console.error("Error creating room:", error); // Ghi log lỗi
    res.status(500).json({ message: "Error creating room", error });
  }
};

////get all room
const getAllRooms = async (req, res) => {
  try {
    const rooms = await Room.find({});
    res.status(200).json({ succsess: true, data: rooms });
  } catch (error) {
    console.error("Error fetching rooms:", error);
    res.status(500).json({ message: "Error fetching rooms", error });
  }
};
module.exports = {
  createRoom,
  getAllRooms,
};
