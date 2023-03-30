import axios from 'axios'

export default async (req, res) => {
  try {
    const vision = require('@google-cloud/vision')

    const client = new vision.ImageAnnotatorClient({
      keyFilename: './Visionkey.json',
    })

    const fileName = './face.png'
    const [result] = await client.faceDetection(fileName)
    const faces = result.faceAnnotations

    faces.forEach((face, i) => {
      console.log(`  Face #${i + 1}:`)
      console.log(`    Joy: ${face.joyLikelihood}`)
      console.log(`    Anger: ${face.angerLikelihood}`)
      console.log(`    Sorrow: ${face.sorrowLikelihood}`)
      console.log(`    Surprise: ${face.surpriseLikelihood}`)
    })

    return res.status(200).send('faces success')
  } catch (err) {
    return res.status(500)
  }
}
