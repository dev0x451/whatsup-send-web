import { useState, useEffect } from 'react'
import whatsAppLogo from './assets/WhatsAppLogo.svg'
import './App.css'
import LocalStoredPhone from './LocalStoredPhone'

export const BASE_URL = 'https://api.whatsapp.com/send?phone='

type Phones = string[]

function App() {
  const [phone, setPhone] = useState('')
  const [localPhones, setLocalPhones] = useState<Phones>([])

  function saveToLocal() {
    const parse = localStorage.getItem('phones')

    if (!parse) {
      localStorage.setItem('phones', JSON.stringify([phone]))
      setLocalPhones([phone])

      return
    }

    const phones = JSON.parse(parse)
    console.log(phones)
    if (!phones.includes(phone)) {
      localStorage.setItem('phones', JSON.stringify([...localPhones, phone]))
      // setLocalPhones([...localPhones])
      setLocalPhones([...localPhones, phone])
    }
  }

  function clearLocal() {
    localStorage.removeItem('phones')
    setLocalPhones([])
  }

  function onChange(e: { target: HTMLInputElement }) {
    setPhone(e.target.value)
  }

  useEffect(() => {
    const parse = localStorage.getItem('phones')
    if (parse) {
      setLocalPhones(JSON.parse(parse))
    }
  }, [])

  return (
    <>
      <img src={whatsAppLogo} width="100px" height="100px" />

      <input type="text" onChange={onChange} />

      <a target="_blank" href={`${BASE_URL}${phone}`}></a>
      <button onClick={saveToLocal} className="">
        Послать через WhatsApp
      </button>
      <button onClick={clearLocal} className="">
        Очистить
      </button>

      <ul>{localPhones.map((item, i) => LocalStoredPhone(item, i))}</ul>
    </>
  )
}

export default App
