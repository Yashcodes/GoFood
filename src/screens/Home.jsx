import React from "react";
import Card from "../components/Card";
import Carousel from "../components/Carousel";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const Home = () => {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div>
        <Carousel />
      </div>

      <div className="m-4">
        <div className="row">
          <div className="col-md-2">
            <Card item = "burger" />
          </div>
          <div className="col-md-2">
            <Card item = "pasta" />
          </div>
          <div className="col-md-2">
            <Card item = "biryani" />
          </div>
          <div className="col-md-2">
            <Card item = "pastry" />
          </div>
          <div className="col-md-2">
            <Card item = "cake" />
          </div>
          <div className="col-md-2">
            <Card item = "iceCream" />
          </div>
        </div>
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
