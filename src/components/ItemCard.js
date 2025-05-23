import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const CheckoutFunction = ({ sidebar }) => {
  const { orders } = useSelector((state) => state.order);
  const { currentUser } = useSelector((state) => state.user);
  
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Calculate totals whenever orders change
  useEffect(() => {
    if (orders && orders.items) {
      const newSubTotal = orders.items
        .map(item => item.price * item.quantity)
        .reduce((prev, next) => prev + next, 0)
        .toFixed(2);
      
      setSubTotal(newSubTotal);
      setTotalPrice(newSubTotal);
    }
  }, [orders]);

  const updateQuantity = (itemId, type, value) => {
    // In a real app, you would dispatch an action to update quantity in Redux store
    console.log(`Would update item ${itemId} with type ${type} and value ${value}`);
    // This is just a placeholder - you would need to implement the actual update logic
    // based on how your Redux actions are set up
  };

  const placeOrder = async () => {
    if (!orders || !orders.items || orders.items.length === 0) {
      setError("No items in cart");
      return;
    }

    if (!currentUser) {
      setError("User not logged in");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const orderData = {
        items: orders.items.map(item => ({
          foodItemId: item.id, // Assuming 'id' is the foodItemId
          quantity: item.quantity
        })),
        restaurantId: orders.restaurantId // Assuming restaurantId is in the orders state
      };

      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/customer/placeOrder`,
        orderData,
        {
          headers: {
            Authorization: `Bearer ${currentUser.token}`, // Assuming token is available
            "Content-Type": "application/json"
          }
        }
      );

      setOrderSuccess(true);
      // You might want to dispatch an action to clear the cart here
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  if (!orders || !orders.items) {
    return <div className="checkout-order">Your cart is empty</div>;
  }

  return (
    <div className="checkout-order">
      <div className="title-checkout">
        <h2>Your order:</h2>
        {!sidebar && <h6>{orders.items.length}</h6>}
      </div>
      
      {orders.restaurant && (
        <div className="banner-wilmington">
          <img alt="logo" src={orders.restaurant.image || "assets/img/logo-s.jpg"} />
          <h6>{orders.restaurant.name || "Restaurant"}</h6>
        </div>
      )}

      <ul>
        {orders.items.map((item, i) => (
          <li className="price-list" key={item.id}>
            <i
              className="closeButton fa-solid fa-xmark"
              onClick={() => console.log("Would remove item", item.id)}
            />
            <div className="counter-container">
              <div className="counter-food">
                <img alt="food" src={item.image} />
                <h4>{item.title}</h4>
              </div>
              <h3>${item.price}</h3>
            </div>
            <div className="price">
              <div>
                <h2>${(item.price * item.quantity).toFixed(2)}</h2>
                <span>Sum</span>
              </div>
              <div>
                <div className="qty-input">
                  <button
                    className="qty-count qty-count--minus"
                    data-action="minus"
                    type="button"
                    onClick={() => updateQuantity(item.id, "-")}
                  >
                    -
                  </button>
                  <input
                    className="product-qty"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      updateQuantity(item.id, "value", Number(e.target.value))
                    }
                    name="quantity"
                  />
                  <button
                    className="qty-count qty-count--add"
                    data-action="add"
                    type="button"
                    onClick={() => updateQuantity(item.id, "+")}
                  >
                    +
                  </button>
                </div>
                <span>Quantity</span>
              </div>
            </div>
          </li>
        ))}
      </ul>
      
      <div className="totel-price">
        <span>Total order:</span>
        <h5>$ {Number(totalPrice).toFixed(2)}</h5>
      </div>
      <div className="totel-price">
        <span>To pay:</span>
        <h2>$ {Number(totalPrice).toFixed(2)}</h2>
      </div>

      <button 
        className="place-order-btn" 
        onClick={placeOrder}
        disabled={isLoading || orderSuccess}
      >
        {isLoading ? "Processing..." : orderSuccess ? "Order Placed!" : "Place Order"}
      </button>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default CheckoutFunction;