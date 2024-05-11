const Schedule = require("../../../models/scheduleModule");

const createSchedule = async (req, res) => {
    try {
        const { date, schedule } = req.body;
        const newPlan = new Schedule({
          date,
          schedule,
        });
        await newPlan.save();
        res.status(201).json(newPlan);
      } catch (err) {
        res.status(400).json({ message: err.message });
      }
};

const getSchedule = async (req, res) => {
    try {
        const plans = await Schedule.find();
        res.json(plans);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
};

const updateSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, schedule } = req.body;
    const updatedSchedule = await Schedule.findByIdAndUpdate(
      id,
      { date, schedule },
      { new: true }
    );
    res.status(200).json(updatedSchedule);
  } catch (error) {
    console.error("Error updating schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteSchedule = async (req, res) => {
  try {
    const { id } = req.params;
    await Schedule.findByIdAndDelete(id);
    res.status(200).json({ message: "Schedule deleted successfully" });
  } catch (error) {
    console.error("Error deleting schedule:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  createSchedule,
  getSchedule,
  updateSchedule,
  deleteSchedule,
};
