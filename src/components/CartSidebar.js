import { motion } from 'framer-motion';

const CartSidebar = ({
  showCart,
  setShowCart,
  cart,
  handleCartUpdate,
  totalPrice,
  onCheckout
}) => {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {showCart && (
        <div className="position-fixed top-0 end-0 h-100 w-100" style={{ zIndex: 1050 }}>
         
          <div 
            className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            onClick={() => setShowCart(false)}
          />
          
          
          <motion.div 
            className="position-absolute top-0 end-0 h-100 bg-white shadow-lg"
            style={{ width: '400px', maxWidth: '100%' }}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
              <h4 className="mb-0">Your Order</h4>
              <button 
                className="btn btn-link text-dark"
                onClick={() => setShowCart(false)}
                aria-label="Close cart"
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
                              aria-label={`Remove one ${item.name}`}
                            >
                              <i className="fas fa-minus" />
                            </button>
                            <button 
                              className="btn btn-outline-secondary"
                              onClick={() => handleCartUpdate(item)}
                              aria-label={`Add one more ${item.name}`}
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
                onClick={onCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
};

export default CartSidebar;