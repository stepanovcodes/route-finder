import { Link } from 'react-router-dom';

export default function Empty({title}) {
    return (
      <>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">{title} not found</h1>
      </>
    )
  }