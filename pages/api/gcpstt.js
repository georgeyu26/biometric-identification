import { Readable } from 'stream'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const { SpeechClient } = require('@google-cloud/speech').v1p1beta1

    // Creates a client
    // eslint-disable-next-line prettier/prettier
    const credentials = {
      client_email: 'keefecs492@cs492-382023.iam.gserviceaccount.com',
      private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC9nHTXAxLnBfLK\nbR+7I0qasDOdjcmYLlML8hUYxPM0UZkuXwuzSVxLy7QgaB2RqIfMBsY3H6eb61yt\n4EnieM5KRQyPQ3oQu5x7J+A4wA9d2j7UqPeREjzix9RPc8RQEOc5tE01QGuxhq8I\nldwMqUXvm3x5Rsx4RGcxM2ZoWzPGCaH3/UTFxijUF2ok4tOch5yxgRCeCQe0CLR1\n3z0M1iJg20NfU3d/aQPgGKY9e0Pe299TuXlofi0LpAi41gOTkLyz5SRaUUsBsZri\n/NudokQ3OxEmUCo+OOANf4kvHqhYaJ5bfgeZNoiW1IbCLhjL2kqgRImVBMGEUB9g\n9jQa+fELAgMBAAECggEAXhtcBicZZ54VLZDRkeDnMzVGuOjZaHV9dE1XWS7PAmWJ\nYHF97iL38wqMQRVLr7J0i7fFAzDr0EAVhJrwML4CrOvuWuCDofBrrthQufng5pTe\nYE/oZ5EktO23GyP7CD4LdSFevJJXoQmWr+0pBQOymUSTl+GitAJHMS0wo5S4co4T\nrfngbWkUq8NO5M2XzdiEWwalyZ2j9iF1V6Vux7j1Y6iSpMx10RFq52zYUPU6JC1Z\nDCWJwULBOvodL4q4mtZE33YeLKkt0hHFKbPanSWy9nVxdzwRqVTL5hL09+RyvlQx\ngP0eXVK4pMsDS2u21TgaacUN3GK/MMD25B9+G156cQKBgQDyOH6xSiQaTa31NMvT\n47eKjV3wvKOZefNj+ardScDVtE95HaA5OCbEkEYVblDrRRODhu/VyVlc1a+c/kD3\ntA8GZfVnScYTRdUCRmc/l9Zbxo6xWSqiRUrQ6DZsUIQypEMBXcUWNvwn8nMzDW7j\nOShXa78Eh5EAE9ZyFf94OiLfiQKBgQDIZcyVjPOl++SxqDCmzoZO214bTkGJfeAd\nX8NF9jIOmG39i4YH69uwRNBXIvkNl7+Mw/3oOri3tFm2HVMlgKVcAHPekhJjRVZB\nNRKu4UyQdLMksoJO3JnODPuk7RLfJR5x1BdQXCrLXkwPfXEP7fPmHB6kFwKJHW0A\nIsRIbb8y8wKBgAq6s+n4hcbgf/8nmovFP4EUp/+c64ZF36EjEw2AUdllhkuwI0PF\nl/oHBgO3AkCZq7acyIzowVuaX5ANtyUBxdSbuZYcr3h1FG1oXvRzLlycW//BGmFb\nvmeokZiUrHZtzkYGOE+2mc7PL4koZCwOgRn2PNzfgG3Hcy1Uih9yO885AoGBAL2Y\nMnq7JDlBnBjI+16VvlQVD2/eFfsy8DpaQ7GJP8q3RDjBLEmKSAr4z/PgzqihjURs\nmWiBRgnnw4idLfEpSUlF1Foa8PKiwvxmbgqudXWmM2bgzJA3/fwIJHzhHx2nTKp8\n8qHA0WwfBu8Qy0s64aovqH2ul2OKR3n9ap7r1h0pAoGBAJ+OwiGFsL+gpjZC/1Td\n9UpMXswte4eVfGUO410SaY5VQSOcc+W78Sg2WHT1UE0tGNy+bsO+g5KbkGgGlBTl\nIYcsB/TGjHyhOCMWd0SGgIRAyUdIEGKWZVjf7Hkvozk1QbH9R5kSTopqON5lxltJ\nYRJpP+aqBC9NcKT6vNAazLCO\n-----END PRIVATE KEY-----\n',
    }
    const client = new SpeechClient({ projectId: 'cs492-382023', credentials })
    const base64String = req.body.audioFile
    const buffer = Buffer.from(base64String, 'base64')

    const config = {
      encoding: 'WAV',
      sampleRateHertz: 44100,
      languageCode: 'en-US',
      audioChannelCount: '2',
    }

    const audio = {
      content: buffer,
    }

    const request = {
      audio: audio,
      config: config,
    }

    // Detects speech in the audio file
    const [response] = await client.recognize(request)
    const transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join('\n')

    console.log(`Transcription: ${transcription}`)

    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'max-age=180000')
    res.status(200).json(JSON.stringify(transcription))
  } catch (err) {
    console.log('ERROR', err)
    return res.status(500)
  }
}
