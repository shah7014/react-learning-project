import React from "react";
import styles from "./ProductPage.module.css";
import manStandingImage from "../images/img-1.jpg";
import Navbar from "../components/Navbar.tsx";

const ProductPage: React.FC = () => {
    return <main className={styles.productPage}>

        <Navbar />

        <section>
            <div>
                <img src={manStandingImage} alt={'man-standing-with-dog'}/>
            </div>

            <div>
                <h2>About WorldWide.</h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo est
                    dicta illum vero culpa cum quaerat architecto sapiente eius non
                    soluta, molestiae nihil laborum, placeat debitis, laboriosam at fuga
                    perspiciatis?
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis
                    doloribus libero sunt expedita ratione iusto, magni, id sapiente
                    sequi officiis et.
                </p>
            </div>
        </section>

    </main>
}
export default ProductPage;
