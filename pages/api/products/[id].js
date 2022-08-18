import Product from 'models/Product'
import dbConnect from 'utils/mongo'

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req

  dbConnect()

  if (method === 'GET') {
    try {
      const product = await Product.findById(id)
      res.status(200).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  }

  if (method === 'PUT') {
    try {
      const product = await Product.findyByIdAndUpdate(id, req.body, {
        new: true,
      })
      res.status(201).json(product)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'DELETE') {
    try {
      await Product.findByIdAndDelete(id)
      res.status(200).json('The product has been Deleted!')
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
