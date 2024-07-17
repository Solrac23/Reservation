import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowNarrowLeft } from "react-icons/hi";

const NotFound = () => {
    return (
        <>
            <section className="notFound">
                <div className="container">
                    <img src="/notFound.svg" alt="notFound" />
                    <h1>PARECE QUE VOCÊ ESTÁ PERDIDO</h1>
                    <p>Não conseguimos encontrar a página que você procura</p>
                    <Link to={"/"}>
                        Voltar a página inicial{" "}
                        <span>
                            <HiOutlineArrowNarrowLeft />
                        </span>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default NotFound;