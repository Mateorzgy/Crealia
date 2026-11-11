window.renderCustomerReviewForm=function(container,info,onSubmit){
container.innerHTML=`<form class="review-form" novalidate>
<p class="review-project"></p>
<div class="review-error-summary" role="alert" tabindex="-1" hidden></div>
<label class="quiz-field" for="review-author">Nombre que querés mostrar<input id="review-author" name="author" autocomplete="name" maxlength="80" required aria-describedby="author-error"></label><p class="field-error" id="author-error" hidden></p>
<label class="quiz-field" for="review-business">Negocio (opcional)<input id="review-business" name="business" autocomplete="organization" maxlength="100" aria-describedby="business-error"></label><p class="field-error" id="business-error" hidden></p>
<fieldset class="star-field"><legend>¿Cómo fue tu experiencia?</legend><div class="rating-options star-options" aria-describedby="rating-caption rating-error"></div><p class="rating-caption" id="rating-caption" aria-live="polite">Tocá una estrella para elegir tu puntuación.</p><p class="field-error" id="rating-error" hidden></p></fieldset>
<label class="quiz-field" for="review-body">Tu opinión (opcional)<textarea id="review-body" name="body" rows="4" maxlength="1200" aria-describedby="body-hint body-error" placeholder="Podés contar tu experiencia en pocas palabras."></textarea></label>
<div class="review-body-meta"><span id="body-hint">Sin mínimo de caracteres. También podés dejar solo estrellas.</span><span id="body-count">0 / 1200</span></div><p class="field-error" id="body-error" hidden></p>
<div class="review-suggestions"><h3>Agregá una frase con un toque</h3><p>Tocá “Agregar” en las opciones que reflejen tu experiencia. Se suman a tu opinión y podés editarlas antes de enviar.</p><div class="suggestion-options"></div><p class="suggestion-status" aria-live="polite"></p></div>
<label class="review-consent"><input type="checkbox" name="consent" required aria-describedby="consent-error"><span>Autorizo a Crealia a publicar mi puntuación, mi opinión si la escribo, mi nombre y negocio en su web. Puedo pedir que se retiren escribiendo por WhatsApp.</span></label><p class="field-error" id="consent-error" hidden></p>
<p class="review-feedback" role="status"></p><button class="demo-button" type="submit">Enviar mi opinión</button><p class="quiz-privacy">Podés cambiar tus respuestas antes de enviar. Tu reseña quedará pendiente de revisión.</p></form>`;
const form=container.querySelector('form'),ratings=form.querySelector('.rating-options'),feedback=form.querySelector('.review-feedback'),summary=form.querySelector('.review-error-summary'),caption=form.querySelector('.rating-caption'),body=form.elements.body;
form.querySelector('.review-project').textContent='Proyecto: '+info.project;
const descriptions=['Muy mala','Mala','Regular','Buena','Excelente'];
let selected=0,attempted=false,sending=false;
function paint(value){ratings.querySelectorAll('label').forEach((label,i)=>label.classList.toggle('is-filled',i<value));}
for(let i=1;i<=5;i++){
 const label=document.createElement('label'),input=document.createElement('input');
 input.type='radio';input.name='rating';input.value=i;input.required=true;input.setAttribute('aria-label',i+(i===1?' estrella':' estrellas')+' · '+descriptions[i-1]);input.setAttribute('aria-describedby','rating-caption rating-error');
 label.append(input);label.insertAdjacentHTML('beforeend','<svg aria-hidden="true" viewBox="0 0 24 24"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9Z"/></svg>');
 input.addEventListener('change',()=>{selected=i;paint(i);caption.textContent=i+' de 5 · '+descriptions[i-1];label.classList.remove('star-selected');void label.offsetWidth;label.classList.add('star-selected');if(attempted)validate(false);});
 label.addEventListener('pointerenter',e=>{if(e.pointerType==='mouse')paint(i);});label.addEventListener('pointerleave',()=>paint(selected));ratings.append(label);
}
function setError(name,message){const error=form.querySelector('#'+name+'-error');error.textContent=message;error.hidden=!message;const nodes=name==='rating'?form.querySelectorAll('[name=rating]'):[form.elements[name]];for(const node of nodes){if(message)node.setAttribute('aria-invalid','true');else node.removeAttribute('aria-invalid');}}
function validate(focus){
 const data=new FormData(form),errors=[];
 const error=(name,text)=>{setError(name,text);if(text)errors.push({name,text});};
 const author=String(data.get('author')||'').trim(),business=String(data.get('business')||'');
 error('author',author.length<2?'Escribí el nombre que querés mostrar (al menos 2 caracteres).':author.length>80?'El nombre puede tener hasta 80 caracteres.':'');
 error('business',business.length>100?'El negocio puede tener hasta 100 caracteres.':'');
 error('rating',!data.get('rating')?'Elegí una puntuación del 1 al 5 tocando las estrellas.':'');
 error('body',body.value.length>1200?'Acortá tu opinión a 1200 caracteres o menos.':'');
 error('consent',!form.elements.consent.checked?'Marcá la autorización para que podamos publicar tu reseña.':'');
 summary.hidden=!errors.length;summary.replaceChildren();
 if(errors.length){const title=document.createElement('strong');title.textContent='Revisá '+errors.length+(errors.length===1?' dato antes de enviar:':' datos antes de enviar:');summary.append(title);for(const item of errors){const link=document.createElement('button');link.type='button';link.textContent=item.text;link.onclick=()=>{const target=item.name==='rating'?ratings.querySelector('input'):form.elements[item.name];target.focus();};summary.append(link);}if(focus){const first=errors[0].name==='rating'?ratings.querySelector('input'):form.elements[errors[0].name];first.focus();}}
 return !errors.length;
}
function updateCount(){form.querySelector('#body-count').textContent=body.value.length+' / 1200';}
form.addEventListener('input',()=>{updateCount();if(attempted)validate(false);});
form.elements.consent.addEventListener('change',()=>{if(attempted)validate(false);});
const suggestions=[
 ['Buena comunicación','La comunicación durante el proyecto fue clara.'],
 ['Diseño cuidado','El diseño refleja la identidad de mi negocio.'],
 ['Fácil de usar','La página me resulta fácil de usar.'],
 ['Cumplió lo acordado','El resultado cumplió con lo que habíamos acordado.'],

];
for(const [title,text] of suggestions){const button=document.createElement('button');button.type='button';const caption=document.createElement('span');caption.textContent=title;const action=document.createElement('span');action.className='suggestion-action';action.textContent='Agregar';button.append(caption,action);button.dataset.phrase=text;button.setAttribute('aria-label','Agregar frase: '+title);button.onclick=()=>{if(sending)return;const status=form.querySelector('.suggestion-status');status.classList.add('is-notice');if(body.value.includes(text)){status.textContent='Esa frase ya está en tu opinión. Podés editarla en el campo de texto.';return;}const next=body.value.trim()+(body.value.trim()?' ':'')+text;if(next.length>1200){status.textContent='No queda espacio para esa frase. Podés acortar el texto y volver a agregarla.';return;}body.value=next;body.dispatchEvent(new Event('input',{bubbles:true}));status.textContent='Agregamos “'+title+'” a tu opinión. Podés seguir agregando frases o editar el texto. Todavía no se envió nada.';button.classList.remove('phrase-added');void button.offsetWidth;button.classList.add('phrase-added');};form.querySelector('.suggestion-options').append(button);}
function syncSuggestions(){form.querySelectorAll('[data-phrase]').forEach(button=>{const added=body.value.includes(button.dataset.phrase);button.classList.toggle('is-added',added);button.querySelector('.suggestion-action').textContent=added?'Agregada':'Agregar';});}
body.addEventListener('input',syncSuggestions);
form.addEventListener('submit',async e=>{
 e.preventDefault();if(sending)return;attempted=true;feedback.textContent='';feedback.classList.remove('error');if(!validate(true))return;
 const data=new FormData(form),payload={author:String(data.get('author')).trim(),business:String(data.get('business')||'').trim(),rating:Number(data.get('rating')),body:body.value.trim(),consent:form.elements.consent.checked};
 const button=form.querySelector('[type=submit]');sending=true;const controls=[...form.querySelectorAll('input,textarea,button')];controls.forEach(el=>el.disabled=true);form.setAttribute('aria-busy','true');button.textContent='Enviando…';
 try{await onSubmit(payload);form.replaceChildren();form.removeAttribute('aria-busy');const title=document.createElement('h3');title.textContent='Gracias por compartir tu experiencia.';const text=document.createElement('p');text.className='review-feedback';text.textContent='Tu reseña quedó pendiente de revisión. No necesitás hacer nada más.';text.tabIndex=-1;form.append(title,text);text.focus();}
 catch(error){sending=false;controls.forEach(el=>el.disabled=false);form.removeAttribute('aria-busy');button.textContent='Reintentar envío';feedback.classList.add('error');const raw=String(error?.message||'');feedback.textContent=/invitación|invitacion/i.test(raw)?'Esta invitación ya no está disponible. Si habías enviado la reseña, no hace falta repetirla. Si no, pedinos un nuevo enlace por WhatsApp.':/nombre, comentario|customer_reviews_body_check/i.test(raw)?'La actualización del formulario todavía no terminó. Tus respuestas siguen acá; intentá nuevamente más tarde.':'No pudimos enviar tu reseña. Tus respuestas están guardadas en esta pantalla. Revisá tu conexión y tocá “Reintentar envío”.';feedback.tabIndex=-1;feedback.focus();}
});
};
