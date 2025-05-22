// ItemCard.jsx
import { motion } from 'framer-motion';
import PropTypes from 'prop-types';

const ItemCard = ({ item, handleCartUpdate }) => {
  return (
    <div className="col-md-6 col-lg-4" data-aos="fade-up">
      <motion.div 
        className="card h-100 border-0 shadow-sm overflow-hidden"
        whileHover={{ y: -5 }}
      >
        <div className="position-relative" style={{ height: 200, overflow: 'hidden' }}>
          <img 
            src={item.image || "https://plus.unsplash.com/premium_photo-1694141251673-1758913ade48?q=80&w=3461&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"} 
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
            {item.tags?.slice(0, 3).map(tag => (
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
  );
};

ItemCard.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    image: PropTypes.string
  }).isRequired,
  handleCartUpdate: PropTypes.func.isRequired
};

export default ItemCard;