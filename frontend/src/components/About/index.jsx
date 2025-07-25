import React from "react";
import './styles.css'
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
    return (
        <>
            <section className="about" id="about">
                <div className="container">
                    <div className="banner">
                        <div className="top">
                            <h1 className="heading">SOBRE NÓS</h1>
                            <p>A única coisa que levamos a sério é a comida.</p>
                        </div>
                        <p className="mid">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                            Provident possimus optio adipisci dolores impedit illum iusto
                            perferendis, laudantium quod accusamus consequuntur consectetur,
                            tempore nulla error iure reiciendis dolorem assumenda.
                            Necessitatibus fugit asperiores totam rem esse exercitationem
                            iusto ipsum qui dolore ex, accusantium repellat mollitia
                            repellendus.
                        </p>
                        <Link to={"/"}>
                            NOSSO MENU{" "}
                            <span>
                                <HiOutlineArrowRight />
                            </span>
                        </Link>
                    </div>
                    <div className="banner">
                        <img src="about.png" alt="about" />
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;