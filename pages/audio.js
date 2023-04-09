import axios from 'axios'
import React, { useState } from 'react'

const WHISPER_API_KEY = 'XJNKRP9CD14F2Z5Q4ZCJ3ZUKFJM48YYA'

export default function WhisperPage() {
  const [audioFile, setAudioFile] = useState(null)
  const [whisperTranscript, setWhisperTranscript] = useState('')
  const [googleTranscript, setGoogleTranscript] = useState('')
  const [loading, setLoading] = useState(false)

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
        const res = reader.result
        const base64String = res.replace(/^data:(.*;base64,)?/, '')
        try {
          setLoading(true)
          var resp = await axios.post('/api/whisper', { audioFile: base64String })
          console.log(resp)
          setWhisperTranscript(resp.data.text)
          resp = await axios.post('api/gcpstt', { audioFile: base64String })
          setGoogleTranscript(resp.data)
          console.log(resp)
          setLoading(false)
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
        Whisper is a model created by OpenAI. The alternative we will compare to is GCP speech to
        text. Please upload Flac format files for test purposes.
      </div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload an audio file here!</label>
        </div>
        <input type="file" onChange={handleFileChange} />
        <button className="rounded-sm px-2 outline outline-2" type="submit">
          Submit
        </button>
      </form>
      <h1 className="mt-4 text-center text-xl">Transcription side to side</h1>
      <div className="flex items-center justify-center">
        {loading ? <h1>Loading...</h1> : null}
        <div className="row-span-4  px-10">
          <h1>Whisper API Transcription</h1>
          <p className="outline outline-2">{whisperTranscript}</p>
        </div>
        <div className="row-span-4 px-10">
          <h1>Google Cloud API Transcription</h1>
          <p className="outline outline-2">{googleTranscript}</p>
        </div>
      </div>
    </>
  )
}
