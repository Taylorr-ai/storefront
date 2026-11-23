// 123kids storefront: Jotform verification followed by $5 hosted PayPal checkout.
const toast = document.querySelector('#toast');
let toastTimer;

function announce(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}

const style = document.createElement('style');
style.textContent = `
.verification-modal{position:fixed;inset:0;z-index:1000;display:none;align-items:center;justify-content:center;padding:16px;background:rgba(40,52,58,.72)}
.verification-modal.open{display:flex}
.verification-dialog{position:relative;width:min(680px,100%);max-height:92vh;border-radius:18px;background:#fffaf0;box-shadow:0 20px 60px rgba(40,52,58,.35);overflow:hidden}
.verification-dialog iframe{display:block;width:100%;height:min(78vh,700px);border:0}
.verification-price{position:relative;display:none;text-align:center;padding:48px 18px 18px}.verification-price.ready{display:block}
#verified-paypal{min-height:55px;margin:12px auto 0}
.verification-close{position:absolute;top:10px;right:12px;z-index:2;width:40px;height:40px;border:0;border-radius:50%;background:#fff;color:#28343a;font-size:28px;line-height:1;cursor:pointer;box-shadow:0 2px 8px rgba(40,52,58,.25)}
.verification-close:hover{background:#ffda58}
`;
document.head.appendChild(style);

const modal = document.createElement('div');
modal.id = 'verificationModal';
modal.className = 'verification-modal';
modal.setAttribute('role', 'dialog');
modal.setAttribute('aria-modal', 'true');
modal.setAttribute('aria-label', 'Verify email for 50 percent off');
modal.innerHTML = `
  <div class="verification-dialog">
    <button class="verification-close" id="verificationClose" type="button" aria-label="Close verification form">×</button>
    <iframe title="Verify email with Jotform" src="https://form.jotform.com/263265036863057"></iframe>
  </div>
  <div class="verification-price" id="verificationPrice">
    <button class="verification-close" id="verificationCloseCheckout" type="button" aria-label="Close checkout">×</button>
    <h2>Email verified</h2>
    <p>Verified 50% checkout price: $5 per book</p>
    <div id="verified-paypal"></div>
  </div>
`;
document.body.appendChild(modal);

const url = new URL(window.location.href);
const isVerified = url.searchParams.get('email_verified') === '1' || sessionStorage.getItem('123kidsEmailVerified') === 'true';

if (url.searchParams.get('email_verified') === '1') {
  sessionStorage.setItem('123kidsEmailVerified', 'true');
  url.searchParams.delete('email_verified');
  window.history.replaceState({}, document.title, url.pathname + (url.search ? url.search : '') + url.hash);
}

function closeModal() {
  modal.classList.remove('open');
}

function openVerification() {
  modal.classList.add('open');
  document.querySelector('.verification-dialog').style.display = '';
  document.querySelector('#verificationPrice').classList.remove('ready');
}

function showVerifiedCheckout() {
  modal.classList.add('open');
  document.querySelector('.verification-dialog').style.display = 'none';
  document.querySelector('#verificationPrice').classList.add('ready');

  if (!document.querySelector('#paypal-sdk')) {
    const sdk = document.createElement('script');
    sdk.id = 'paypal-sdk';
    sdk.src = 'https://www.paypal.com/sdk/js?client-id=BAA0ADiSrM4Fr4RFZyzpMM-LoRsbXzAapcLcaBLLVcug6ZSdr4gI2xjKNE5Wq6a4dzeRG9_HHZInBoHtI0&components=hosted-buttons&disable-funding=venmo&currency=USD';
    sdk.onload = renderPayPal;
    document.head.appendChild(sdk);
  } else if (window.paypal) {
    renderPayPal();
  }
}

function renderPayPal() {
  const paypalContainer = document.querySelector('#verified-paypal');
  if (!window.paypal || paypalContainer.dataset.rendered) return;
  paypalContainer.dataset.rendered = 'true';
  window.paypal.HostedButtons({ hostedButtonId: 'LYRQKCG3HUQ6J' }).render('#verified-paypal');
}

document.querySelector('#verificationClose').addEventListener('click', closeModal);
document.querySelector('#verificationCloseCheckout').addEventListener('click', closeModal);
modal.addEventListener('click', (event) => {
  if (event.target === modal) closeModal();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

if (isVerified) showVerifiedCheckout();

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
      announce(isVerified ? 'Both coloring books selected — verified price: $10.' : 'Verify email to unlock both books for $10.');
    } else {
      cart.push(bookNames[id]);
      announce(isVerified ? `${bookNames[id]} selected — verified price: $5.` : `${bookNames[id]} selected — verify email to unlock the $5 price.`);
    }

    if (!isVerified) openVerification();
    else showVerifiedCheckout();
  });
});

const newsletterForm = document.querySelector('#newsletterForm');
newsletterForm.action = 'https://form.jotform.com/263265036863057';
newsletterForm.target = '_blank';
newsletterForm.method = 'post';
newsletterForm.addEventListener('submit', () => {
  document.querySelector('#newsletterMessage').textContent = 'Jotform verification opened. Complete email verification, then return to 123kids.';
});

document.querySelector('#year').textContent = new Date().getFullYear();
