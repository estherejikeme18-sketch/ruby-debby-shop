var PRODUCTS=[
{id:1,name:"Adire Wrap Dress",cat:"Dresses",price:45000,img:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=700&q=80",desc:"Hand-dyed adire cotton, wrap cut, below knee. XS-3XL."},
{id:2,name:"Ankara Midi Dress",cat:"Dresses",price:32000,img:"https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=700&q=80",desc:"Bold ankara, fitted bodice, full skirt, pockets."},
{id:3,name:"Leather Tote",cat:"Bags",price:58000,img:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=700&q=80",desc:"Full-grain leather, fits 14-inch laptop."},
{id:4,name:"Block Heel Sandals",cat:"Shoes",price:28000,img:"https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=700&q=80",desc:"6cm block heel, cushioned. Sizes 36-43."},
{id:5,name:"Silk Head Wrap",cat:"Accessories",price:9500,img:"https://images.unsplash.com/photo-1583743814966-8936f5b7fdf1?w=700&q=80",desc:"Long, soft, hand-rolled hem."},
{id:6,name:"Gold Earrings",cat:"Accessories",price:14000,img:"https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=700&q=80",desc:"Lightweight gold-plated statement pair."},
{id:7,name:"Linen Blazer",cat:"Outerwear",price:65000,img:"https://images.unsplash.com/photo-1591369822096-ffd140ec948f?w=700&q=80",desc:"Breathable linen blazer, half-lined."},
{id:8,name:"Cashmere Scarf",cat:"Accessories",price:18000,img:"https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=700&q=80",desc:"Warm 200cm wrap for evenings."},
{id:9,name:"Aso-Ebi Lace Gown",cat:"Dresses",price:75000,img:"https://images.unsplash.com/photo-1566174053879-31528523f8ae?w=700&q=80",desc:"Premium corded lace, tailored. For owambe."},
{id:10,name:"Mini Crossbody",cat:"Bags",price:24000,img:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=700&q=80",desc:"Compact bag, adjustable strap."},
{id:11,name:"Nude Court Heels",cat:"Shoes",price:35000,img:"https://images.unsplash.com/photo-1596703263926-eb0762ee17e4?w=700&q=80",desc:"Classic pointed shoe, 8cm heel. 36-43."},
{id:12,name:"Ankara Bomber",cat:"Outerwear",price:42000,img:"https://images.unsplash.com/photo-1551028719-00167b16eac5?w=700&q=80",desc:"Vibrant ankara bomber, satin lining."}
];
var activeCat="";
var cart={};
try{cart=JSON.parse(localStorage.getItem("ruby_cart")||"{}");}catch(e){cart={};}
function fmt(n){return "N"+n.toLocaleString("en-NG");}
function setCat(c,el){activeCat=c;var ch=document.querySelectorAll(".chip");for(var i=0;i<ch.length;i++)ch[i].classList.remove("active");el.classList.add("active");render();}
function findP(id){for(var i=0;i<PRODUCTS.length;i++)if(PRODUCTS[i].id===id)return PRODUCTS[i];return null;}
function render(){
var q=document.getElementById("search").value.toLowerCase();
var list=[];for(var i=0;i<PRODUCTS.length;i++){var p=PRODUCTS[i];
if(activeCat&&p.cat!==activeCat)continue;
if((p.name+" "+p.desc).toLowerCase().indexOf(q)<0)continue;list.push(p);}
document.getElementById("listTitle").textContent=activeCat||"Everything in store";
document.getElementById("listCount").textContent=list.length+" items";
var html="";
for(var j=0;j<list.length;j++){var x=list[j];
html+='<div class="card"><img src="'+x.img+'" loading="lazy" alt="'+x.name+'">'
+'<div class="card-body"><span class="card-cat">'+x.cat+'</span><h3>'+x.name+'</h3>'
+'<p class="desc">'+x.desc+'</p>'
+'<button class="view-link" onclick="quickView('+x.id+')">Quick view</button>'
+'<div class="price-row"><span class="price">'+fmt(x.price)+'</span><button class="add-btn" onclick="addToCart('+x.id+')">Add to cart</button></div>'
+'</div></div>';}
if(!list.length)html='<div class="empty" style="grid-column:1/-1">No items found. Try dress or bag.</div>';
document.getElementById("grid").innerHTML=html;updateCart();}
function save(){localStorage.setItem("ruby_cart",JSON.stringify(cart));}
function addToCart(id){cart[id]=(cart[id]||0)+1;save();updateCart();toast("Added to cart");}
function changeQty(id,d){cart[id]=(cart[id]||0)+d;if(cart[id]<=0)delete cart[id];save();updateCart();}
function cartTotal(){var s=0;for(var id in cart){var p=findP(parseInt(id));if(p)s+=p.price*cart[id];}return s;}
function updateCart(){var n=0;for(var k in cart)n+=cart[k];
document.getElementById("cartCount").textContent=n;document.getElementById("cartN").textContent=n;
document.getElementById("cartTotal").textContent=fmt(cartTotal());
var box=document.getElementById("cartItems");var html="";
for(var id in cart){var p=findP(parseInt(id));if(!p)continue;var q=cart[id];
html+='<div class="cart-item"><img src="'+p.img+'"><div style="flex:1"><b style="font-size:.9rem">'+p.name+'</b><br><span style="font-size:.85rem;color:#666">'+fmt(p.price)+' each</span><div class="qty" style="margin-top:.3rem"><button onclick="changeQty('+p.id+',-1)">-</button><b>'+q+'</b><button onclick="changeQty('+p.id+',1)">+</button></div></div><b>'+fmt(p.price*q)+'</b></div>';}
if(!html)html='<div class="empty">Your cart is empty.<br>Tap Add to cart to start shopping.</div>';
box.innerHTML=html;}
function toggleCart(open){document.getElementById("drawer").classList.toggle("open",open);document.getElementById("overlay").classList.toggle("show",open);}
function quickView(id){var p=findP(id);
document.getElementById("modalBody").innerHTML='<img src="'+p.img+'"><p class="card-cat" style="margin-top:.8rem">'+p.cat+'</p><h2>'+p.name+'</h2><p style="color:#555">'+p.desc+'</p><p class="price" style="font-size:1.4rem;margin:.6rem 0">'+fmt(p.price)+'</p><div style="display:flex;gap:.6rem"><button class="btn" onclick="addToCart('+p.id+');closeModal();toggleCart(true)">Add to cart</button><button class="btn btn-outline" onclick="closeModal()">Close</button></div>';
document.getElementById("modal").classList.add("show");}
function closeModal(){document.getElementById("modal").classList.remove("show");}
function toast(m){var t=document.getElementById("toast");t.textContent=m;t.classList.add("show");setTimeout(function(){t.classList.remove("show");},1800);}
function orderText(){var lines=[];for(var id in cart){var p=findP(parseInt(id));lines.push("- "+p.name+" x"+cart[id]+" = "+fmt(p.price*cart[id]));}return lines.join("\n");}
function checkoutWA(){var n=document.getElementById("cName").value.trim(),ph=document.getElementById("cPhone").value.trim(),ad=document.getElementById("cAddr").value.trim();
if(!Object.keys(cart).length){toast("Your cart is empty");return;}
if(!n||!ph||!ad){toast("Fill name, phone and address");return;}
var msg="Hello Ruby Debby! I want to order:\n\n"+orderText()+"\n\nTotal: "+fmt(cartTotal())+"\n\nName: "+n+"\nPhone: "+ph+"\nAddress: "+ad;
window.open("https://wa.me/2348030000000?text="+encodeURIComponent(msg),"_blank");}
function checkoutDone(){if(!Object.keys(cart).length){toast("Your cart is empty");return;}
document.getElementById("successBox").style.display="block";cart={};save();updateCart();}
document.getElementById("modal").addEventListener("click",function(e){if(e.target.id==="modal")closeModal();});
render();
