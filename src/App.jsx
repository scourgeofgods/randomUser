import { useEffect, useState } from 'react'
import {
  FaEnvelope,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa'

const url = 'https://randomuser.me/api/'
const defaultImage = 'https://randomuser.me/api/portraits/men/25.jpg'
function App() {
  const [loading, setLoading] = useState(true)
  const [person, setPerson] = useState(null)
  const [title, setTitle] = useState('name')
  const [value, setValue] = useState('random person')
  const [error, setError] = useState(false)
  const getPerson = async () => {
    setLoading(true)
    try {
      const response = await fetch(url)
      const data = await response.json()
      const person = data.results[0]
      const { phone, email } = person
      const { large: image } = person.picture
      const { password } = person.login
      const { first, last } = person.name
      const {
        dob: { age },
      } = person
      const {
        street: { number, name },
      } = person.location
      const newPerson = {
        image,
        phone,
        email,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      }
      setPerson(newPerson)
      setLoading(false)
      setTitle('name')
      setValue(newPerson.name)
    } catch (error) {
      setLoading(false)
      setError(true)
    }
  }

  const handleValue = (e) => {
    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label
      setTitle(newValue)
      setValue(person[newValue])
    }
  }

  useEffect(() => {
    getPerson()
  }, [])

  return (
    <main className="main">
      <div className="vh-100 container">
        <div className="row h-50 bg-danger"></div>
        <div className="row h-50 mt-n10 justify-content-center ">
          <div className="col-md-8">
            <div className="card h-100">
              <div className="card-image">
                <img
                  src={(person && person.image) || defaultImage}
                  alt=""
                  className="rounded-circle border-5 border p-2"
                  style={{ width: 150, heigth: 150 }}
                />{' '}
                <p className="text-uppercase">{title}</p>
                <p className="text-capitalize">{value}</p>
                <div className="values-list d-flex justify-content-center w-75 mx-auto ">
                  <button
                    className="icon"
                    data-label="name"
                    onMouseOver={handleValue}
                  >
                    <FaUser />
                  </button>
                  <button
                    className="icon"
                    data-label="email"
                    onMouseOver={handleValue}
                  >
                    <FaEnvelope />
                  </button>
                  <button
                    className="icon"
                    data-label="age"
                    onMouseOver={handleValue}
                  >
                    <FaCalendarTimes />
                  </button>
                  <button
                    className="icon"
                    data-label="street"
                    onMouseOver={handleValue}
                  >
                    <FaMap />
                  </button>
                  <button
                    className="icon"
                    data-label="phone"
                    onMouseOver={handleValue}
                  >
                    <FaPhone />
                  </button>
                  <button
                    className="icon"
                    data-label="password"
                    onMouseOver={handleValue}
                  >
                    <FaLock />
                  </button>
                </div>
                <button
                  className="btn btn-danger mt-4 text-white"
                  onClick={getPerson}
                >
                  {loading ? 'Loading...' : 'Random User'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
