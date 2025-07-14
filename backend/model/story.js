const mongoose = require('mongoose');

const storySchema = new mongoose.Schema({
  user:         { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  mediaType:    { type: String, enum: ['image', 'video'], required: true },
  mediaUrl:     { type: String },
}, { timestamps: true });

// ✅ Correct model name and variable
const Story = mongoose.model('Story', storySchema);

// ✅ Export the right variable
module.exports = Story;
