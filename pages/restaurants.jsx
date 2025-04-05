import { restaurants } from "@/data/restaurants";
import Subscribe from "@/src/components/Subscribe";
import VoiceInput from "@/src/components/VoiceInput";
import Layout from "@/src/layouts/Layout";
import { useRouter } from "next/router";

import Link from "next/link";
const Restaurants = () => {
  const router = useRouter();
  const handleCardClick = (restaurantName) => {
    const formattedName = restaurantName.toLowerCase().replace(/\s+/g, "");
    router.push(`/restaurant-card?name=${encodeURIComponent(formattedName)}`);
  };
  
  return (
    <Layout>
      {/* hero-section */}
      <section className="hero-section about gap">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={200}
              data-aos-duration={300}
            >
              <div className="about-text">
                <ul className="crumbs d-flex">
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                  <li className="two">
                    <Link href="/">
                      <i className="fa-solid fa-right-long" />
                      Restaurants
                    </Link>
                  </li>
                </ul>
                <h2>Restaurants</h2>
                <p>
                  Egestas sed tempus urna et pharetra pharetra massa. Fermentum
                  posuere urna nec tincidunt praesent semper.
                </p>
                <VoiceInput />
              </div>
            </div>
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="restaurants-girl-img food-photo-section">
                <img alt="man" src="https://quickeat-react.vercel.app/assets/img/photo-11.png" />{" "}
                <a href="#" className="one">
                  <i className="fa-solid fa-burger" />
                  Burgers
                </a>{" "}
                <a href="#" className="two">
                  <i className="fa-solid fa-drumstick-bite" />
                  Chicken
                </a>{" "}
                <a href="#" className="three">
                  <i className="fa-solid fa-cheese" />
                  Steaks
                </a>{" "}
                <a href="#" className="for">
                  <i className="fa-solid fa-pizza-slice" />
                  Fish
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* banner */}
      <section
        className="banner"
        data-aos="fade-up"
        data-aos-delay={200}
        data-aos-duration={300}
      >
        <div className="container">
          <div
            className="banner-img"
            style={{ backgroundImage: "url(https://quickeat-react.vercel.app/assets/img/food-4.jpg)" }}
          >
            <div className="banner-logo">
              <h4>
                Restaurant
                <br />
                of the Month
                <span className="chevron chevron--left" />
              </h4>
              <div className="banner-wilmington">
                <img alt="logo" src="https://quickeat-react.vercel.app/assets/img/logo-s.jpg" />
                <h6>The Wilmington</h6>
              </div>
            </div>
            <div className="row">
              <div className="col-xl-6 col-lg-12">
                <div className="choose-lunches">
                  <h2>Choose 2 lunches</h2>
                  <h3>pay for one</h3>{" "}
                  <a href="#" className="button button-2 non">
                    Order Now
                    <i className="fa-solid fa-arrow-right" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* best-restaurants */}
      {/* best-restaurants */}
      <section className="best-restaurants gap">
        <div className="container">
          <div className="row">
            {restaurants.map((rest, index) => (
              <div
                key={rest.id}
                className="col-lg-6"
                data-aos="flip-up"
                data-aos-delay={200 + index * 100}
                data-aos-duration={300 + index * 100}
              >
                <div
                  onClick={() => handleCardClick(rest.name)}
                  className={`logos-card restaurant-page cursor-pointer transition-transform hover:scale-[1.01] ${index >= 2 ? 'two' : ''}`}
                >
                  <img alt="logo" src={rest.image} />
                  <div className="cafa">
                    <h4>{rest.name}</h4>
                    <div>
                      {Array.from({ length: 5 }).map((_, i) => {
                        const fullStars = Math.floor(rest.rating);
                        const halfStar = rest.rating % 1 >= 0.5;

                        if (i < fullStars) return <i key={i} className="fa-solid fa-star" />;
                        if (i === fullStars && halfStar) return <i key={i} className="fa-regular fa-star-half-stroke" />;
                        return <i key={i} className="fa-regular fa-star" />;
                      })}
                    </div>
                    <div className="cafa-button">
                      {rest.tags.map((tag, i) => (
                        <span key={i} className={i === rest.tags.length - 1 ? 'end' : ''}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p>{rest.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* subscribe-section */}
      <Subscribe />
    </Layout>
  );
};
export default Restaurants;
