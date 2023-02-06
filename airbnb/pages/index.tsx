import type { NextPage } from 'next'
import { Props } from 'next/dist/client/script'
import Head from 'next/head'
import React from 'react'
import Banner from '../components/Banner'
import Header from '../components/Header'
import SmallCard from '../components/SmallCard'
import { ExploreData } from '../Models/ExploreData.model'

interface HomeProps {
	exploreData: ExploreData[];
	cardsData: any;
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
								location={location} />
						))}
					</div>
				</section>
				<section className='pt-6'>
					<h2 className='text-4xl font-semibold py-8'>Live anywhere</h2>
					{/* {cardsData.map((item: any) => (

					))} */}
				</section>
			</main>
		</div>
	)
}

export async function getStaticProps() {
	const exploreData: ExploreData = await fetch('https://links.papareact.com/pyp')
		.then(
			(res) => res.json()
		)
	
	const cardsData = await fetch('https://links.papareact.com/zp1')
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
