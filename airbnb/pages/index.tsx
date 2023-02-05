import type { NextPage } from 'next'
import Head from 'next/head'
import Banner from '../components/Banner'
import Header from '../components/Header'

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>AirBnb</title>
      </Head>

      <Header />

      <Banner />

    </div>
  )
}

export default Home
