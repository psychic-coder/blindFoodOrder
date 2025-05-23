// MenuSection.jsx
import { motion } from "framer-motion";
import ItemCard from "./ItemCard";


const MenuSection = ({
  activeTab,
  setActiveTab,
  uniqueTags,
  filteredItems,
}) => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="row mb-5" data-aos="fade-up">
          <div className="col-12">
            <h2 className="fw-bold mb-4">Our Menu</h2>

            <div className="d-flex flex-wrap gap-2 mb-4">
              <button
                className={`btn ${
                  activeTab === "all" ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setActiveTab("all")}
              >
                All Items
              </button>
              {uniqueTags.slice(0, 8).map((tag) => (
                <button
                  key={tag}
                  className={`btn ${
                    activeTab === tag ? "btn-primary" : "btn-outline-primary"
                  }`}
                  onClick={() => setActiveTab(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        </div>


        
        <div className="row g-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
      </div>
    </section>
  );
};


export default MenuSection;