import React from "react";

import styles from "./PricingPage.module.css";
import Navbar from "../components/Navbar.tsx";
import citySkyScrpaerImg from "../images/img-2.jpg";

const PricingPage: React.FC = () => {
    return <main className={styles.pricingPage}>
        <Navbar/>

        <section>
            <div>
                <img src={citySkyScrpaerImg} alt={'beautiful-skyscrapers'}/>
            </div>

            <div>
                <h2>Simple pricing.
                    <br/>
                    Just $9/month.</h2>
                <p>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Vitae vel labore mollitia iusto.
                    Recusandae quos provident, laboriosam fugit voluptatem iste.
                </p>
            </div>
        </section>
    </main>
}
export default PricingPage;
