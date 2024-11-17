const mongoose = require('mongoose');

const flowchartSchema = new mongoose.Schema({
  userId: String,
  flowchartName: String,
  nodes: [
    {
      id: String,
      type: String,
      data: Object,
      position: Object,
    },
  ],
  edges: [
    {
      id: String,
      source: String,
      target: String,
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Flowchart = mongoose.model('Flowchart', flowchartSchema);
