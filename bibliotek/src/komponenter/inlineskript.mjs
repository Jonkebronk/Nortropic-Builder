// Skript som måste köras direkt i HTML:en, innan sidan ritas eller innan något annat skript körs. De ligger här som text, så att
// sajtens astro.config kan räkna ut deras hashar till innehållspolicyn (CSP) och sidorna skriver ut exakt samma text
// (W3C CSP Level 3, hash-source). Astro räknar inte själv hashar för skript med is:inline.

// Consent Mode v2: allt nekat tills besökaren svarar, före alla Googles taggar (Google, Set up consent mode). Inget sparas i webbläsaren.
export const samtyckeStandard = "window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});";

// Dagens mottagning i förstavyn (Forstavy.astro). Skriptet står direkt efter raden och körs innan sidan ritas, så raden flyttar inget
// efteråt. Veckodagen räknas i mottagningens tidszon. Schemat ligger i data-schema som [veckodag, dag, plats, tid].
export const idag = "(function(){var p=document.currentScript.previousElementSibling,s=JSON.parse(p.dataset.schema);var nr=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(new Intl.DateTimeFormat('en-US',{weekday:'short',timeZone:'Europe/Stockholm'}).format(new Date()));var d=s.filter(function(x){return x[0]===nr;});if(d.length)p.textContent=p.dataset.text+', '+d[0][1]+': '+d.map(function(x){return x[2]+' '+x[3];}).join(', ');else for(var i=1;i<7;i++){var n=s.filter(function(x){return x[0]===(nr+i)%7;})[0];if(n){p.textContent=p.dataset.stangt+' '+n[1]+' i '+n[2]+' '+n[3]+'.';break;}}p.hidden=!p.textContent;})();";

// Bara för jämförelsen av de två rörelseversionerna på bibliotekets provsidor: ?rorelse=mattlig eller ?rorelse=sparsam.
export const rorelseJamforelse = "(function(){var r=new URLSearchParams(location.search).get('rorelse');if(r==='mattlig'||r==='sparsam')document.documentElement.dataset.rorelse=r;})();";

export const alla = [samtyckeStandard, idag, rorelseJamforelse];
