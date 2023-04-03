import axios from 'axios'
import React, { useState } from 'react'

export default function FacePage() {
  const [imageFile, setImageFile] = useState(null)

  async function handleDemo() {
    try {
      const url = '/api/face'
      const resp = await axios.get(url)
      console.log(resp.data)
    } catch (err) {
      console.error(err)
    }
  }

  function handleFileChange(e) {
    setImageFile(e.target.files[0])
  }

  async function handleSubmit(e) {
    e.preventDefault()
    console.log(imageFile)
    const formData = new FormData()
    formData.append('imageFile', imageFile)

    try {
      const resp = await axios.post('/api/face', formData)
      console.log(resp.status)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div>Test for face recognition</div>
      <div></div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload an image file here!</label>
        </div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      <button className="mt-4 rounded-sm outline" onClick={handleDemo}>
        Handle Demo Button
      </button>
    </>
  )
}
