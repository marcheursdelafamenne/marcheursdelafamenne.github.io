(function(){const e=document.getElementById("next-event"),t=document.getElementById("agenda-full");if(!e&&!t)return;const a="/data/agenda.json",s={marche:"🥾",balade:"🌲",voyage:"🚌",salon:"🏕️",repas:"🍽️",reunion:"🏛️",autre:"❓"};function o(e){return s[e]||s.autre}function n(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function i(e){return e.toLocaleDateString("fr-BE",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function r(t){const s=n(t.date),a=o(t.type);e.innerHTML=`
    <div class="next-event-box entry agenda-with-icon">
      <div class="agenda-icon">${a}</div>
      <div class="agenda-content">
        <div class="agenda-date">
          ${i(s)}${t.time?` à ${t.time}`:""}
        </div>
        <div class="agenda-title">
          ${t.slug?`<a href="${t.slug}">${t.title}</a>`:t.title}
          <span class="agenda-location">(${t.location})</span>
        </div>
        ${t.distances?`<div class="agenda-distances">Distances : ${t.distances}</div>`:""}
      </div>
    </div>
  `}function c(e){const s=e.map(e=>{const t=n(e.date),s=o(e.type);return`
        <li class="agenda-item agenda-with-icon">
          <div class="agenda-icon">${s}</div>
          <div class="agenda-content">
            <div class="agenda-date">
              ${i(t)}${e.time?` à ${e.time}`:""}
            </div>
            <div class="agenda-title">
              ${e.slug?`<a href="${e.slug}">${e.title}</a>`:e.title}
              <span class="agenda-location">(${e.location})</span>
            </div>
            ${e.distances?`<div class="agenda-distances">Distances : ${e.distances}</div>`:""}            
          </div>
        </li>`}).join("");t.innerHTML=`<ul class="agenda-list">${s}</ul>`}fetch(a).then(e=>e.json()).then(s=>{const i=new Date;i.setHours(0,0,0,0);const o=s.map(e=>({...e,_d:n(e.date)})).filter(e=>e._d>=i).sort((e,t)=>e._d-t._d);e&&(o.length>0?r(o[0]):e.innerHTML="<p>Aucune activité future pour le moment.</p>"),t&&c(o)}).catch(()=>{e&&(e.innerHTML=`<p>Erreur de chargement.</p>`),t&&(t.innerHTML=`<p>Erreur de chargement.</p>`)})})()