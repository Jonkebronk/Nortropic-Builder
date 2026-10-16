// Skript som måste köras direkt i HTML:en, innan sidan ritas eller innan något annat skript körs. De ligger här som text, så att
// sajtens astro.config kan räkna ut deras hashar till innehållspolicyn (CSP) och sidorna skriver ut exakt samma text
// (W3C CSP Level 3, hash-source). Astro räknar inte själv hashar för skript med is:inline.

// Consent Mode v2: allt nekat tills besökaren svarar, före alla Googles taggar (Google, Set up consent mode). Inget sparas i webbläsaren.
export const samtyckeStandard = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});";

// Dagens mottagning i förstavyn (Forstavy.astro). Skriptet står direkt efter raden och körs innan sidan ritas, så raden flyttar inget
// efteråt. Veckodagen och klockslaget räknas i mottagningens tidszon. Schemat ligger i data-schema som [veckodag, dag, plats, tid].
// När dagens sista mottagning har stängt visas nästa mottagning med data-stangt-nu, så att raden aldrig visar passerade tider
// (premiumpasset 2026-10-16, innehållsrevisionen M4).
export const idag = "(function(){var p=document.currentScript.previousElementSibling,s=JSON.parse(p.dataset.schema);var f=new Intl.DateTimeFormat('en-US',{weekday:'short',hour:'numeric',minute:'numeric',hourCycle:'h23',timeZone:'Europe/Stockholm'}).formatToParts(new Date());var g=function(t){return (f.filter(function(x){return x.type===t;})[0]||{}).value;};var nr=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(g('weekday')),nu=+g('hour')*60+ +g('minute');var slut=function(x){var m=/(\\d{1,2})[.:](\\d{2})\\D*$/.exec(x[3]);return m?+m[1]*60+ +m[2]:1440;};var d=s.filter(function(x){return x[0]===nr;}),o=d.filter(function(x){return slut(x)>nu;});if(o.length)p.textContent=p.dataset.text+', '+o[0][1]+': '+o.map(function(x){return x[2]+' '+x[3];}).join(', ');else for(var i=1;i<=7;i++){var n=s.filter(function(x){return x[0]===(nr+i)%7;})[0];if(n){p.textContent=(d.length&&p.dataset.stangtNu||p.dataset.stangt)+' '+n[1]+' i '+n[2]+' '+n[3]+'.';break;}}p.hidden=!p.textContent;})();";

// Bara för jämförelsen av de två rörelseversionerna på bibliotekets provsidor: ?rorelse=mattlig eller ?rorelse=sparsam.
export const rorelseJamforelse = "(function(){var r=new URLSearchParams(location.search).get('rorelse');if(r==='mattlig'||r==='sparsam')document.documentElement.dataset.rorelse=r;})();";

// Knapplistens och samtyckesrutans startläge (Kontaktlist.astro, Samtycke.astro). Skriptet står direkt efter listen och körs medan
// sidan läses in, med samma regler som modulerna: rutan visas redan här när inget giltigt val finns sparat, och listen ligger gömd
// när förstavyns eller sidtoppens knappar syns, eller under rutan när rutan täcker dem. Då står både listen och rutan still från
// första målningen, i stället för att glida på plats när modulerna körs (kontroll 13f; andra varvet, Apple HIG H1).
// Mätningen ritar listen synlig först, så övergången stängs av för den första ändringen (via CSSOM, som CSP inte stoppar).
// Utan JavaScript syns listen alltid, och rutan visas inte.
export const kontaktlistStart = "(function(){var l=document.currentScript.previousElementSibling,d=document.documentElement,ruta=document.querySelector('[data-samtycke-ruta]');if(ruta&&ruta.hidden){var v=null;try{v=JSON.parse(localStorage.getItem('samtycke')||'null');}catch(x){}var g=Number(ruta.dataset.giltighet||182)*864e5;if(!(v&&v.version===Number(ruta.dataset.version||1)&&Date.now()-Date.parse(v.tid)<g))ruta.hidden=false;}if(matchMedia('(max-height: 30rem)').matches)return;var e=document.querySelector('.forstavy__knappar, .sidtopp__knappar'),oppen=!!ruta&&!ruta.hidden,smal=matchMedia('(max-width: 63.99rem)').matches;var ovan=false;if(e&&oppen){var k=e.getBoundingClientRect();ovan=k.top>=0&&k.bottom<=ruta.getBoundingClientRect().top;}if(oppen&&smal&&!ovan){d.setAttribute('data-lista-under-ruta','');return;}var syns=false;if(e){var r=e.getBoundingClientRect();syns=r.bottom>0&&r.top<innerHeight;}if(oppen||syns){l.style.transition='none';l.dataset.dold='true';l.inert=true;getComputedStyle(l).transform;requestAnimationFrame(function(){l.style.transition='';});}})();";

export const alla = [samtyckeStandard, idag, rorelseJamforelse, kontaktlistStart];
