// The storefront now links directly to Gumroad product pages.
// This file is intentionally retained for compatibility with the current repository structure.
document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', (event) => event.preventDefault());
});
