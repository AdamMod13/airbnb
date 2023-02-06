import type { NextPage } from 'next'
import Head from 'next/head'
import React from 'react'
import Banner from '../components/Banner'
import Footer from '../components/Footer'
import Header from '../components/Header'
import LargeCard from '../components/LargeCard'
import MediumCard from '../components/MediumCard'
import SmallCard from '../components/SmallCard'
import { ExploreData } from '../Models/ExploreData.model'
import { LiveAnywhereData } from '../Models/LiveAnywhereData.model'

interface HomeProps {
	exploreData: ExploreData[];
	cardsData: LiveAnywhereData[];
}

const Home: NextPage<HomeProps> = ({exploreData, cardsData}) => {
	return (
		<div className="">
			<Head>
				<title>AirBnb</title>
			</Head>

			<Header />
			<Banner />

			<main className='max-w-7xl mx-auto px-8 sm:px-16'>
				<section className='pt-6'>
					<h2 className='text-4xl font-semibold pb-5'>Explore nearby</h2>
					{/* Pull data from server */}
					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
						{exploreData?.map(({img, location, distance}) => (
							<SmallCard 
								key={img}
								img={img} 
								distance={distance}
								location={location} 
							/>
						))}
					</div>
				</section>
				<section className='pt-6'>
					<h2 className='text-4xl font-semibold py-8'>Live anywhere</h2>
					<div className='flex space-x-3 overflow-scroll scrollbar-hide p-3 -ml-3'>
						{cardsData?.map(({img, title}) => (
							<MediumCard
								key={img}
								img={img}
								title={title}	
							/>
						))}
					</div>
				</section>

				<LargeCard 
					img="https://links.papareact.com/4cj"
					title="The Greatest Outdoors"
					description="WishLists curated by Airbnb."
					buttonText="Get Inspired"
				/>
			</main>
			<Footer />
		</div>
	)
}

export async function getStaticProps() {
	const exploreData: ExploreData = await fetch('https://links.papareact.com/pyp')
		.then(
			(res) => res.json()
		)
	
	const cardsData: LiveAnywhereData = await fetch('https://links.papareact.com/zp1')
		.then(
			(res) => res.json()
		)

	return {
		props: {
			exploreData,
			cardsData
		},
	};
}

export default Home
