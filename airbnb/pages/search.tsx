import { useRouter } from 'next/router'
import React from 'react'
import Footer from '../components/Footer'
import Header from '../components/Header'
import {format} from 'date-fns/fp'
import { SearchResults } from '../Models/SearchResults.model'
import InfoCard from '../components/InfoCard'
import Map from '../components/Map'

export default function search( {searchResults}: any ) {
  const router = useRouter();
  const {location, startDate, endDate, numberOfGuests} = router.query;
  
  const formattedStartDate = startDate != undefined ? format("dd.MM.yy", new Date(startDate.toString())) : null;
  const formattedEndDate = endDate != undefined ? format("dd.MM.yy", new Date(endDate.toString())) : null;
  const range = `${formattedStartDate} - ${formattedEndDate}`

  return (
    <div>
      <Header placeholder={`${location} | ${range} | ${numberOfGuests} guests`}/>
      <main className='flex'>
        <section className='flex-grow pt-14 px-6 border-b-2'>
          <p className='text-xs'>300+ Stays for {numberOfGuests} at {range}</p>
          <h1 className='text-3xl font-semibold mt-2 mb-6'>Stays in {location}</h1>
          <div className='hidden lg:inline-flex space-x-3 mb-5 text-gray-800 whitespace-nowrap'>
            <p className='button'>Cancellation flexibility</p>
            <p className='button'>Type of place</p>
            <p className='button'>Price</p>
            <p className='button'>Rooms and beds</p>
            <p className='button'>More filters</p>
          </div>
          <div>
            {searchResults.map(({img, location, title, description, star, price, total}: SearchResults) => (
              <InfoCard 
                img={img}
                location={location}
                title={title}
                description={description}
                star={star}
                price={price}
                total={total} 
                long={undefined} 
                lat={undefined}              
              />
            ))}
          </div>
        </section>

        <section className='min-w-[600px]'>
          <Map 
            searchResults={searchResults}
          />
        </section>
      </main>
      <Footer/>
    </div>
  )
}

export async function getServerSideProps() {
  const searchResults: SearchResults = await fetch("https://links.papareact.com/isz")
    .then(
      (res) => res.json()
    )
  
  return {
    props: {
      searchResults: searchResults
    }
  }
}
