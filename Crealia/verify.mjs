import {Browser,sleep} from 'file:///C:/Users/mateo/.codex/skills/design-taste-frontend/scripts/lib/cdp.mjs';
import {mkdirSync,writeFileSync} from 'node:fs';
mkdirSync('.impeccable/review',{recursive:true});
const browser=await Browser.launch();const results=[];
function assert(test,passed,detail=''){results.push({test,passed,detail});if(!passed)console.error('FAIL',test,detail);}
try{
 for(const width of [1440,768,390,320]){
  const page=await browser.newPage({width,height:900,reducedMotion:true});await page.goto('http://127.0.0.1:4173');
  assert(`No overflow ${width}`,await page.eval(()=>document.documentElement.scrollWidth<=innerWidth));
  assert(`Fonts loaded ${width}`,await page.eval(()=>document.fonts.check('500 20px Poppins')&&document.fonts.check('400 16px Inter')));
  for(const category of ['perfumes','gym','cafe','fashion','barber','candles','professional']){
   const status=await page.eval((category)=>{document.querySelector(`[data-category="${category}"]`).click();return {products:document.querySelectorAll('.product').length,active:document.querySelector(`[data-category="${category}"]`).getAttribute('aria-pressed'),overflow:document.documentElement.scrollWidth>innerWidth};},category);
   assert(`Category ${category} at ${width}`,status.products===3&&status.active==='true'&&!status.overflow,JSON.stringify(status));
  }
  await page.eval(()=>document.querySelector('[data-category="perfumes"]').click());
  const flow=await page.eval(()=>{document.querySelectorAll('#demo-filters button')[2].click();const filtered=document.querySelectorAll('.product').length;document.querySelector('.product button').click();document.querySelector('.product button').click();const count=document.querySelector('#bag-count').textContent;document.querySelector('#bag-open').click();const opened=document.querySelector('#bag-dialog').open;const total=document.querySelector('#bag-total').textContent;document.querySelector('#bag-clear').click();const cleared=document.querySelector('#bag-count').textContent;document.querySelector('#bag-close').click();return {filtered,count,opened,total,cleared,closed:!document.querySelector('#bag-dialog').open};});
  assert(`Filter, cart, quantity, clear and close ${width}`,flow.filtered===1&&flow.count==='2'&&flow.opened&&flow.total.includes('1.580')&&flow.cleared==='0'&&flow.closed,JSON.stringify(flow));
  const message=await page.eval(()=>{let opened='';window.open=url=>{opened=url;return null;};document.querySelector('#business').value='Café & Aroma';document.querySelector('#idea').value='Quiero un catálogo con ñ y tildes.';document.querySelector('#contact-form').requestSubmit();return opened;});
  assert(`WhatsApp number and escaping ${width}`,message.startsWith('https://wa.me/59892050059?text=')&&decodeURIComponent(message).includes('Café & Aroma')&&decodeURIComponent(message).includes('catálogo con ñ'));
  if(width<560){assert(`Mobile navigation ${width}`,await page.eval(()=>{const b=document.querySelector('.menu-toggle');b.click();const expanded=b.getAttribute('aria-expanded')==='true';document.querySelector('#navigation a').click();return expanded&&b.getAttribute('aria-expanded')==='false';}));}
  assert(`No runtime errors ${width}`,page.consoleErrors.length===0,page.consoleErrors.join('\n'));
  await page.eval(()=>{selectDemo('perfumes');document.querySelector('#business').value='';document.querySelector('#idea').value='';window.scrollTo({top:0,behavior:'instant'});});await sleep(250);
  assert(`Images loaded ${width}`,await page.eval(()=>[...document.images].filter(i=>i.getBoundingClientRect().top<900).every(i=>i.complete&&i.naturalWidth>0)));
  if(width!==320)await page.screenshot({path:`.impeccable/review/${width===1440?'desktop':width===768?'tablet':'mobile'}.png`,format:'png',fullPage:true});
  await page.close();
 }
 const p=await browser.newPage({width:390,height:844,reducedMotion:true});await p.goto('file:///C:/Users/mateo/Desktop/Crealia/index.html');assert('Opens directly from local file',await p.eval(()=>document.querySelectorAll('.product').length===3&&document.querySelector('h1').textContent.includes('Tu negocio')));await p.close();
}finally{await browser.close();}
writeFileSync('.impeccable/review/functional-tests.json',JSON.stringify(results,null,2));
console.log(`${results.filter(r=>r.passed).length}/${results.length} checks passed`);if(results.some(r=>!r.passed))process.exitCode=1;
