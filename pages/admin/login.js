import axios from 'axios'
import { useRouter } from 'next/router'
import { useState } from 'react'
import Button from '@/components/Button'
import Layout from '@/components/layout/Layout'
import SVG from 'react-inlinesvg'

export default function login() {
  const [username, setUsername] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(false)
  const router = useRouter()

  const handleClick = async () => {
    try {
      await axios.post('http://localhost:3000/api/login', {
        username,
        password,
      })
      router.push('/admin/')
    } catch (err) {
      setError(true)
    }
  }

  return (
    <Layout title="Login">
      <div
        className="h-screen flex items-center"
        style={{ background: `url(/images/header-img.png) no-repeat center center / cover` }}
      >
        <div className="container">
          <div className="row justify-end my-10">
            <div className="lg:col-6 bg-gray-400 text-center rounded-xl py-5">
              <SVG src="/svg/person.svg" className="w-40 h-40 mx-auto" />
              <input
                type="text"
                placeholder="Username"
                className="mt-5 rounded-xl px-8 py-6 w-4/5 placeholder:text-gray-500"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="rounded-xl px-8 py-6 mt-5 w-4/5 placeholder:text-gray-500"
                onChange={(e) => setPassword(e.target.value)}
              />
              <Button className="w-3/4 mt-5" onClick={() => handleClick()}>
                Log In
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
