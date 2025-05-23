import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { config } from "@/data/axiosData";
import { 
  updateQuantity, 
  deleteOrder, 
  completeOrders
} from "@/redux/reducers/orderSlice"; 

const CheckoutFunction = ({ sidebar }) => {
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.order);
  const { currentUser } = useSelector((state) => state.user);
  
  const [subTotal, setSubTotal] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const newSubTotal = orders
        .map(item => item.itemPrice * item.quantity)
        .reduce((prev, next) => prev + next, 0)
        .toFixed(2);
      
      setSubTotal(newSubTotal);
      setTotalPrice(newSubTotal);
    }
  }, [orders]);

  const handleUpdateQuantity = (itemId, type, value) => {
    const item = orders.find(item => item.itemId === itemId);
    if (!item) return;

    let newQuantity = item.quantity;
    
    if (type === "-") {
      newQuantity = Math.max(1, item.quantity - 1);
    } else if (type === "+") {
      newQuantity = item.quantity + 1;
    } else if (type === "value") {
      newQuantity = Math.max(1, value);
    }

    dispatch(updateQuantity({ itemId, quantity: newQuantity }));
  };

  const handleRemoveItem = (itemId) => {
    dispatch(deleteOrder(itemId));
  };

  const placeOrder = async () => {
    if (!orders || orders.length === 0) {
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
        items: orders.map(item => ({
          foodItemId: item.itemId,
          quantity: item.quantity
        })),
        restaurantId: orders[0].restaurantId 
      };

      const response = await axios.post(
        `http://localhost:3000/customer/placeOrder`,
        orderData,
        config
      );

      // Clear cart and mark as completed on success
      dispatch(completeOrders());
      setOrderSuccess(true);
     
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
    } finally {
      setIsLoading(false);
    }
  };

  if (!orders || orders.length === 0) {
    return <div className="checkout-order">Your cart is empty</div>;
  }

  return (
    <div className="checkout-order">
      <div className="title-checkout">
        <h2>Your order:</h2>
        {!sidebar && <h6>{orders.length}</h6>}
      </div>
      
      <div className="banner-wilmington">
        <img alt="logo" src="https://quickeat-react.vercel.app/assets/img/logo-s.jpg" />
        <h6>Restaurant ID: {orders[0].restaurantId}</h6>
      </div>

      <ul>
        {orders.map((item, i) => (
          <li className="price-list" key={`${item.itemId}-${i}`}>
            <i
              className="closeButton fa-solid fa-xmark"
              onClick={() => handleRemoveItem(item.itemId)}
            />
            <div className="counter-container">
              <div className="counter-food">
                <img alt="food" src="https://quickeat-react.vercel.app/assets/img/order-2.png" />
                <h4>{item.itemName}</h4>
              </div>
              <h3>₹{item.itemPrice}</h3>
            </div>
            <div className="price">
              <div>
                <h2>₹{(item.itemPrice * item.quantity).toFixed(2)}</h2>
                <span>Sum</span>
              </div>
              <div>
                <div className="qty-input">
                  <button
                    className="qty-count qty-count--minus"
                    data-action="minus"
                    type="button"
                    onClick={() => handleUpdateQuantity(item.itemId, "-")}
                  >
                    -
                  </button>
                  <input
                    className="product-qty"
                    type="number"
                    value={item.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(item.itemId, "value", Number(e.target.value))
                    }
                    name="quantity"
                    min="1"
                  />
                  <button
                    className="qty-count qty-count--add"
                    data-action="add"
                    type="button"
                    onClick={() => handleUpdateQuantity(item.itemId, "+")}
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
        <h5>₹ {Number(totalPrice).toFixed(2)}</h5>
      </div>
      <div className="totel-price">
        <span>To pay:</span>
        <h2>₹ {Number(totalPrice).toFixed(2)}</h2>
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