"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { config } from "@/data/axiosData";

const RestaurantCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const id = searchParams.get('id');
      if (!id) {
        console.error('No hotel ID provided in URL');
        router.push('/');
        return;
      }

      try {
        console.log(id)
        const res = await axios.get(
          `http://localhost:4000/api/customer/getAllRestaurants/${id}`, 
          config
        );
        setRestaurant(res.data?.restaurant || null);
        console.log(res.data?.restaurant)
      } catch (err) {
        console.error('Error fetching restaurant:', err);
        setError('Failed to load restaurant details.');
      } finally {
        setLoading(false);
      }
    };

    AOS.init({ duration: 800, easing: 'ease-in-out', once: true });
    fetchRestaurant();
  }, [searchParams, router]);

  const filteredItems = activeTab === 'all' 
    ? restaurant?.foodItems || []
    : restaurant?.foodItems.filter(item => item.tags.includes(activeTab)) || [];

  const handleCartUpdate = (item, operation = 'add') => {
    setCart(prevCart => {
      if (operation === 'remove') {
        const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
        if (existingItem?.quantity > 1) {
          return prevCart.map(cartItem =>
            cartItem.id === item.id 
              ? { ...cartItem, quantity: cartItem.quantity - 1 } 
              : cartItem
          );
        }
        return prevCart.filter(cartItem => cartItem.id !== item.id);
      }
      
      const existingItem = prevCart.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map(cartItem =>
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const uniqueTags = [...new Set(restaurant?.foodItems?.flatMap(item => item.tags) || [])];

  if (loading) return <div className="text-center my-4">Loading...</div>;
  if (error) return <div className="text-danger text-center my-4">{error}</div>;
  if (!restaurant) return <div className="text-center my-4">Restaurant not found</div>;

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section position-relative overflow-hidden">
        <div 
          className="hero-background position-absolute w-100 h-100"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80')",
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.7)'
          }}
        />
        
        <div className="container position-relative z-index-1 py-5">
          <div className="row align-items-center min-vh-75 py-5">
            <div className="col-lg-6 py-5" data-aos="fade-right">
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link href="/" className="text-white text-decoration-none">Home</Link>
                  </li>
                  <li className="breadcrumb-item">
                    <Link href="/restaurants" className="text-white text-decoration-none">Restaurants</Link>
                  </li>
                  <li className="breadcrumb-item active text-white">
                    {restaurant.name}
                  </li>
                </ol>
              </nav>
              
              <div className="d-flex align-items-center mb-4">
                <div className="rounded-circle bg-white p-2 me-3">
                  <img 
                    src="https://quickeat-react.vercel.app/assets/img/logos-2.jpg" 
                    alt="Restaurant" 
                    className="img-fluid rounded-circle"
                    style={{ width: 60, height: 60, objectFit: 'cover' }}
                  />
                </div>
                <h1 className="text-white mb-0">{restaurant.name}</h1>
              </div>
              
              <div className="bg-white bg-opacity-10 p-4 rounded-3 backdrop-blur">
                <div className="d-flex align-items-center mb-3">
                  <span className="text-white me-3">Rating:</span>
                  <div className="text-warning">
                    {[...Array(5)].map((_, i) => (
                      <i 
                        key={i} 
                        className={`fas fa-star${i < Math.floor(restaurant.rating) ? '' : '-half-alt'}`}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="mb-3">
                  <span className="text-white me-2">Cuisines:</span>
                  <div className="d-flex flex-wrap gap-2">
                    {restaurant.category?.length > 0 ? (
                      restaurant.category.map(cat => (
                        <span key={cat} className="badge bg-primary bg-opacity-25 text-white">
                          {cat}
                        </span>
                      ))
                    ) : (
                      <span className="badge bg-primary bg-opacity-25 text-white">
                        Indian
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <span className="text-white">Description:</span>
                  <p className="text-white-50 mb-0">
                    {restaurant.desc !== "No description available" 
                      ? restaurant.desc 
                      : "Experience authentic flavors in a cozy atmosphere."}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="col-lg-6" data-aos="fade-left">
              <div className="position-relative">
                <img
                  src="https://quickeat-react.vercel.app/assets/img/restaurant-1.jpg"
                  alt={restaurant.name}
                  className="img-fluid rounded-4 shadow-lg"
                />
                
                <motion.div 
                  className="position-absolute bottom-0 start-0 bg-white p-3 rounded-3 m-3 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="d-flex align-items-center">
                    <i className="far fa-clock text-primary fs-4 me-3" />
                    <div>
                      <h6 className="mb-0">9am – 12pm</h6>
                      <small className="text-muted">Hours</small>
                    </div>
                  </div>
                </motion.div>
                
                <motion.div 
                  className="position-absolute bottom-0 end-0 bg-white p-3 rounded-3 m-3 shadow-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="d-flex align-items-center">
                    <i className="fas fa-utensils text-primary fs-4 me-3" />
                    <div>
                      <h6 className="mb-0">Breakfast, Lunch, Dinner</h6>
                      <small className="text-muted">Meals</small>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row mb-5" data-aos="fade-up">
            <div className="col-12">
              <h2 className="fw-bold mb-4">Our Menu</h2>
              
              <div className="d-flex flex-wrap gap-2 mb-4">
                <button 
                  className={`btn ${activeTab === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
                  onClick={() => setActiveTab('all')}
                >
                  All Items
                </button>
                {uniqueTags.slice(0, 8).map(tag => (
                  <button
                    key={tag}
                    className={`btn ${activeTab === tag ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setActiveTab(tag)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="row g-4">
            {filteredItems.map(item => (
              <div key={item.id} className="col-md-6 col-lg-4" data-aos="fade-up">
                <motion.div 
                  className="card h-100 border-0 shadow-sm overflow-hidden"
                  whileHover={{ y: -5 }}
                >
                  <div className="position-relative" style={{ height: 200, overflow: 'hidden' }}>
                    <img 
                      src={"https://plus.unsplash.com/premium_photo-1694141251673-1758913ade48?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
                      alt={item.name}
                      className="img-fluid w-100 h-100 object-fit-cover"
                    />
                    <div className="position-absolute top-0 end-0 bg-danger text-white px-2 py-1 m-2 rounded-pill">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text text-muted">{item.description}</p>
                    
                    <div className="d-flex flex-wrap gap-2 mb-3">
                      {item.tags.slice(0, 3).map(tag => (
                        <span key={tag} className="badge bg-light text-dark border">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    <button 
                      className="btn btn-primary w-100"
                      onClick={() => handleCartUpdate(item)}
                    >
                      Add to Order
                    </button>
                  </div>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Floating Cart Button */}
      <motion.div 
        className="position-fixed bottom-0 end-0 m-4"
        whileHover={{ scale: 1.1 }}
      >
        <button 
          className="btn btn-primary btn-lg rounded-pill shadow-lg position-relative"
          onClick={() => setShowCart(true)}
        >
          <i className="fas fa-shopping-cart me-2" />
          View Cart
          {totalItems > 0 && (
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              {totalItems}
            </span>
          )}
        </button>
      </motion.div>

      {/* Cart Sidebar */}
      {showCart && (
        <div className="position-fixed top-0 end-0 h-100 w-100" style={{ zIndex: 1050 }}>
          <div 
            className="position-absolute top-0 end-0 h-100 bg-white shadow-lg"
            style={{ width: '400px', maxWidth: '100%' }}
            data-aos="fade-left"
          >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h4 className="mb-0">Your Order</h4>
              <button 
                className="btn btn-link text-dark"
                onClick={() => setShowCart(false)}
              >
                <i className="fas fa-times" />
              </button>
            </div>
            
            <div className="p-3" style={{ height: 'calc(100% - 150px)', overflowY: 'auto' }}>
              {cart.length === 0 ? (
                <div className="text-center py-5">
                  <i className="fas fa-shopping-cart fa-3x text-muted mb-3" />
                  <p className="text-muted">Your cart is empty</p>
                </div>
              ) : (
                <ul className="list-group list-group-flush">
                  {cart.map(item => (
                    <li key={item.id} className="list-group-item border-0">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <h6 className="mb-1">{item.name}</h6>
                          <small className="text-muted">${item.price.toFixed(2)} × {item.quantity}</small>
                        </div>
                        <div className="d-flex align-items-center">
                          <span className="me-3">${(item.price * item.quantity).toFixed(2)}</span>
                          <div className="btn-group btn-group-sm">
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => handleCartUpdate(item, 'remove')}
                            >
                              <i className="fas fa-minus" />
                            </button>
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => handleCartUpdate(item)}
                            >
                              <i className="fas fa-plus" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            <div className="position-absolute bottom-0 start-0 end-0 p-3 border-top bg-white">
              <div className="d-flex justify-content-between mb-3">
                <span>Total:</span>
                <span className="fw-bold">${totalPrice.toFixed(2)}</span>
              </div>
              <button 
                className="btn btn-primary w-100"
                disabled={cart.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RestaurantCard;