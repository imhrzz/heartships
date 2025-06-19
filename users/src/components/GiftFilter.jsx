function GiftFilter({ selectedCategory, setSelectedCategory }) {
    const giftCategories = ["All", "Handmade", "Personalized", "Jewelry", "Accessories", "Stationery"];
  
    return (
      <div className="flex justify-center mb-6">
        <select 
          className="p-2 border rounded-md shadow-md" 
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {giftCategories.map((category, index) => (
            <option key={index} value={category}>{category}</option>
          ))}
        </select>
      </div>
    );
  }
  
  export default GiftFilter;
  