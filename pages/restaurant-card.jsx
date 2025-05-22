"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import AOS from "aos";
import "aos/dist/aos.css";
import axios from "axios";
import { config } from "@/data/axiosData";
import MenuSection from "@/src/components/MenuSection";
import CartSidebar from '@/src/components/CartSidebar';

const RestaurantCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('all');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  // Memoized derived values
 // Memoized derived values
const uniqueTags = useMemo(() => {
  return [...new Set(restaurant?.foodItems?.flatMap(item => item.tags) || [])];
}, [restaurant]);

const filteredItems = useMemo(() => {
  return activeTab === 'all' 
    ? restaurant?.foodItems || []
    : restaurant?.foodItems?.filter(item => item.tags.includes(activeTab)) || [];
}, [activeTab, restaurant]);

  const { totalItems, totalPrice } = useMemo(() => {
    return cart.reduce((acc, item) => ({
      totalItems: acc.totalItems + item.quantity,
      totalPrice: acc.totalPrice + (item.price * item.quantity)
    }), { totalItems: 0, totalPrice: 0 });
  }, [cart]);

  useEffect(() => {
    const fetchRestaurant = async () => {
      const id = searchParams.get('id');
      if (!id) {
        router.push('/');
        return;
      }

      try {
        const res = await axios.get(
          `http://localhost:4000/api/customer/getAllRestaurants/${id}`, 
          config
        );
        setRestaurant(res.data?.restaurant || null);
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

  const handleCheckout = () => {
    // You can add additional logic here before checkout if needed
    router.push('/checkout');
  };

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
                    src={restaurant.image || "https://quickeat-react.vercel.app/assets/img/logos-2.jpg"} 
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
                  src={restaurant.image || "https://quickeat-react.vercel.app/assets/img/restaurant-1.jpg"}
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
      <MenuSection
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        uniqueTags={uniqueTags}
        filteredItems={filteredItems}
        handleCartUpdate={handleCartUpdate}
      />

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

      {/* Cart Sidebar Component */}
      <CartSidebar
        showCart={showCart}
        setShowCart={setShowCart}
        cart={cart}
        handleCartUpdate={handleCartUpdate}
        totalPrice={totalPrice}
        onCheckout={handleCheckout}
      />
    </>
  );
};

export default RestaurantCard;