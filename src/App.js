import React, { useState, useEffect } from 'react'
import axios from 'axios'


// custom hookki
const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

// custom hookki
const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    console.log('effect')
    axios
      .get(`https://restcountries.eu/rest/v2/name/${name.toLowerCase()}`)
      .then(response => {
        console.log('promise fulfilled')
        setCountry(response.data[0])
      }).catch(error => {
        console.log(`Ei löydetty ${name.toLowerCase()}`)
        setCountry(null)
      })
  }, [name])
  // Jos parametrina olisi tyhjä taulukko [], suoritetaan efekti ainoastaan komponentin ensimmäisen renderöinnin jälkeen.

  return country
}



const Country = ({ country }) => {

  if (!country) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country.name} </h3>
      <div>capital {country.capital} </div>
      <div>population {country.population}</div> 
      <img src={country.flag} height='100' alt={`flag of ${country.name}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('') // tämä päivittyy vain kun painettu submit
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value) // sijoittaa syötetyn valuen nameen. nameInput value päivittyy aina kun tekstiä kirjoitetaan <inputissa>
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App