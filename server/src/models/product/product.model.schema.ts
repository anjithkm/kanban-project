import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  images: { type: Array<String> ,default:[]},
  name: { type: String, required: true },
  rating: { type: Number, default: 0 },
  Specifications: { type: Array<String> ,default:[]},
  Overview: { type: Array<String> ,default:[]},
  description: { type: String, required: true },
  actualPrice: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  category: { type: String, required: true },
});

export default model('Product', productSchema);