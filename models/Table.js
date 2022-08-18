import mongoose from 'mongoose'

const TableSchema = new mongoose.Schema(
  {
    tableNo: {
      type: Number,
      required: true,
    },
    customer: {
      type: String,
      maxLength: 60,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
    },
    method: {
      type: Number,
      required: true,
    },
    orderedProducts: {
      type: [
        {
          title: { type: String, required: true },
          price: { type: Number, required: true },
          extras: [
            { text: { type: String, required: true }, price: { type: Number, required: true } },
          ],
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
)

export default mongoose.models.Table || mongoose.model('Table', TableSchema)