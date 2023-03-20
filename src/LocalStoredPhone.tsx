import { BASE_URL } from './App'
function LocalStoredPhone(phone: string, index: number) {
  return (
    <li key={index}>
      <a target="_blank" href={`${BASE_URL}${phone}`}>
        {phone}
      </a>
    </li>
  )
}

export default LocalStoredPhone
