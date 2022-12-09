const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const eventSchema = new Schema(
{
    ClubID: {
      type: Number,
    },
    description: {
      type: String,
    },
    eDate: {
      type: String,
    },
    time: {
      type: String,
    },
    venue: {
      type: String,
    },
  }
);

const Event = mongoose.model("Event", eventSchema);
module.exports = Event;
