let reviewInvitationRequest=0;
async function loadClientInvitation(){
const requestId=++reviewInvitationRequest;
const message=document.querySelector('#client-message'),container=document.querySelector('#client-form');
container.replaceChildren();message.textContent='Comprobando tu invitación…';
const token=new URLSearchParams(location.hash.slice(1)).get('token')||'';
if(!/^[a-f0-9]{64}$/.test(token)){message.textContent='Necesitás una invitación privada para dejar tu opinión. Pedinos el enlace correspondiente a tu proyecto.';return;}
try{const info=await CrealiaReviews.rpc('review_invitation_state',{token});if(requestId!==reviewInvitationRequest)return;if(!info.valid){message.textContent='Esta invitación venció, ya fue utilizada o fue desactivada. Escribinos para que podamos ayudarte.';return;}message.textContent='';renderCustomerReviewForm(container,info,data=>CrealiaReviews.rpc('submit_customer_review',{token,...data}));}catch(error){if(requestId===reviewInvitationRequest)message.textContent=error.message;}
}
addEventListener('hashchange',loadClientInvitation);
loadClientInvitation();
