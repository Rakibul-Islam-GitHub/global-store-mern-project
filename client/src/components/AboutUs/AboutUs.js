import React, { useEffect, useState } from "react";
import { getCart } from "../Database/databaseManager";
import Footer from "../Footer/Footer";
import NavBar from "../Header/NavBar";

const AboutUs = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const cartData = getCart();
    setCart(JSON.parse(cartData));
  }, []);

  let totalAmount = 0;
  for (let i = 0; i < cart.length; i++) {
    totalAmount = cart[i].price + totalAmount;
    totalAmount = Math.round(totalAmount);
  }

  return (
    <div className="container">
      <NavBar totalAmount={totalAmount} cartLength={cart.length}></NavBar>
      <h1 className="text-center mt-5">About Us</h1>
      <div style={{ minHeight: "80vh" }}>
        <p className="text-justify">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste, nulla
          incidunt, quos dolorem reprehenderit odit sunt aspernatur fugit
          distinctio itaque soluta, aliquam pariatur id. Reiciendis saepe vel
          tenetur, nobis labtenetur aspernatur. Lorem ipsum dolor sit amet
          consectetur adipisicing elit. Amet eaque ut obcaecati distinctio vel
          corrupti ipsa voluptatibus quam incidunt nemo, laborum aperiam
          tempore! Co maiores doloremque eligendi ullam odio laborum odit?
          Maxime molinus, ad maiores pariatur nobis dicta magni sunt voluptates.
          Aperiam fuga corrupti quasi perferendis libero cumque consequunttiis
          quasi fugiat, laboriosam, dolore assumenda! Id esse, reprehenderit
          expedita nobis necessitatibus aliquam deleniti et illum nihil aut
          officia nemo nesciunt dolorum corporis quae fuga obcaecati asperiores
          nisi doloremque ullam? Consequuntur soluta vitae, blanditiillum iusto
          aliquam vero. Est laborum, corrupti officiis ipsam atque nostrum
          facere alias dolorem, autem praesentium ab ex minima ea illo assumenda
          asperiores? Repellat, eligendi eos facere, repudiandae praesentium
          porro inventore iure distinctio obcaecati provident corrupti esse quos
          eum veritatis nemo laudantium laborum accusamus sapiente dolorum culpa
          magni facilis nobis nulla. Molestiae possimus deserunt quas ab
          quibusdam exercitationem magni animi nam, recusandae repudiandae
          corrupti odio architecto asperiores laboriosuptas et, quia ad dolorem
          modi dicta veritatis culpa!
        </p>
      </div>

      <Footer></Footer>
    </div>
  );
};

export default AboutUs;
