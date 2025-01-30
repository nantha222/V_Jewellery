import Jewelry from '../models/Jewelry';

export async function uploadJewelry(req, res) {
  try {
    const { name, category, price, description, modelURL } = req.body;
    const newJewelry = new Jewelry({ name, category, price, description, modelURL });
    await newJewelry.save();
    res.status(201).json({ message: 'Jewelry uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to upload jewelry', error });
  }
}
