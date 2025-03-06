document.addEventListener("DOMContentLoaded", () => {
  const productDetailContainer = document.getElementById('product-detail');

  // Retrieve the product ID from the URL query string
  const params = new URLSearchParams(window.location.search);
  const productId = params.get('id');

  if (!productId) {
    productDetailContainer.innerHTML = '<p>Invalid product ID.</p>';
    return;
  }

  // Fetch the product details from the API
  fetch(`/api/products/${productId}`)
    .then(response => response.json())
    .then(product => {
      renderProductDetails(product);
    })
    .catch(err => {
      console.error('Error fetching product details:', err);
      productDetailContainer.innerHTML = '<p>Error fetching product details.</p>';
    });

  // Render product details into the page
  function renderProductDetails(product) {
    productDetailContainer.innerHTML = `
      <div class="product-detail-card">
        <img src="${product.image}" alt="${product.name}" />
        <div class="product-info">
          <h2>${product.name}</h2>
          <p>${product.details}</p>
          <p><strong>Unit Quantity:</strong> ${product.unitQuantity}</p>
        </div>
      </div>
    `;
  }
});
