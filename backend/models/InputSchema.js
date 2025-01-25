const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  textInput: {
    type: String,
    required: true,
  },  
  videoLinks: {
    type: [String],
  },
  blogLinks: {
    type: [String],
  },
  videoPaths: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Form = mongoose.model("Form", formSchema);

module.exports = Form;
