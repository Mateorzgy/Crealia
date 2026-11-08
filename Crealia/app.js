const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const arrow = '<svg aria-hidden="true"><use href="#plus"/></svg>';
const money = value => new Intl.NumberFormat('es-UY', {style:'currency', currency:'UYU', maximumFractionDigits:0}).format(value);
const whatsapp = text => `https://wa.me/59892050059?text=${encodeURIComponent(text)}`;
const demos = {
  perfumes:{name:'esencia.',label:'perfumes y cosmética',image:'perfume',title:'Tu aroma.<br>Tu esencia.',description:'Fragancias que se quedan en la memoria. Encontrá la que habla de vos.',action:'Explorar colección',nav:'La colección',productsTitle:'Elegí tu favorito',aside:'Un catálogo que invita a elegir.',detail:'Fotos protagonistas, productos organizados y una consulta a un toque. Tu colección, disponible a cualquier hora.',features:['Catálogo por categorías','Selección de productos','Consultas por WhatsApp'],filters:['Todo','Perfumes','Cosmética'],products:[['Bosque, eau de parfum','Notas de cedro · 50 ml',1890,'Perfumes'],['Bruma, eau de toilette','Fresco y cítrico · 100 ml',1490,'Perfumes'],['Sérum botánico','Cuidado diario · 30 ml',790,'Cosmética']]},
  gym:{name:'Distrito.',label:'gimnasios y entrenadores',image:'gym',title:'Tu fuerza.<br>Tu espacio.',description:'Entrenamiento funcional, fuerza y movimiento. Encontrá una forma de entrenar que vaya con vos.',action:'Ver clases',nav:'Entrenamientos',productsTitle:'Encontrá tu ritmo',aside:'Tu próxima clase empieza acá.',detail:'Mostrá tu espacio, contá cómo entrenás y facilitá que alguien dé el primer paso. Una web que se mueve con tu gimnasio.',features:['Clases y horarios claros','Planes de entrenamiento','Solicitudes de clase por WhatsApp'],filters:['Todo','Grupales','Personal'],products:[['Funcional','Lun, mié y vie · 18:00',1800,'Grupales'],['Fuerza','Mar y jue · 19:00',1600,'Grupales'],['Entrenamiento personal','Sesión individual · a coordinar',900,'Personal']],unit:' / mes',verb:'Elegir'},
  cafe:{name:'Miga & café',label:'restaurantes, cafeterías y panaderías',image:'cafe',title:'Una pausa.<br>Bien hecha.',description:'Café recién molido y algo rico del horno. Elegí tu próxima pausa desde nuestra carta.',action:'Ver el menú',nav:'La carta',productsTitle:'¿Qué te tentó hoy?',aside:'El menú, siempre a mano.',detail:'Desde un QR en la mesa o el enlace de Instagram. Una carta fácil de leer, con categorías y consultas directas.',features:['Carta digital por categorías','Precios y detalles de cada plato','Pedidos a coordinar por WhatsApp'],filters:['Todo','Cafetería','Del horno'],products:[['Flat white','Espresso doble y leche texturizada',180,'Cafetería'],['Croissant de manteca','Horneado del día',140,'Del horno'],['Tostada de campo','Palta, tomate y semillas',290,'Del horno']]},
  fashion:{name:'Forma',label:'tiendas de ropa',image:'fashion',title:'Vestite<br>como vos.',description:'Prendas para todos tus días. Texturas, cortes y colores que encuentran su lugar en tu guardarropa.',action:'Ver prendas',nav:'La colección',productsTitle:'Tu próxima combinación',aside:'Tu colección, en primer plano.',detail:'Una tienda pensada para que tus prendas se vean bien y tus clientes encuentren lo que buscan, también desde el celular.',features:['Colecciones y categorías','Guía de talles por producto','Carrito y consulta de disponibilidad'],filters:['Todo','Prendas','Accesorios'],products:[['Camisa de lino','Natural · talles S a XL',1690,'Prendas'],['Remera esencial','Blanca · talles S a XL',890,'Prendas'],['Bolso cotidiano','Algodón grueso · negro',690,'Accesorios']]},
  barber:{name:'Corte club',label:'peluquerías y barberías',image:'barber',title:'Buen corte.<br>Buen día.',description:'Un momento para vos. Conocé nuestros servicios y consultá por tu próximo turno.',action:'Ver servicios',nav:'Servicios',productsTitle:'Elegí tu próximo corte',aside:'Menos vueltas para un turno.',detail:'Tus servicios, tu estilo y una forma simple de consultar disponibilidad. El primer contacto, resuelto desde tu web.',features:['Servicios y duración','Presentación de tu espacio','Solicitud de turno por WhatsApp'],filters:['Todo','Cabello','Barba'],products:[['Corte clásico','Corte, lavado y terminación · 40 min',550,'Cabello'],['Corte + barba','Un servicio completo · 60 min',790,'Cabello'],['Perfilado de barba','Detalle y terminación · 25 min',350,'Barba']],verb:'Elegir'},
  candles:{name:'calma.',label:'velas y artesanías',image:'candles',title:'Encendé<br>tu pausa.',description:'Velas y objetos hechos con tiempo. Pequeños rituales para hacer de tu casa un lugar más tuyo.',action:'Ver objetos',nav:'Hecho a mano',productsTitle:'Pequeños rituales',aside:'Lo hecho a mano merece verse.',detail:'Contá la historia de tus piezas con fotos y detalles. Organizá tus colecciones sin perder la cercanía de tu emprendimiento.',features:['Colecciones de autor','Materiales y detalles de cada pieza','Pedidos personalizados por WhatsApp'],filters:['Todo','Velas','Objetos'],products:[['Vela bosque','Cera de soja · cedro · 200 g',650,'Velas'],['Vela de lino','Cera de soja · aroma suave · 200 g',650,'Velas'],['Cuenco artesanal','Cerámica esmaltada · 12 cm',890,'Objetos']]},
  professional:{name:'Estudio Norte',label:'profesionales independientes',image:'craft',title:'Tu espacio.<br>Tu manera.',description:'Diseño de interiores para espacios que se viven. Te acompañamos a encontrar el tuyo.',action:'Ver servicios',nav:'El estudio',productsTitle:'¿Por dónde empezamos?',aside:'Tu experiencia, bien presentada.',detail:'Una web propia para explicar lo que hacés y facilitar nuevas consultas. Para profesionales, consultorios y estudios independientes.',features:['Presentación de servicios','Portfolio y enfoque de trabajo','Consultas personalizadas'],filters:['Todo','Asesorías','Proyectos'],products:[['Asesoría inicial','Videollamada · 60 min',1500,'Asesorías'],['Diseño de un ambiente','Propuesta a medida',null,'Proyectos'],['Proyecto integral','Acompañamiento completo',null,'Proyectos']],verb:'Consultar'}
};
let current = 'perfumes';
let selectedFilter = 'Todo';
const bag = new Map();
let toastTimer;

