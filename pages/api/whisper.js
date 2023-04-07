import axios from 'axios'
import FormData from 'form-data'
import fs from 'fs'
import { Readable } from 'stream'

const WHISPER_API_KEY = 'XJNKRP9CD14F2Z5Q4ZCJ3ZUKFJM48YYA'

function urltoFile(url, filename, mimeType) {
  return fetch(url)
    .then(function (res) {
      return res.arrayBuffer()
    })
    .then(function (buf) {
      return new File([buf], filename, { type: mimeType })
    })
}
// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
  try {
    const url = 'https://transcribe.whisperapi.com'
    const headers = {
      Authorization: `Bearer ${WHISPER_API_KEY}`,
    }
    const form = new FormData()
    const base64String = req.body.audioFile
    const buffer = Buffer.from(base64String, 'base64')
    var audioStream = Readable.from(buffer)
    audioStream.path = `whisperaudio.mp3`
    form.append('file', audioStream)
    form.append('diarization', 'false')
    form.append('numSpeakers', '2')
    form.append('fileType', 'mp3')
    form.append('language', 'en')
    form.append('task', 'transcribe')
    const resp = await axios.post(url, form, {
      headers: headers,
    })
    res.setHeader('Content-Type', 'application/json')
    res.setHeader('Cache-Control', 'max-age=180000')
    res.status(200).json(JSON.stringify(resp.data))
  } catch (err) {
    console.log('ERROR', err.response.data)
    return res.status(500)
  }
}
