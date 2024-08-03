const Dog = require('../models/dog');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Helper function to save the image
async function saveImage(file) {
  const filePath = path.join(__dirname, '../../uploads', file.originalname);
  await sharp(file.path).resize(500, 500).toFile(filePath);
  return filePath;
}

exports.uploadDogPic = async (req, res) => {
  if (!req.file || !req.file.filename) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  try {
    const filePath = await saveImage(req.file);
    const dog = new Dog({ imageUrl: filePath });
    await dog.save();
    res.status(201).json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteDogPic = async (req, res) => {
  try {
    const dog = await Dog.findByIdAndDelete(req.params.id);
    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    fs.unlinkSync(dog.imageUrl);
    res.status(200).json({ message: 'Dog deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateDogPic = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    const filePath = await saveImage(req.file);
    fs.unlinkSync(dog.imageUrl);
    dog.imageUrl = filePath;
    await dog.save();
    res.status(200).json(dog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDogPic = async (req, res) => {
  try {
    const dog = await Dog.findById(req.params.id);
    if (!dog) return res.status(404).json({ message: 'Dog not found' });
    res.sendFile(path.resolve(dog.imageUrl));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getDogPics = async (req, res) => {
  try {
    const dogs = await Dog.find();
    res.status(200).json(dogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
