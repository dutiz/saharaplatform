import mongoose from 'mongoose'

const TableSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      maxlength: 60,
    },
    tblnumber: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: Number,
      default: 0,
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
