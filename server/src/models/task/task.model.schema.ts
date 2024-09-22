import { Schema, model } from 'mongoose';

const taskSchema = new Schema({
  id: { type: String },
  title: { type: String },
  description: { type: String },
  comments: { type: Number,default: 0 },
  files: { type: Number,default: 0 },
  priority :  { type: String },
});


// Define a parent schema that includes a 2D array of taskSchema
const boardSchema = new Schema({
  tasks: [[taskSchema]] // 2D array where each element is an array of tasks
});

export default model('Board', boardSchema);