function toast(message){$('#toast').textContent=message;$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000);}
function renderProducts(){
  const demo=demos[current];
  $('#product-list').replaceChildren();
  demo.products.forEach((product,index)=>{
    if(selectedFilter!=='Todo' && product[3]!==selectedFilter)return;
    const article=document.createElement('article');article.className='product';
    const title=document.createElement('p');title.textContent=product[0];
    const description=document.createElement('span');description.textContent=product[1];
    const price=document.createElement('span');price.className='product-price';price.textContent=product[2]===null?'A consultar':money(product[2])+(current==='gym'&&index<2?' / mes':'');
    const add=document.createElement('button');add.type='button';add.innerHTML=`${demo.verb||'Agregar'} ${arrow}`;add.setAttribute('aria-label',`${demo.verb||'Agregar'} ${product[0]} a la selección de demostración`);
    add.addEventListener('click',()=>{const key=`${current}-${index}`;const item=bag.get(key);bag.set(key,{key,category:current,index,quantity:item?item.quantity+1:1});updateBagCount();toast(`${product[0]}: agregado a la demo`);});
    article.append(title,description,price,add);$('#product-list').append(article);
  });
  $('#empty-products').hidden=$('#product-list').children.length>0;
}
function renderFilters(){
  $('#demo-filters').replaceChildren();
  demos[current].filters.forEach(filter=>{const b=document.createElement('button');b.type='button';b.textContent=filter;b.setAttribute('aria-pressed',String(filter===selectedFilter));b.addEventListener('click',()=>{selectedFilter=filter;$$('#demo-filters button').forEach(button=>button.setAttribute('aria-pressed',String(button.textContent===filter)));renderProducts();});$('#demo-filters').append(b);});
}
function selectDemo(category){
  if(!demos[category])return;
  current=category;selectedFilter='Todo';const d=demos[current];
  $$('.category').forEach(b=>{const active=b.dataset.category===current;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active));});
  $('#demo-site').className=`demo-site theme-${current}`;
  requestAnimationFrame(()=>$('#demo-site').classList.add('switching'));
  $('#demo-brand').textContent=d.name;$('#demo-title').innerHTML=d.title;$('#demo-description').textContent=d.description;
  $('#demo-image').src=`assets/${d.image}.jpg`;$('#demo-image').alt=`Fotografía ilustrativa para ${d.label}`;
  $('#demo-action').innerHTML=`${d.action} <svg aria-hidden="true"><use href="#arrow"/></svg>`;
  $('#demo-nav-label').textContent=d.nav;$('#products-title').textContent=d.productsTitle;
  $('#demo-address').textContent=`${d.name} · demostración`;
  $('#aside-heading').textContent=d.aside;$('#aside-description').textContent=d.detail;
  $('#feature-list').replaceChildren(...d.features.map(text=>{const li=document.createElement('li');li.textContent=text;return li;}));
  $('#demo-inquiry').href=whatsapp(`Hola Crealia, vi la demostración para ${d.label} y me interesa una web así para mi negocio.`);
  renderFilters();renderProducts();
}
function updateBagCount(){const n=[...bag.values()].reduce((s,item)=>s+item.quantity,0);$('#bag-count').textContent=n;$('#bag-open').setAttribute('aria-label',`Ver selección de demostración, ${n} elementos`);}
function renderBag(){
  $('#bag-items').replaceChildren();
  if(!bag.size){const empty=document.createElement('p');empty.textContent='Todavía no elegiste nada. Explorá los ejemplos y agregá un producto o servicio.';$('#bag-items').append(empty);}
  let total=0;let hasUnpriced=false;let hasMonthly=false;
  for(const item of bag.values()){
    const d=demos[item.category],p=d.products[item.index];
    if(p[2]===null)hasUnpriced=true;else total+=p[2]*item.quantity;
    if(item.category==='gym'&&item.index<2)hasMonthly=true;
    const row=document.createElement('div');row.className='bag-row';
    const info=document.createElement('div'),name=document.createElement('strong'),detail=document.createElement('span');name.textContent=p[0];detail.textContent=`${d.name} · Cantidad: ${item.quantity} · ${p[2]===null?'A consultar':money(p[2])}${item.category==='gym'&&item.index<2?' / mes':''}`;info.append(name,detail);
    const remove=document.createElement('button');remove.innerHTML='<svg aria-hidden="true"><use href="#close"/></svg>';remove.setAttribute('aria-label',`Quitar ${p[0]}`);remove.addEventListener('click',()=>{bag.delete(item.key);updateBagCount();renderBag();});row.append(info,remove);$('#bag-items').append(row);
  }
  $('#bag-total').textContent=bag.size?(hasMonthly?'Los planes mensuales y servicios individuales se muestran por separado.':`Total ilustrativo: ${money(total)}${hasUnpriced?' + servicios a consultar':''}`):'';
  $('#bag-clear').hidden=!bag.size;
  $('#bag-inquiry').href=whatsapp('Hola Crealia, probé los catálogos de demostración y me interesa una web con selección de productos o servicios para mi negocio.');
}
$$('.category').forEach(b=>b.addEventListener('click',()=>selectDemo(b.dataset.category)));
$$('[data-preview]').forEach(a=>a.addEventListener('click',()=>selectDemo(a.dataset.preview)));
const menu=$('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));$('#navigation').classList.toggle('open',open);});
$$('#navigation a').forEach(a=>a.addEventListener('click',()=>{menu.setAttribute('aria-expanded','false');$('#navigation').classList.remove('open');}));
document.addEventListener('keydown',event=>{if(event.key==='Escape'){$('#navigation').classList.remove('open');menu.setAttribute('aria-expanded','false');}});
const dialog=$('#bag-dialog');$('#bag-open').addEventListener('click',()=>{renderBag();dialog.showModal();});$('#bag-close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
$('#bag-clear').addEventListener('click',()=>{bag.clear();updateBagCount();renderBag();});
$('#contact-form').addEventListener('submit',event=>{event.preventDefault();const name=$('#business').value.trim(),service=$('#service').value,idea=$('#idea').value.trim();const text=`Hola Crealia, ${name?`mi negocio se llama ${name}. `:''}Me interesa: ${service.toLowerCase()}.${idea?`\n\n${idea}`:''}`;window.open(whatsapp(text),'_blank','noopener,noreferrer');});
$('#year').textContent=new Date().getFullYear();
selectDemo(current);
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('reveal');observer.unobserve(entry.target);}}),{threshold:.08});
  $$('.section-intro h2,.section-intro p,.category,.demo-window,.portfolio-strip>a,.services-heading>*,.service-list details,.process-track article,.faq h2,.faq-list details,.contact-layout>div,.contact form,.footer-top,.footer-word').forEach((el,i)=>{el.style.setProperty('--delay',`${(i%3)*70}ms`);observer.observe(el);});
}

