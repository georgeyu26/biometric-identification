import axios from 'axios'
import React, { useState } from 'react'

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
    setAudioFile(event.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(audioFile)
    const formData = new FormData()
    formData.append('audioFile', audioFile)

    try {
      const resp = await axios.get('/api/whisper', formData)
      console.log(resp.status)
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
        <input type="file" value={audioFile} accept="audio/*" />
        <button type="submit">Submit</button>
      </form>
      <button className="mt-4 rounded-sm outline" onClick={handleDemo}>
        Jamaican Transcribe Button
      </button>
    </>
  )
}
