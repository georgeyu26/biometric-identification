import axios from 'axios'
import React, { useState } from 'react'

const WHISPER_API_KEY = 'XJNKRP9CD14F2Z5Q4ZCJ3ZUKFJM48YYA'

export default function WhisperPage() {
  const [audioFile, setAudioFile] = useState(null)

  async function handleDemo() {
    try {
      const url = '/api/whisper'
      const resp = await axios.get(url)
      console.log(resp.data)
    } catch (err) {
      console.error(err)
    }
  }

  function handleFileChange(e) {
    setAudioFile(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const reader = new FileReader()
      reader.readAsDataURL(audioFile)
      reader.onloadend = async () => {
        const base64String = reader.result.replace(/^data:(.*;base64,)?/, '')
        try {
          const resp = await axios.post('/api/whisper', { audioFile: base64String })
          console.log(resp.status)
        } catch (err) {
          console.error(err)
        }
      }
    } catch (err) {
      console.error(err)
    }
  }
  return (
    <>
      <div>
        WhisperAPI Transcription demo page which includes an upload and call to the whisper API.
      </div>
      <div>
        Whisper is a model created by OpenAI. The alternative we will compare to is AWS Rekognition.
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload an audio file here!</label>
        </div>
        <input type="file" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      <button className="mt-4 rounded-sm outline" onClick={handleDemo}>
        Jamaican Transcribe Button
      </button>
    </>
  )
}
