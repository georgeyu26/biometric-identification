import { Readable } from 'stream'

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const { SpeechClient } = require('@google-cloud/speech').v1p1beta1

    // Creates a client
    // eslint-disable-next-line prettier/prettier
    const client = new SpeechClient({
      keyFilename: './Audiokey.json',
    })
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
