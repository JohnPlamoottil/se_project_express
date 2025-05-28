const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    required: true, // every user has a name, so it's a required field
    minlength: 2, // the minimum length of the name is 2 characters
    maxlength: 30, // the maximum length is 30 characters
    type: String,
  },
  : {
    type: String, // the pronouns are a string
    required: true,
  },
});