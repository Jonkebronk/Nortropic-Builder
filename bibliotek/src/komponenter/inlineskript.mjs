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

// Knapplistens startläge (Kontaktlist.astro). Skriptet står direkt efter listen och körs medan sidan läses in: syns förstavyns
// eller sidtoppens egna knappar ligger listen gömd från första målningen, i stället för att glida bort när modulen körs
// (kontroll 13f; andra varvet, Apple HIG H1). Utan JavaScript syns listen alltid.
export const kontaktlistStart = "(function(){var l=document.currentScript.previousElementSibling;if(matchMedia('(max-height: 30rem)').matches)return;var e=document.querySelector('.forstavy__knappar, .sidtopp__knappar');if(!e)return;var r=e.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){l.dataset.dold='true';l.inert=true;}})();";

export const alla = [samtyckeStandard, idag, rorelseJamforelse, kontaktlistStart];
