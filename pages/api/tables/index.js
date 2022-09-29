import dbConnect from 'utils/mongo'

import Table from '../../../models/Table'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()
  if (method === 'GET') {
    try {
      const tables = await Table.find()
      res.status(200).json(tables)
    } catch (err) {
      res.status(500).json(err)
    }
  }
  if (method === 'POST') {
    try {
      const table = await Table.create(req.body)
      res.status(201).json(table)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
