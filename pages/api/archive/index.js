import ArchiveTable from 'models/ArchiveTable'
import dbConnect from 'utils/mongo'

export default async function handler(req, res) {
  const { method } = req

  await dbConnect()
  if (method === 'GET') {
    try {
      const archive = await ArchiveTable.find()
      res.status(200).json(archive)
    } catch (err) {
      res.status(500).josn(err)
    }
  }
  if (method === 'POST') {
    try {
      const archive = await ArchiveTable.create(req.body)
      res.status(201).json(archive)
    } catch (err) {
      res.status(500).json(err)
    }
  }
}
