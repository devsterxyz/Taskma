import { useEffect } from 'react'

export default function OAuthSuccess() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)

    const accessToken = params.get('accessToken')
    const refreshToken = params.get('refreshToken')

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken)
    }

    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken)
    }

    window.location.replace('/')
  }, [])

  return (
    <main className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 text-zinc-950">
      <div className="rounded-lg border border-zinc-200 bg-white px-5 py-4 text-sm shadow-sm">
        Logging in...
      </div>
    </main>
  )
}
