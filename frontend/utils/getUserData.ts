import axios from 'axios'
import { cookies } from 'next/headers'
 
export default async function getUserData() {
  const cookieStore = cookies()
  const userToken = cookieStore.get('userToken')
  

  const response= axios.post('')

  return '...'
}