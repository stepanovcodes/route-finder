import { Link } from 'react-router-dom';

export default function Home() {
    return (
      <>
        <div className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <p className="text-base font-semibold text-indigo-600">Please read the instructions below</p>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">Welcome to Code Review</h1>
            <p className="mt-6 text-base leading-7 text-gray-600">1. You are welcome to add new rows to any of the INPUT page tables</p>
            <p className="mt-6 text-base leading-7 text-gray-600">2. Please edit or delete rows only if you created them</p>
            <p className="mt-6 text-base leading-7 text-gray-600">3. Do not create, edit, or delete any routing problems on the Create Routing Problem page, as Mapbox rarely returns solutions</p>
            <p className="mt-6 text-base leading-7 text-gray-600">4. Finally, go to the View Routing Solutions page and check out the map! It's really cool to have integrated it into the page!</p>
          </div>
        </div>
      </>
    )
  }

