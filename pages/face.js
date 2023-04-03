import axios from 'axios'
import React, { useState } from 'react'

export default function FacePage() {
  const [imageFile, setImageFile] = useState(null)
  const [faceData, setFaceData] = useState(null)

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
      setFaceData(resp.data)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div>Test for face recognition</div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Upload an image file here!</label>
        </div>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Submit</button>
      </form>
      <div>
        {faceData && (
          <ul>
            {faceData.map((face, i) => (
              <li key={i}>
                <div>Face #{i + 1}:</div>
                <div>Joy: {face.joyLikelihood}</div>
                <div>Anger: {face.angerLikelihood}</div>
                <div>Sorrow: {face.sorrowLikelihood}</div>
                <div>Surprise: {face.surpriseLikelihood}</div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  )
}
