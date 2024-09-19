import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      image: { type: String },
      productId: { type: String , required: true },
      name: { type: String,required: true  },
      price: { type: Number, required: true },
      quantity: { type: Number, required: true },
      varients: { type: Object },
      totalPrice: { type: Number, required: true },
    },
  ],
  totalPrice: { type: Number, required: true },
  orderDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
});
 
export default model('Order', orderSchema);