"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Item from "@/src/components/Item";
import RestaurantCardTab from "@/src/components/RestaurantCardTab";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
import { restaurants } from "@/data/restaurants";

const RestaurantCard = () => {
  const searchParams = useSearchParams();
  const restaurantName = searchParams.get("name");

  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    if (restaurantName) {
      const formattedName = restaurantName.toLowerCase().replace(/\s+/g, "");

      const matched = restaurants.find((r) => {
        const formattedDataName = r.name.toLowerCase().replace(/\s+/g, "");
        return formattedDataName === formattedName;
      });

      setRestaurant(matched);
    }
  }, [restaurantName]);

  if (!restaurant) {
    return (
      <Layout>
        <div className="text-center p-20 text-red-600 text-xl font-semibold">
          Restaurant not found!
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <section
        className="hero-section about gap"
        style={{ backgroundImage: "url(assets/img/background-1.png)" }}
      >
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="about-text">
                <ul className="crumbs d-flex">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li>
                    <Link href="/">
                      <i className="fa-solid fa-right-long" /> Restaurants
                    </Link>
                  </li>
                  <li className="two">
                    <Link href="#">
                      <i className="fa-solid fa-right-long" /> {restaurant.name}
                    </Link>
                  </li>
                </ul>
                <div className="logo-detail">
                  <img alt="logo" src="assets/img/logos-2.jpg" />
                  <h2>{restaurant.name}</h2>
                </div>
                <div className="rate">
                  <span>Rate:</span>
                  <div className="star">
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-solid fa-star" />
                    <i className="fa-regular fa-star-half-stroke" />
                  </div>
                  <span>CUISINES:</span>
                  <div className="cafa-button">
                    <a href="#">american</a> <a href="#">steakhouse</a>{" "}
                    <a href="#">seafood</a>
                  </div>
                  <span>FEATURES:</span>
                  <p>{restaurant.description}</p>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={400}
              data-aos-duration={500}
            >
              <div className="about-img">
                <img alt="restaurant" src="assets/img/restaurant-1.jpg" />
                <div className="hours">
                  <i className="fa-regular fa-clock" />
                  <h4>
                    9am – 12pm <br />
                    <span>Hours</span>
                  </h4>
                </div>
                <div className="hours two">
                  <i className="fa-solid fa-utensils" />
                  <h4>
                    Breakfast, Lunch, Dinner <br />
                    <span>Meals</span>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <RestaurantCardTab items={restaurant.menu} />

      <section className="lunch-section gap" style={{ background: "#fcfcfc" }}>
        <div className="container">
          <h2 data-aos="fade-up" data-aos-delay={300} data-aos-duration={400}>
            See also category Lunch
          </h2>
          <div className="row">
            {restaurant.menu.map((item) => (
              <Item key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default RestaurantCard;
