//app/page.tsx

import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="p-8 bg-white rounded-lg shadow-md text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to My Auth App</h1>
        <p className="mb-8">This is a simple authentication app built with Next.js</p>
        <Link 
          href="/login" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Login
        </Link>
      </div>
    </div>
  )
}