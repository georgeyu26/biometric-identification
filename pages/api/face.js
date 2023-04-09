import axios from 'axios'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const credentials = {
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQClu3tuuznbuAn9\nODaGduoHQW9FkRQdq7FaEelAK/W2kaKVgxN4NqytMV1FJGoAJ7NOHg3D9Gy2o9od\ntWgx8LFccwHvaMQzUGgiGBlvTmp4LyvuXrUpeJxWD8im5CkhKxhhbnc1ZdWMXbrA\n6LHkRbBVX4yUcMxk34EkMwYSzveRRT2z+Jto3sejFncbBeTOLMCfp6n56LVQ8YaE\n23XfJpBeOFbC7omx79ZXselFY3DfyY7QvLosb6oQu7R6RN5KEEhGIYPpZuUMejAo\nfQc6YO8tTO584gNQwJW4HB07gnhBfNweSPKFSp8/AOTINNSb6yQszVMiqU2AXTGy\nUhzrNmhBAgMBAAECggEACqFuvrDQOoWA0IcHSlM82jfKhyQR7gBKGTyuYUEgmvQX\nAW+ds1eQdnCE6s815GongHKBkAjw4zs53a957kAh5Ev1OxHVifQVpeA1W3QkdK6T\n6w+Un8Mehg+vn3Lhp4C/6NoA2AI+8yi89qxGYt3MfIFrP0dH+Q10F2oVcOXpL95u\ncJZTE15DOEkhpXcmsnEjw/ybahD0E5EPxSgWijLAGDVAZXWHrWL7nBZ6OXN/gWyq\nmaGc9yLott4E6MeDPIwaJ3SUZyNhGI4o54/hyLLtNjMrieKx393PqGmgz2UeoK0b\nfwiHXCwcHE3irTvGaRe7h9IgthihNvH2qCPgqsb0lQKBgQDVYkES6q03e6WJdC4C\nDEWZN/ZYC2s9FByuLoCxEvsQ05+artlcrJiD/ha3TByA1Sb2zhdW07mzMbS9HF0U\n12voyX8aCGgkyf5sHTHphaqG7aI0NRFbw/XnikRPfS5KNsQ2Vw8ikPuhGAG9pGka\ne7IvLn7nNFMfpcU2uGF1BZBWNQKBgQDG1O+gI9x7tGImRAiMca4E2lsrrVZZaCMA\nm6pGO+pRy1cv1S334JBt03FPDpAIe0k1kNhak8Y3zVZcRZi9hfytlcVklSzWKBGP\n5uOwraaYKvA2hjinB1KK2DfbUoNf2olhVeSjQhemU9FfvL58+iMl5Cf+NahrDUPj\npWV0aeGbXQKBgBZcmZ014rkxyANDnZ6xUongB3zqlW5tMSQ/01S7PHxi8RLwx+6i\nV8ldU1waKdKGg/LRXjjHL2rMBrjaxBZvDOv0UdGUl/VjBbqmxJhIXbqOJLV76jnH\nq3l8T/RUlglI+/8F2JwyvWwAbA5HsIwJ8n5nTP1FyoBCiwxU/kGZN6sRAoGAG1H0\n3w8uY30Eo3djqVCRda8/KcA2hjBt5s581guzhaun/jWPjGi5z61m+1Ln7ZJrG8Yc\nRE3bxZ0cSa9yblAzyPI0Xj61G3QD/b7e+E7T/kKgIQ3OSP0TlWpiOmubC5eumsY/\nlUMmlr8bnMkFb4y7OaCg8igTTSpUcrouN5G44y0CgYAfdlz7f83rMfoNdN629Gf3\nOVk5Qo3lfb76MM17xa/xciysnkzF64UZZbHpQ4uulsOM5nxrhDw9c/xKIyLNZGk2\nwcagdU4vaI7jwt3BmgmK6y3PxXerHfR3VVsba1Rrq0zmBL+jK7UMRrLVy5HdnpLY\nn42M+5h0SZdebWZo4fCvRQ==\n-----END PRIVATE KEY-----\n',
      client_email: 'geeseresearch@cs-492-382206.iam.gserviceaccount.com',
    }

    const vision = require('@google-cloud/vision')

    const client = new vision.ImageAnnotatorClient({
      projectId: 'cs-492-382206',
      credentials,
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

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '10mb', // Set desired value here
    },
  },
}
