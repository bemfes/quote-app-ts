import { useEffect, useState } from 'react'

import './index.css'

interface Info {
  quote: string;
  category: string;
  author: string;
}

function App() {
  
  const [error, setError] = useState<null | string>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [info, setInfo] = useState<Info | null>(null)
  const [getQuote, setGetQuote] = useState<boolean>(false)

  useEffect(() => {

    const controller = new AbortController()
    const signal = controller.signal

    async function getData(): Promise<void> {
      try {
        setError(null)
        const res: Response = await fetch('https://api.api-ninjas.com/v1/quotes', {
          signal,
          method: "GET",
          headers: {
            'X-Api-Key': `UK1kizoG5WKii/1biCikBw==eXaVxkEpp99DeIuw`
            
          },
        })
        if (!res.ok) {
          throw new Error('Failed to fetch')
        }

        const data: Info[] = await res.json()
      
        setInfo(data[0])
        setLoading(false)
        setError(null)

      } catch(err: unknown) {

        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('Unknown error')
        }
        setLoading(false)
      } 
    }
    getData()

    return () => {
      controller.abort()
    }
  }, [getQuote])


  if (error) return <p className='error'>Error: {error}</p>
  if (loading) return <p className='loading'>Loading...</p>

  return (
    <>
      <div className="content">
        <p className='quote__text'>{info?.quote}</p>
        <p className='quote__author'>{info?.author}</p>
        <p className='quote__category'>Category: {info?.category}</p>
      </div>
      <button className='btn' onClick={() => {
        setGetQuote(prev => !prev)
        setLoading(true)
        }}> New quote</button>
    </>
  )
}

export default App
