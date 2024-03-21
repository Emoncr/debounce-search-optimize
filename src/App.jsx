import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);



  // Handling  Search Here
  useEffect(() => {
    const debounce = setTimeout(() => {  // debouncing
      (async () => {
        const response = await fetch(`https://dummyjson.com/products/search?q=${search}`);
        const data = await response.json();
        console.log(data);
        setProducts(data.products)
      }
      )()
    }, [500])

    return () => clearTimeout(debounce)
  }, [search])



  return (
    <>
      <section className='py-10 bg-white/10 '>
        <div className="container mx-auto">
          <div className="flex flex-col items-center gap-4 p-4">
            <div className="w-full max-w-sm rounded-lg border border-gray-400 dark:border-gray-800">
              <div className="flex items-center h-10 pl-3">
                <svg xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 stroke-2.5">
                  <circle cx={11} cy={11} r={8} />
                  <path d="m21 21-4.3-4.3" />
                </svg>


                <input
                  onChange={e => setSearch(e.target.value)} // set search value
                  value={search}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Search for products..."
                  type="text"
                />


              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-2 md:p-4 mt-7">
            {
              products.length !== 0 && products.map((product) => (
                <div key={product.id} className="relative group overflow-hidden rounded-lg shadow-lg border border-gray-200">
                  <a className="absolute inset-0 z-10" href="#">
                    <span className="sr-only">View</span>
                  </a>
                  <img alt="Product 1" className="object-cover w-full h-48 md:h-60" height={300} src={product.thumbnail} width={400} style={{ aspectRatio: '400 / 300', objectFit: 'cover' }} />
                  <div className="bg-white p-2 md:p-4 dark:bg-gray-950">
                    <h3 className="font-semibold text-base md:text-lg">{product.title}</h3>
                    <h4 className="font-semibold text-sm md:text-base">{product.price}</h4>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </>
  )
}

export default App
