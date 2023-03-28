import axios from 'axios'
import fs from 'fs'
const WHISPER_API_KEY = 'XJNKRP9CD14F2Z5Q4ZCJ3ZUKFJM48YYA'
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const url = 'https://transcribe.whisperapi.com'
    const headers = {
      Authorization: `Bearer ${WHISPER_API_KEY}`,
    }
    const audioFile = {
      file: fs.createReadStream('./tempfile.wav'),
    }
    const data = {
      fileType: 'wav', //default is wav
      diarization: 'false',
      //Note: setting this to be true will slow down results.
      //Fewer file types will be accepted when diarization=true
      numSpeakers: '2',
      file: audioFile,
      //if using diarization, you can inform the model how many speakers you have
      //if no value set, the model figures out numSpeakers automatically!
      // url: 'URL_OF_STORED_AUDIO_FILE', //can't have both a url and file sent!
      language: 'en', //if this isn't set, the model will auto detect language,
      task: 'transcribe', //default is transcribe. Other option is "translate"
      //translate will translate speech from language to english
    }
    return res.status(200).send('Good whisperAPI call.')
  } catch (err) {
    return res.status(500)
  }
}
