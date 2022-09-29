import mongoose from 'mongoose'

const ArchiveTableSchema = new mongoose.Schema(
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
            { text: { type: String, required: false }, price: { type: Number, required: false } },
          ],
          quantity: { type: Number, required: true },
        },
      ],
    },
  },
  { timestamps: true }
)

export default mongoose.models.ArchiveTable || mongoose.model('ArchiveTable', ArchiveTableSchema)
