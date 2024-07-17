import React from "react";
import {Login} from "../components/Login"
import HeroSection from '../components/HeroSection';
import About from "../components/About";
import Qualities from "../components/Qualities";
import Menu from "../components/Menu";
import WhoAreWe from "../components/WhoAreWe";
import Team from "../components/Team";
import Reservation from "../components/Reservation";

const Home = () => {
    return (
        <>
            <Login />
            <HeroSection />
            <About />
            <Qualities />
            <Menu />
            <WhoAreWe />
            <Team />
            <Reservation />
        </>
    );
};

export default Home;