import { useEffect } from 'react';
import Subscribe from "@/src/components/Subscribe";
import VoiceInput from "@/src/components/VoiceInput";
import Layout from "@/src/layouts/Layout";
import { sliderProps } from "@/src/sliderProps";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import '../styles/animate.css';

const Index = () => {
  useEffect(() => {
    // Initialize animations
    const animateOnScroll = () => {
      const elements = document.querySelectorAll('[data-aos]');
      elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isVisible = (rect.top <= window.innerHeight * 0.8);
        if (isVisible) {
          el.classList.add('animate__animated', `animate__${el.dataset.aos}`);
        }
      });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
    
    return () => window.removeEventListener('scroll', animateOnScroll);
  }, []);

  return (
    <Layout>
      {/* Hero Section - Modern Gradient Background */}
      <section className="hero-section gap position-relative overflow-hidden">
        <div className="position-absolute w-100 h-100 bg-gradient-primary" style={{zIndex: -1}}></div>
        <div className="container position-relative">
          <div className="row align-items-center min-vh-75 py-5">
            <div className="col-lg-6" data-aos="fade-right">
              <div className="restaurant text-white">
                <h1 className="display-3 fw-bold mb-4">The Best Restaurants Delivered to Your Door</h1>
                <p className="lead mb-4 opacity-75">
                  Discover culinary excellence from the comfort of your home. 
                  Fresh, fast, and fabulous food at your fingertips.
                </p>
                <div className="d-flex flex-column flex-md-row gap-3">
                  <VoiceInput className="flex-grow-1"/>
                  <Link href="checkout" className="btn btn-light btn-lg px-4 rounded-pill shadow-sm fw-bold">
                    Order Now <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
                <div className="d-flex gap-3 mt-4">
                  <div className="d-flex align-items-center">
                    <i className="fas fa-check-circle text-success me-2"></i>
                    <span>100% Satisfaction</span>
                  </div>
                  <div className="d-flex align-items-center">
                    <i className="fas fa-bolt text-warning me-2"></i>
                    <span>Fast Delivery</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="position-relative">
                <img 
                  alt="food delivery" 
                  src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  className="img-fluid rounded-4 shadow-lg animate__animated animate__pulse animate__infinite"
                  style={{animationDuration: '3s'}}
                />
                <div className="position-absolute bottom-0 start-0 bg-white p-3 rounded-3 shadow-sm d-flex align-items-center animate__animated animate__fadeInUp"
                  style={{transform: 'translate(-20%, 20%)', maxWidth: '250px'}}>
                  <div className="bg-primary p-2 rounded-3 me-3">
                    <i className="fas fa-crown text-white"></i>
                  </div>
                  <div>
                    <p className="mb-0 text-muted small">Restaurant of the Month</p>
                    <h6 className="mb-0 fw-bold">The Wilmington</h6>
                    <div className="text-warning">
                      {[...Array(5)].map((_, i) => (
                        i < 4 ? <i key={i} className="fas fa-star"></i> : <i key={i} className="fas fa-star-half-alt"></i>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Cards with Hover Effects */}
      <section className="works-section gap no-top bg-light">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="display-5 fw-bold mb-3">How It Works</h2>
            <p className="lead text-muted mx-auto" style={{maxWidth: '600px'}}>
              Three simple steps to satisfy your cravings. Deliciousness delivered 
              straight to your doorstep.
            </p>
          </div>
          <div className="row g-4">
            {[
              {
                icon: 'fa-magnifying-glass',
                title: 'Select Restaurant',
                text: 'Browse our curated selection of top-rated restaurants. Filter by cuisine, rating, or delivery time.',
                color: 'primary'
              },
              {
                icon: 'fa-utensils',
                title: 'Choose Your Meal',
                text: 'Pick from hundreds of delicious options. Customize your order to your exact preferences.',
                color: 'success'
              },
              {
                icon: 'fa-motorcycle',
                title: 'Fast Delivery',
                text: 'Track your order in real-time. Hot, fresh food delivered by our professional couriers.',
                color: 'danger'
              }
            ].map((item, index) => (
              <div key={index} className="col-lg-4 col-md-6" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className={`card h-100 border-0 shadow-sm hover-effect bg-${item.color}-subtle`}>
                  <div className="card-body p-4 text-center">
                    <div className={`icon-lg bg-${item.color} text-white rounded-circle d-inline-flex align-items-center justify-content-center mb-4`}>
                      <i className={`fas ${item.icon} fa-lg`}></i>
                    </div>
                    <h4 className="mb-3">
                      <span className={`text-${item.color} me-2`}>0{index + 1}</span> 
                      {item.title}
                    </h4>
                    <p className="text-muted mb-0">{item.text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Restaurants - Modern Cards */}
      <section className="best-restaurants gap">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6" data-aos="fade-right">
              <h2 className="display-5 fw-bold mb-3">Top Restaurants in Your City</h2>
              <p className="lead text-muted">
                Hand-picked selections of the finest dining experiences, now available for delivery.
              </p>
            </div>
            <div className="col-lg-6 text-lg-end" data-aos="fade-left">
              <Link href="restaurants" className="btn btn-outline-dark btn-lg px-4 rounded-pill">
                View All <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
          
          <div className="row g-4">
            {[
              {
                name: "Kennington Lane Cafe",
                image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 4,
                tags: ["american", "steakhouse", "seafood"],
                description: "Modern American cuisine with a focus on fresh, seasonal ingredients and bold flavors."
              },
              {
                name: "The Wilmington",
                image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 5,
                tags: ["fine dining", "steakhouse", "wine bar"],
                description: "Elegant fine dining experience featuring premium cuts and an extensive wine selection."
              },
              {
                name: "Kings Arms",
                image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                rating: 4.5,
                tags: ["healthy", "vegetarian", "organic"],
                description: "Health-conscious menu with organic, locally-sourced ingredients and vegetarian options."
              }
            ].map((restaurant, index) => (
              <div key={index} className="col-lg-4 col-md-6" data-aos="flip-up" data-aos-delay={index * 100}>
                <div className="card h-100 border-0 overflow-hidden shadow-sm hover-effect">
                  <div className="position-relative">
                    <img 
                      src={restaurant.image} 
                      alt={restaurant.name} 
                      className="card-img-top object-fit-cover" 
                      style={{height: '200px'}}
                    />
                    <div className="position-absolute top-0 end-0 m-3">
                      <span className="badge bg-success bg-opacity-90 text-white">
                        <i className="fas fa-star me-1"></i> {restaurant.rating}
                      </span>
                    </div>
                  </div>
                  <div className="card-body">
                    <h5 className="card-title fw-bold">{restaurant.name}</h5>
                    <div className="mb-3">
                      {restaurant.tags.map((tag, i) => (
                        <span key={i} className="badge bg-light text-dark me-1 mb-1">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="card-text text-muted">{restaurant.description}</p>
                  </div>
                  <div className="card-footer bg-transparent border-0">
                    <Link href="/restaurant-card" className="btn btn-sm btn-outline-primary rounded-pill">
                      View Menu <i className="fas fa-chevron-right ms-1"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Categories - Interactive Section */}
      <section className="food-categories gap bg-gradient-primary text-white position-relative overflow-hidden">
        <div className="container position-relative">
          <div className="row align-items-center">
            <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Food variety" 
                  className="img-fluid rounded-4 shadow-lg"
                />
                {[
                  {icon: 'fa-burger', label: 'Burgers', className: 'position-absolute top-0 start-0 translate-middle'},
                  {icon: 'fa-drumstick-bite', label: 'Steaks', className: 'position-absolute top-50 start-100 translate-middle'},
                  {icon: 'fa-pizza-slice', label: 'Pizza', className: 'position-absolute bottom-0 start-0 translate-middle'}
                ].map((item, index) => (
                  <button 
                    key={index}
                    className={`btn btn-light rounded-pill shadow-sm px-3 py-2 animate__animated animate__pulse animate__infinite ${item.className}`}
                    style={{animationDelay: `${index * 0.5}s`, animationDuration: '2s'}}
                  >
                    <i className={`fas ${item.icon} text-primary me-2`}></i>
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="col-lg-6 offset-lg-1" data-aos="fade-left">
              <h2 className="display-5 fw-bold mb-4">Craving something specific? We've got you covered.</h2>
              <p className="lead mb-4 opacity-75">
                From comfort food to gourmet experiences, our diverse selection 
                satisfies every palate. Customize your order for the perfect meal.
              </p>
              <div className="d-flex flex-wrap gap-3 mb-4">
                {['Italian', 'Asian', 'Mexican', 'Vegetarian', 'Vegan', 'Gluten-Free'].map((cuisine, i) => (
                  <span key={i} className="badge bg-white bg-opacity-10 rounded-pill px-3 py-2">
                    {cuisine}
                  </span>
                ))}
              </div>
              <Link href="checkout" className="btn btn-light btn-lg px-4 rounded-pill shadow-sm fw-bold">
                Order Now <i className="fas fa-arrow-right ms-2"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Animated Counters */}
      <section className="stats-section gap">
        <div className="container">
          <div className="row g-4 text-center">
            <div className="col-md-3 col-6" data-aos="fade-up">
              <div className="p-4 rounded-4 bg-light shadow-sm">
                <h3 className="display-4 fw-bold text-primary mb-2">
                  <span className="counter" data-target="976">0</span>+
                </h3>
                <p className="text-muted mb-0">Satisfied Customers</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="100">
              <div className="p-4 rounded-4 bg-light shadow-sm">
                <h3 className="display-4 fw-bold text-success mb-2">
                  <span className="counter" data-target="12">0</span>
                </h3>
                <p className="text-muted mb-0">Premium Restaurants</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="200">
              <div className="p-4 rounded-4 bg-light shadow-sm">
                <h3 className="display-4 fw-bold text-danger mb-2">
                  <span className="counter" data-target="1">0</span>k+
                </h3>
                <p className="text-muted mb-0">Meals Delivered</p>
              </div>
            </div>
            <div className="col-md-3 col-6" data-aos="fade-up" data-aos-delay="300">
              <div className="p-4 rounded-4 bg-light shadow-sm">
                <h3 className="display-4 fw-bold text-warning mb-2">
                  <span className="counter" data-target="30">0</span>min
                </h3>
                <p className="text-muted mb-0">Average Delivery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials - Modern Carousel */}
      <section className="testimonials-section gap bg-light">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-5 mb-lg-0" data-aos="fade-right">
              <div className="pe-lg-5">
                <h2 className="display-5 fw-bold mb-4">What Our Customers Say</h2>
                <div className="testimonial-carousel">
                  <Swiper {...sliderProps.index1Testmoninal}>
                    {[1, 2, 3].map((item) => (
                      <SwiperSlide key={item}>
                        <div className="bg-white p-4 rounded-4 shadow-sm mb-4">
                          <div className="d-flex align-items-center mb-3">
                            {[...Array(5)].map((_, i) => (
                              <i key={i} className="fas fa-star text-warning me-1"></i>
                            ))}
                          </div>
                          <p className="lead mb-4">
                            "The food arrived hot and exactly as ordered. The delivery was faster than expected, 
                            and everything tasted amazing. Will definitely order again!"
                          </p>
                          <div className="d-flex align-items-center">
                            <img 
                              src="https://randomuser.me/api/portraits/women/44.jpg" 
                              alt="Customer" 
                              className="rounded-circle me-3" 
                              width="50" 
                              height="50"
                            />
                            <div>
                              <h6 className="mb-0 fw-bold">Sarah Johnson</h6>
                              <small className="text-muted">Regular Customer</small>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-left">
              <div className="position-relative">
                <img 
                  src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Happy customer" 
                  className="img-fluid rounded-4 shadow-lg" 
                />
                <div className="position-absolute bottom-0 start-0 bg-white p-3 rounded-3 shadow-sm m-3 d-flex align-items-center">
                  <div className="bg-primary p-2 rounded-3 me-2">
                    <i className="fas fa-thumbs-up text-white"></i>
                  </div>
                  <div>
                    <h6 className="mb-0 fw-bold">98% Satisfaction</h6>
                    <small className="text-muted">Based on 500+ reviews</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Partnership */}
      <section className="partnership-section gap bg-dark text-white">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5">Want to Join Our Network?</h2>
          <div className="row g-4">
            <div className="col-md-6" data-aos="zoom-in">
              <div className="card border-0 overflow-hidden h-100">
                <img 
                  src="https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Courier" 
                  className="card-img-top object-fit-cover" 
                  style={{height: '200px'}}
                />
                <div className="card-body">
                  <h3 className="card-title fw-bold">Become a Courier</h3>
                  <p className="card-text mb-4">
                    Earn money on your schedule with flexible delivery opportunities.
                  </p>
                  <Link href="become-partner" className="btn btn-outline-light rounded-pill">
                    Learn More <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-md-6" data-aos="zoom-in" data-aos-delay="100">
              <div className="card border-0 overflow-hidden h-100">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Restaurant" 
                  className="card-img-top object-fit-cover" 
                  style={{height: '200px'}}
                />
                <div className="card-body">
                  <h3 className="card-title fw-bold">Partner Your Restaurant</h3>
                  <p className="card-text mb-4">
                    Grow your business by reaching new customers in your area.
                  </p>
                  <Link href="become-partner" className="btn btn-outline-light rounded-pill">
                    Learn More <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Section - Latest News */}
      <section className="blog-section gap">
        <div className="container">
          <h2 className="display-5 fw-bold text-center mb-5">Latest News & Updates</h2>
          <div className="row g-4">
            <div className="col-lg-6" data-aos="fade-up">
              <div className="card border-0 overflow-hidden h-100 shadow-sm">
                <div className="position-relative">
                  <img 
                    src="https://images.unsplash.com/photo-1555244162-803834f70033?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                    alt="News" 
                    className="card-img-top object-fit-cover" 
                    style={{height: '300px'}}
                  />
                  <div className="position-absolute top-0 start-0 m-3">
                    <span className="badge bg-primary bg-opacity-90 text-white">News</span>
                  </div>
                </div>
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <small className="text-muted me-3">
                      <i className="far fa-calendar me-1"></i> Jan 15, 2023
                    </small>
                    <small className="text-muted">
                      <i className="far fa-eye me-1"></i> 245 views
                    </small>
                  </div>
                  <h3 className="card-title fw-bold mb-3">
                    We've Been Recognized for Excellence in Food Delivery
                  </h3>
                  <p className="card-text mb-4">
                    Our commitment to quality and service has earned us industry recognition 
                    as a leader in food delivery innovation.
                  </p>
                  <Link href="/single-blog" className="btn btn-sm btn-outline-primary rounded-pill">
                    Read More <i className="fas fa-arrow-right ms-2"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6" data-aos="fade-up" data-aos-delay="100">
              <div className="row g-4">
                {[
                  {
                    title: "New Feature: Voice Ordering Now Available",
                    excerpt: "Order your favorite meals hands-free with our new voice command feature.",
                    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                    date: "Jan 10, 2023",
                    views: "189"
                  },
                  {
                    title: "127+ Couriers On Our Team and Growing",
                    excerpt: "Our delivery network continues to expand to serve you better and faster.",
                    image: "https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                    date: "Jan 5, 2023",
                    views: "156"
                  },
                  {
                    title: "Optimizing Your Menu for Delivery Success",
                    excerpt: "Tips for restaurants to create delivery-friendly menus that travel well.",
                    image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
                    date: "Dec 28, 2022",
                    views: "203"
                  }
                ].map((post, index) => (
                  <div key={index} className="col-12">
                    <div className="card border-0 shadow-sm h-100">
                      <div className="row g-0">
                        <div className="col-md-4">
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            className="img-fluid h-100 object-fit-cover rounded-start"
                          />
                        </div>
                        <div className="col-md-8">
                          <div className="card-body">
                            <div className="d-flex align-items-center mb-2">
                              <small className="text-muted me-3">
                                <i className="far fa-calendar me-1"></i> {post.date}
                              </small>
                              <small className="text-muted">
                                <i className="far fa-eye me-1"></i> {post.views} views
                              </small>
                            </div>
                            <h5 className="card-title fw-bold mb-2">{post.title}</h5>
                            <p className="card-text text-muted small mb-3">{post.excerpt}</p>
                            <Link href="/single-blog" className="btn btn-sm btn-link px-0">
                              Read More <i className="fas fa-arrow-right ms-2"></i>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Subscription */}
      <Subscribe />

      {/* Add this script for counter animation */}
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', () => {
            const counters = document.querySelectorAll('.counter');
            const speed = 200;
            
            counters.forEach(counter => {
              const target = +counter.getAttribute('data-target');
              const count = +counter.innerText;
              const increment = target / speed;
              
              if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(() => {
                  counter.innerText = target;
                }, speed);
              } else {
                counter.innerText = target;
              }
            });
          });
        `
      }} />
    </Layout>
  );
};

export default Index;