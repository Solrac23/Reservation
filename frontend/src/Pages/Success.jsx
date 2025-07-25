import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineArrowNarrowRight } from "react-icons/hi";
const Success = () => {
    const [countdown, setCountdown] = useState(10);
    const navigate = useNavigate();

    useEffect(() => {
        const timeoutId = setInterval(() => {
            setCountdown((preCount) => {
                if (preCount === 1) {
                    clearInterval(timeoutId);
                    navigate("/");
                }
                return preCount - 1;
            });
        }, 1000);
        return () => clearInterval(timeoutId);
    }, [navigate]);

    return (
        <>
            <section className="notFound">
                <div className="container">
                    <img src="/sandwich.png" alt="success" />
                    <h1>Redirecionando para Home em {countdown} segundos...</h1>
                    <Link to={"/"}>
                        Voltar a página inicial <HiOutlineArrowNarrowRight />
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Success;