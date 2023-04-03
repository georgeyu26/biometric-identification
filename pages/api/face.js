import axios from 'axios'

export default async (req, res) => {
  try {
    const vision = require('@google-cloud/vision')

    const client = new vision.ImageAnnotatorClient({
      keyFilename: './Visionkey.json',
    })

    const base64String = req.body.imageFile
    const buffer = Buffer.from(base64String, 'base64')
    const [result] = await client.faceDetection(buffer)
    const faces = result.faceAnnotations

    const faceData = faces.map((face) => ({
      joyLikelihood: face.joyLikelihood,
      angerLikelihood: face.angerLikelihood,
      sorrowLikelihood: face.sorrowLikelihood,
      surpriseLikelihood: face.surpriseLikelihood,
    }))

    return res.status(200).json(faceData)
  } catch (err) {
    console.error(err)
    return res.status(500).send('Server Error')
  }
}
