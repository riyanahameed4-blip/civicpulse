import { useState, useEffect } from "react"

function App() {
  const [complaints, setComplaints] = useState([])
  const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [latitude, setLatitude] = useState('')
const [longitude, setLongitude] = useState('')
const [photo, setPhoto] = useState(null)

  useEffect(() =>{
    fetch('http://127.0.0.1:8000/api/complaints/')
    .then(res => res.json())
      .then(data => setComplaints(data))
  }, [])
  const handleSubmit = async (e) => {
  e.preventDefault()

  const formData = new FormData()
  formData.append('title', title)
  formData.append('description', description)
  formData.append('latitude', latitude)
  formData.append('longitude', longitude)
  formData.append('photo', photo)

  const res = await fetch('http://127.0.0.1:8000/api/complaints/', {
    method: 'POST',
    body: formData,
  })

  if (res.ok) {
    const newComplaint = await res.json()
    setComplaints([newComplaint, ...complaints])
    setTitle('')
    setDescription('')
    setLatitude('')
    setLongitude('')
    setPhoto(null)
  } else {
    console.log(await res.json())
  }
}
  return(
    <div>
      <h1>CivicPulse</h1>
      <form onSubmit={handleSubmit}>
  <input
    placeholder="Title"
    value={title}
    onChange={e => setTitle(e.target.value)}
  />
  <textarea
    placeholder="Description"
    value={description}
    onChange={e => setDescription(e.target.value)}
  />
  <input
    placeholder="Latitude"
    value={latitude}
    onChange={e => setLatitude(e.target.value)}
  />
  <input
    placeholder="Longitude"
    value={longitude}
    onChange={e => setLongitude(e.target.value)}
  />
  <input
    type="file"
    onChange={e => setPhoto(e.target.files[0])}
  />
  <button type="submit">Submit</button>
</form>
      {complaints.map(c => (
        <div key={c.id}>
          <h3>{c.title}</h3>
          <img src={c.photo} alt={c.title} width="300" />
          <p>{c.description}</p>
          <p>Status: {c.status}</p>
        </div>
      ))}
    </div>
  )
}

export default App