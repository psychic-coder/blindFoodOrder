import Subscribe from "@/src/components/Subscribe";
import Layout from "@/src/layouts/Layout";
import Link from "next/link";
const Contacts = () => {
  return (
    <Layout>
      <section className="hero-section about gap">
        <div className="container">
          <div className="row align-items-center">
            <div
              className="col-xl-6 col-lg-12"
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
                      Contacts
                    </Link>
                  </li>
                </ul>
                <h2>Contact us</h2>
                <p>
                  Egestas sed tempus urna et pharetra pharetra massa. Fermentum
                  posuere urna nec tincidunt praesent semper.
                </p>
              </div>
              <div className="row">
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="address">
                    <i className="fa-solid fa-location-dot" />
                    <h5>
                      1717 Harrison St, San Francisco, CA 94103, United States
                    </h5>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="address">
                    <i className="fa-solid fa-envelope" />
                    <a href="mailto:quick.info@mail.net">
                      <h6>quick.info@mail.net</h6>
                    </a>
                    <span>Lorem ipsum dolor sit.</span>
                    <a href="mailto:quick.info@mail.net">
                      <h6>quick.info@mail.net</h6>
                    </a>
                    <span>Dolore magna aliqua</span>
                  </div>
                </div>
                <div className="col-lg-4 col-md-4 col-sm-12">
                  <div className="address">
                    <i className="fa-solid fa-phone" />
                    <a href="callto:+14253261627">
                      <h6>+1 425 326 16 27</h6>
                    </a>
                    <span>Et netus et malesuada</span>
                    <a href="callto:+14253261627">
                      <h6>+1 425 326 16 27</h6>
                    </a>
                    <span>Enim tortor auctor urna</span>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-xl-6 col-lg-12"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="contact-us-img">
                <img alt="contacts-img-girl" src="https://quickeat-react.vercel.app/assets/img/contacts-1.png" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* contact map */}
      <section className="gap no-top">
        <div className="container">
          <div className="row">
            <div
              className="col-lg-12"
              data-aos="fade-up"
              data-aos-delay={300}
              data-aos-duration={400}
            >
              <div className="contact-map-data">
                <div className="join-courier content">
                  <h3>Get in touch with us</h3>
                  <p>
                    Magna sit amet purus gravida quis blandit turpis cursus.
                    Venenatis tellus in metus vulputate eu scelerisque felis.
                  </p>
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="blog-form"
                  >
                    <div className="name-form">
                      <i className="fa-regular fa-user" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div className="name-form">
                      <i className="fa-regular fa-envelope" />
                      <input
                        type="text"
                        name="email"
                        placeholder="Enter your email"
                      />
                    </div>
                    <textarea
                      placeholder="Enter your message"
                      defaultValue={""}
                    />
                    <button className="button-price">Submit Application</button>
                  </form>
                </div>
                <div className="contact-map">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2689446.104646556!2d28.705460424349365!3d48.83127549941125!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d1d9c154700e8f%3A0x1068488f64010!2sUkraine!5e0!3m2!1sen!2s!4v1661009847728!5m2!1sen!2s"
                    width={600}
                    height={450}
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* subscribe-section */}
      <Subscribe />
    </Layout>
  );
};
export default Contacts;
