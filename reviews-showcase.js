(function(){
const section=document.querySelector('#resenas');if(!section)return;
const track=section.querySelector('#reviews-track'),stage=section.querySelector('#review-stage'),message=section.querySelector('#reviews-message'),navigation=section.querySelector('#review-navigation'),position=section.querySelector('#review-position'),toggle=section.querySelector('#reviews-toggle');
const reduced=matchMedia('(prefers-reduced-motion:reduce)');
let items=[],index=0,paused=reduced.matches,visible=false,timer=null;
function isTest(review){return /prueba|test/i.test(review.author+' '+(review.business||''));}
function starRow(rating){const row=document.createElement('div');row.className='deck-stars';row.setAttribute('aria-label',rating+' de 5 estrellas');for(let n=0;n<5;n++){const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('viewBox','0 0 24 24');svg.setAttribute('aria-hidden','true');if(n<rating)svg.classList.add('filled');svg.innerHTML='<path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/>';row.append(svg);}return row;}
function measure(){const active=track.children[index];if(active)stage.style.setProperty('--deck-height',Math.max(350,active.offsetHeight+80)+'px');}
function show(next,manual=false){index=(next+items.length)%items.length;const count=items.length;
[...track.children].forEach((card,i)=>{let slot='away';if(i===index)slot='active';else if(i===(index+1)%count)slot='next';else if(i===(index-1+count)%count)slot='previous';card.dataset.slot=slot;card.setAttribute('aria-hidden',String(i!==index));card.inert=i!==index;});
position.textContent=(index+1)+' / '+count;measure();if(manual)resetTimer();}
function resetTimer(){clearInterval(timer);if(items.length<2)return;timer=setInterval(()=>{if(paused||reduced.matches||!visible||document.hidden||section.matches(':hover')||section.contains(document.activeElement)||track.querySelector('[data-slot=active]')?.classList.contains('is-expanded'))return;show(index+1);},6500);}
function updatePause(){toggle.hidden=reduced.matches;toggle.textContent=paused?'Reproducir':'Pausar';toggle.setAttribute('aria-label',paused?'Reproducir avance automático de reseñas':'Pausar avance automático de reseñas');}
function render(reviews){
items=reviews;index=0;track.replaceChildren();section.dataset.count=String(reviews.length);message.hidden=!!reviews.length;navigation.hidden=reviews.length<2;
if(!reviews.length){message.textContent='Las primeras experiencias se compartirán acá.';section.querySelector('#reviews-intro').textContent='Cada proyecto tiene una historia. Este espacio está reservado para las opiniones de nuestros clientes.';section.querySelector('#reviews-footnote').textContent='Las reseñas se reciben por invitación y se publican con autorización.';stage.style.removeProperty('--deck-height');return;}
const onlyTests=reviews.every(isTest);
section.querySelector('#reviews-intro').textContent=onlyTests?'Vista previa del espacio de reseñas. El comentario mostrado es una prueba.':'Cada proyecto es distinto. Así cuentan su experiencia quienes trabajaron con Crealia.';
section.querySelector('#reviews-footnote').textContent=onlyTests?'La reseña de prueba no representa la experiencia de un cliente.':'Opiniones recibidas por invitación y publicadas con autorización.';
for(const review of reviews){
const card=document.createElement('article');card.className='testimonial-card';
card.append(starRow(review.rating));
if(isTest(review)){const note=document.createElement('span');note.className='testimonial-test';note.textContent='Reseña de prueba';card.append(note);}
const quote=document.createElement('blockquote');quote.className='testimonial-quote';
if(review.text.trim()){quote.textContent=review.text;}else{quote.textContent='Compartió su puntuación sin agregar un comentario.';quote.classList.add('rating-only');}
card.append(quote);
if(review.text.length>260){const expand=document.createElement('button');expand.type='button';expand.className='testimonial-expand';expand.textContent='Leer opinión completa';expand.setAttribute('aria-expanded','false');expand.onclick=()=>{const open=card.classList.toggle('is-expanded');expand.textContent=open?'Mostrar menos':'Leer opinión completa';expand.setAttribute('aria-expanded',String(open));measure();};card.append(expand);}
const footer=document.createElement('footer'),avatar=document.createElement('span'),identity=document.createElement('div'),author=document.createElement('strong');avatar.className='testimonial-avatar';avatar.setAttribute('aria-hidden','true');avatar.textContent=review.author.trim().split(/\s+/).slice(0,2).map(x=>x[0]).join('').toUpperCase();author.textContent=review.author;identity.append(author);if(review.business){const business=document.createElement('span');business.textContent=review.business;identity.append(business);}footer.append(avatar,identity);card.append(footer);track.append(card);
}
show(0);updatePause();resetTimer();
}
async function load(){clearInterval(timer);message.hidden=false;message.textContent='Cargando opiniones…';try{let incoming=window.CREALIA_REVIEWS||[];if(window.CrealiaReviews?.configured)incoming=await CrealiaReviews.rpc('list_published_reviews');render((Array.isArray(incoming)?incoming:[]).filter(r=>typeof r.author==='string'&&typeof r.text==='string'&&Number.isInteger(r.rating)&&r.rating>=1&&r.rating<=5));}catch{section.dataset.count='0';navigation.hidden=true;message.replaceChildren(document.createTextNode('No pudimos cargar las opiniones. '));const retry=document.createElement('button');retry.type='button';retry.textContent='Volver a intentar';retry.onclick=load;message.append(retry);}}
section.querySelector('#review-prev').onclick=()=>show(index-1,true);section.querySelector('#review-next').onclick=()=>show(index+1,true);toggle.onclick=()=>{paused=!paused;updatePause();resetTimer();};
new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;section.classList.toggle('reviews-in-view',visible);},{threshold:.12}).observe(section);
reduced.addEventListener('change',()=>{paused=reduced.matches;updatePause();resetTimer();});addEventListener('resize',measure);
if('ResizeObserver' in window)new ResizeObserver(measure).observe(track);
load();
})();

