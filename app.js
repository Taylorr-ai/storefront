// 123kids storefront preview: cart interactions only; no payment or email data is transmitted.
const toast = document.querySelector('#toast');
let toastTimer;
function announce(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
const bookNames = {
  'first-book': 'My First Big Coloring Book',
  'explorers-book': 'Little Explorers Coloring Adventures'
};
const cart = [];
document.querySelectorAll('[data-product]').forEach((button) => {
  button.addEventListener('click', () => {
    const id = button.dataset.product;
    if (id === 'both-books') {
      cart.push(bookNames['first-book'], bookNames['explorers-book']);
      announce('Both coloring books added — $20 before any eligible offer.');
    } else {
      cart.push(bookNames[id]);
      announce(`${bookNames[id]} added — $10. Checkout setup is still needed.`);
    }
  });
});
document.querySelector('#newsletterForm').addEventListener('submit', (event) => {
  event.preventDefault();
  document.querySelector('#newsletterMessage').textContent = 'Thanks for your interest! Signup is not connected yet, so your email was not sent or stored. Email verification and coupon delivery must be set up before this offer can be redeemed.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
