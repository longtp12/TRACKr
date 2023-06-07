import { Navbar } from "../../components/navbar/Navbar"
import { Carousel } from "../../components/carousel/Carousel"
import "./home.scss"

import React from 'react'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <div className="bodyContainer">
            <Carousel/>
        </div>
    </div>
  )
}

export default Home