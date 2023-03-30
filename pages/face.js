import axios from 'axios'
import React, { useState } from 'react'

export default function FacePage() {
  async function handleSubmit(e) {
    e.preventDefault()
    const formData = new FormData()

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
        <button type="submit">Submit</button>
      </form>
    </>
  )
}
