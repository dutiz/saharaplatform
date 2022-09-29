import dbConnect from 'utils/mongo'

import Table from '../../../models/Table'

export default async function handler(req, res) {
  const {
    method,
    query: { id },
  } = req

  await dbConnect()
  if (method === 'GET') {
    try {
      const table = await Table.findById(id)
      res.status(200).json(table)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'PUT') {
    try {
      const table = await Table.findByIdAndUpdate(id, req.body, { new: true })
      res.status(200).json(table)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'DELETE') {
    try {
      await Table.findByIdAndDelete(id)
      res.status(200).json('The table has been deleted!')
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
