document.addEventListener("DOMContentLoaded", function() {
    const products = [
      { id: 1, name: "Eco-friendly Water Bottle", category: "Home", price: 15, tags: ["eco-friendly", "new"] },
      { id: 2, name: "Organic Cotton T-shirt", category: "Apparel", price: 25, tags: ["eco-friendly"] },
      { id: 3, name: "Wireless Headphones", category: "Electronics", price: 200, tags: ["new", "sale"] },
      // More products...
    ];

    const productListElem = document.getElementById('product-list');
    const categoryFilterElem = document.getElementById('category-filter');
    const tagEcoFriendlyElem = document.getElementById('tag-eco-friendly');
    const tagNewElem = document.getElementById('tag-new');
    const tagSaleElem = document.getElementById('tag-sale');

    function renderProductList(products) {
      productListElem.innerHTML = ''; // Clear previous list
      products.forEach(product => {
        const productElem = document.createElement('div');
        productElem.innerHTML = `
          <h3>${product.name}</h3>
          <p>Category: ${product.category}</p>
          <p>Price: $${product.price}</p>
        `;
        productListElem.appendChild(productElem);
      });
    }

    function applyFilters() {
      let filteredProducts = products.slice(); // Copy products array
      const categoryFilterValue = categoryFilterElem.value;
      const tags = [];
      if (tagEcoFriendlyElem.checked) tags.push("eco-friendly");
      if (tagNewElem.checked) tags.push("new");
      if (tagSaleElem.checked) tags.push("sale");

      if (categoryFilterValue) {
        filteredProducts = filteredProducts.filter(product => product.category === categoryFilterValue);
      }
      if (tags.length > 0) {
        filteredProducts = filteredProducts.filter(product => product.tags.some(tag => tags.includes(tag)));
      }

      return filteredProducts;
    }

    function updateProductList() {
      const filteredProducts = applyFilters();
      renderProductList(filteredProducts);

      if (filteredProducts.length === 0) {
        productListElem.innerHTML = '<p>No products found.</p>';
      }
    }

    // Event listeners for filter changes
    categoryFilterElem.addEventListener('change', updateProductList);
    tagEcoFriendlyElem.addEventListener('change', updateProductList);
    tagNewElem.addEventListener('change', updateProductList);
    tagSaleElem.addEventListener('change', updateProductList);

    // Initial rendering
    renderProductList(products);
  });