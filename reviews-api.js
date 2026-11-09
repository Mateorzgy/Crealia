(function(){
const config=window.CREALIA_REVIEW_CONFIG||{};
let accessToken='';
const configured=!!config.url&&!!config.publishableKey;
async function request(path,body,auth=false){
 if(!configured)throw new Error('La recepción de reseñas todavía no está conectada. Escribinos por WhatsApp.');
 const headers={'apikey':config.publishableKey,'Content-Type':'application/json'};
 if(auth){if(!accessToken)throw new Error('Iniciá sesión nuevamente.');headers.Authorization='Bearer '+accessToken;}
 let response;try{response=await fetch(config.url.replace(/\/$/,'')+path,{method:'POST',headers,body:JSON.stringify(body),signal:AbortSignal.timeout(15000)});}catch{throw new Error('No pudimos conectar. Revisá tu conexión e intentá nuevamente.');}
 const data=await response.json().catch(()=>null);
 if(!response.ok){if(response.status===401||response.status===403)throw new Error('Acceso no autorizado o sesión vencida. Iniciá sesión nuevamente.');throw new Error(data?.message||data?.error_description||'No se pudo completar la solicitud.');}
 return data;
}
window.CrealiaReviews={
 configured,
 rpc:(name,args={},auth=false)=>request('/rest/v1/rpc/'+name,args,auth),
 async login(email,password){const session=await request('/auth/v1/token?grant_type=password',{email,password});accessToken=session.access_token;try{return await this.rpc('review_admin_overview',{},true);}catch(e){accessToken='';throw e;}},
 logout(){accessToken='';}
};
})();
