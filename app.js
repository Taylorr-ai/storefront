// Placeholder collection: edit this list to make the store your own.
const PRODUCTS = [
  {id:'linen-throw',name:'Everyday Linen Throw',description:'Washed linen · oat',category:'Home',price:68,tag:'Bestseller',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80'},
  {id:'stoneware-mug',name:'Morning Stoneware Mug',description:'Hand-finished · chalk',category:'Home',price:32,tag:'Made to keep',image:'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=900&q=80'},
  {id:'weekender-tote',name:'Market Day Tote',description:'Organic cotton · olive',category:'Wear',price:42,tag:'',image:'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=900&q=80'},
  {id:'wood-tray',name:'Slow Morning Tray',description:'Solid oak · natural',category:'Objects',price:54,tag:'Small batch',image:'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80'},
  {id:'daily-journal',name:'The Daily Journal',description:'Recycled paper · warm grey',category:'Objects',price:24,tag:'',image:'https://images.unsplash.com/photo-1531346878377-a5be20888e57?auto=format&fit=crop&w=900&q=80'},
  {id:'glass-vase',name:'Quiet Form Vase',description:'Mouth-blown glass · clear',category:'Home',price:48,tag:'New',image:'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?auto=format&fit=crop&w=900&q=80'},
  {id:'everyday-cap',name:'Everyday Cotton Cap',description:'Organic cotton · stone',category:'Wear',price:36,tag:'',image:'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=900&q=80'},
  {id:'incense-set',name:'Evening Incense Set',description:'Hinoki & cedar · set of 12',category:'Objects',price:28,tag:'A quiet ritual',image:'https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?auto=format&fit=crop&w=900&q=80'}
];

// Paste the hosted button ID from your PayPal button's embed code here.
// A PayPal hosted button has its own fixed item and price. For a live multi-product
// cart with dynamic totals, use PayPal Checkout via the JS SDK and a server-side
// Cloudflare Worker/Function instead of a fixed hosted button.
const PAYPAL_HOSTED_BUTTON_ID = 'YOUR_PAYPAL_HOSTED_BUTTON_ID';
const PAYPAL_ENVIRONMENT = 'www.paypal.com'; // use www.sandbox.paypal.com for testing

const $ = (selector, root=document) => root.querySelector(selector);
const grid = $('#productGrid');
const cartDrawer = $('#cartDrawer');
const overlay = $('#overlay');
let category = 'All';
let searchTerm = '';
let cart = loadCart();
function loadCart(){try{return JSON.parse(localStorage.getItem('form-field-cart')||'{}')}catch{return {}}}
function saveCart(){localStorage.setItem('form-field-cart',JSON.stringify(cart));renderCart()}
function money(value){return new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(value)}
function visibleProducts(){let list=PRODUCTS.filter(p=>(category==='All'||p.category===category)&&`${p.name} ${p.description} ${p.category}`.toLowerCase().includes(searchTerm.toLowerCase()));const sort=$('#sortSelect').value;if(sort==='low')list.sort((a,b)=>a.price-b.price);if(sort==='high')list.sort((a,b)=>b.price-a.price);return list}
function renderProducts(){const products=visibleProducts();grid.innerHTML=products.length?products.map(p=>`<article class="product-card"><div class="product-image-wrap"><img class="product-image" src="${p.image}" alt="${p.name}" loading="lazy"><span class="product-tag" ${p.tag?'':'hidden'}>${p.tag}</span><button class="add-button" data-add="${p.id}" aria-label="Add ${p.name} to bag">+</button></div><div class="product-meta"><div><div class="product-name">${p.name}</div><div class="product-description">${p.description}</div></div><span class="product-price">${money(p.price)}</span></div></article>`).join(''):'<div class="no-results">No pieces found. Try another search.</div>';}
function renderCart(){const entries=Object.entries(cart).filter(([,qty])=>qty>0);const count=entries.reduce((sum,[,qty])=>sum+qty,0);const subtotal=entries.reduce((sum,[id,qty])=>sum+(PRODUCTS.find(p=>p.id===id)?.price||0)*qty,0);$('#bagCount').textContent=count;$('#drawerCount').textContent=`(${count})`;$('#cartSubtotal').textContent=money(subtotal);$('#checkoutTotal').textContent=money(subtotal);$('#cartEmpty').hidden=count>0;$('#cartFooter').hidden=count===0;$('#cartItems').innerHTML=entries.map(([id,qty])=>{const p=PRODUCTS.find(item=>item.id===id);if(!p)return '';return `<div class="cart-row"><img src="${p.image}" alt="" loading="lazy"><div class="cart-row-info"><strong>${p.name}</strong><small>${p.description}</small><div class="quantity-control"><button data-qty="${id}" data-change="-1" aria-label="Decrease ${p.name} quantity">−</button><span>${qty}</span><button data-qty="${id}" data-change="1" aria-label="Increase ${p.name} quantity">+</button></div></div><div class="cart-row-price">${money(p.price*qty)}<button class="remove-item" data-remove="${id}">Remove</button></div></div>`}).join('');}
function openCart(){cartDrawer.classList.add('open');cartDrawer.setAttribute('aria-hidden','false');overlay.hidden=false;requestAnimationFrame(()=>overlay.classList.add('visible'));document.body.classList.add('drawer-open');$('#closeDrawer').focus()}
function closeCart(){cartDrawer.classList.remove('open');cartDrawer.setAttribute('aria-hidden','true');overlay.classList.remove('visible');document.body.classList.remove('drawer-open');setTimeout(()=>{if(!cartDrawer.classList.contains('open'))overlay.hidden=true},250)}
grid.addEventListener('click',e=>{const button=e.target.closest('[data-add]');if(!button)return;const id=button.dataset.add;cart[id]=(cart[id]||0)+1;saveCart();button.textContent='✓';setTimeout(()=>{button.textContent='+'},850)});
$('#cartItems').addEventListener('click',e=>{const qty=e.target.closest('[data-qty]');const remove=e.target.closest('[data-remove]');if(remove){delete cart[remove.dataset.remove];saveCart();return}if(qty){const id=qty.dataset.qty;cart[id]=(cart[id]||0)+Number(qty.dataset.change);if(cart[id]<=0)delete cart[id];saveCart()}});
$('#categoryList').addEventListener('click',e=>{const button=e.target.closest('[data-category]');if(!button)return;category=button.dataset.category;document.querySelectorAll('.category-chip').forEach(chip=>chip.classList.toggle('active',chip===button));renderProducts()});
$('#sortSelect').addEventListener('change',renderProducts);
$('#bagToggle').addEventListener('click',openCart);$('#closeDrawer').addEventListener('click',closeCart);overlay.addEventListener('click',closeCart);$('#continueShopping').addEventListener('click',closeCart);
$('#menuToggle').addEventListener('click',()=>{const menu=$('#mobileMenu');const isOpen=!menu.hidden;menu.hidden=isOpen;$('#menuToggle').setAttribute('aria-expanded',String(!isOpen))});
document.querySelectorAll('[data-nav-category]').forEach(link=>link.addEventListener('click',()=>{category=link.dataset.navCategory;document.querySelectorAll('.category-chip').forEach(chip=>chip.classList.toggle('active',chip.dataset.category===category));renderProducts();$('#mobileMenu').hidden=true;$('#menuToggle').setAttribute('aria-expanded','false')}));
$('#searchToggle').addEventListener('click',()=>{$('#searchBar').hidden=false;$('#searchInput').focus()});$('#searchClose').addEventListener('click',()=>{$('#searchBar').hidden=true;$('#searchInput').value='';searchTerm='';renderProducts()});$('#searchInput').addEventListener('input',e=>{searchTerm=e.target.value;renderProducts()});
$('#checkoutButton').addEventListener('click',()=>{closeCart();$('#checkoutDialog').showModal();const mount=$('#paypalMount');mount.innerHTML='';const isConfigured=PAYPAL_HOSTED_BUTTON_ID!=='YOUR_PAYPAL_HOSTED_BUTTON_ID'&&PAYPAL_HOSTED_BUTTON_ID.trim()!=='';$('#paypalSetup').hidden=isConfigured;if(isConfigured){mount.innerHTML=`<form class="paypal-form" action="https://${PAYPAL_ENVIRONMENT}/cgi-bin/webscr" method="post" target="_blank"><input type="hidden" name="cmd" value="_s-xclick"><input type="hidden" name="hosted_button_id" value="${PAYPAL_HOSTED_BUTTON_ID}"><button class="paypal-submit" type="submit">Pay with PayPal</button></form>`}});
$('#closeCheckout').addEventListener('click',()=>$('#checkoutDialog').close());$('#backToBag').addEventListener('click',()=>{$('#checkoutDialog').close();openCart()});$('#checkoutDialog').addEventListener('click',e=>{if(e.target===$('#checkoutDialog'))$('#checkoutDialog').close()});
$('#newsletterForm').addEventListener('submit',e=>{e.preventDefault();$('#newsletterMessage').textContent='Thanks for joining us. This demo form is ready to connect to your email service.';e.target.reset()});
$('#year').textContent=new Date().getFullYear();renderProducts();renderCart();
