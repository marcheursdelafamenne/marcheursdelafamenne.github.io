(function(){const s="agendaFilters",n=document.getElementById("next-event"),f=document.getElementById("agenda-full"),h=document.querySelectorAll(".agenda-tag"),d=document.getElementById("agenda-reset-filter");let e=new Set,t=[];if(!n&&!f)return;const p="/data/agenda.json",r={marche:"🥾",balade:"🌲","petite-balade":"🔔",voyage:"🚌",salon:"🏕️",repas:"🍽️",reunion:"🏛️",autre:"❓"};function c(e){return r[e]||r.autre}function l(e){return e.type!=="voyage"||e.full!==!0?"":`<div class="agenda-full-badge">COMPLET</div>`}function a(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function u(e){return e.toLocaleDateString("fr-BE",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function g(e){const t=a(e.date),s=c(e.type);n.innerHTML=`
    <div class="next-event-box entry agenda-with-icon">
      <div class="agenda-icon">${s}</div>
      <div class="agenda-content">
        <div class="agenda-date">
          ${u(t)}${e.time?` à ${e.time}`:""}
        </div>
        <div class="agenda-title">
          ${e.slug?`<a href="${e.slug}">${e.title}</a>`:e.title}
          ${e.location?`<span class="agenda-location">(${e.location})</span>`:""}
        </div>
        ${e.distances?`<div class="agenda-distances">Distances : ${e.distances}</div>`:""}
        ${l(e)}
      </div>
    </div>
  `}function i(e){const t=e.map(e=>{const t=a(e.date),n=c(e.type);return`
        <li class="agenda-item agenda-with-icon">
          <div class="agenda-icon">${n}</div>
          <div class="agenda-content">
            <div class="agenda-date">
              ${u(t)}${e.time?` à ${e.time}`:""}
            </div>
            <div class="agenda-title">
              ${e.slug?`<a href="${e.slug}">${e.title}</a>`:e.title}
              ${e.location?`<span class="agenda-location">(${e.location})</span>`:""}
            </div>
            ${e.distances?`<div class="agenda-distances">Distances : ${e.distances}</div>`:""}            
          </div>
          ${l(e)}
        </li>`}).join("");f.innerHTML=`<ul class="agenda-list">${t}</ul>`}function m(){if(e.size===0){i(t);return}const n=t.filter(t=>e.has(t.type));i(n)}function v(){localStorage.setItem(s,JSON.stringify(Array.from(e)))}function b(){const t=localStorage.getItem(s);if(!t)return;try{const n=JSON.parse(t);n.forEach(t=>{e.add(t);const n=document.querySelector(`.agenda-tag[data-type="${t}"]`);n&&n.classList.add("active")})}catch{console.warn("Erreur restauration filtres agenda")}}function o(){const t=document.getElementById("agenda-reset-filter");if(!t)return;e.size>0?t.style.display="inline-block":t.style.display="none"}fetch(p).then(e=>e.json()).then(r=>{const c=new Date;c.setHours(0,0,0,0),t=r.map(e=>({...e,_d:a(e.date)})).filter(e=>e._d>=c).sort((e,t)=>e._d-t._d),b(),o(),m(),n&&(t.length>0?g(t[0]):n.innerHTML="<p>Aucune activité future pour le moment.</p>"),h.forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.type;e.has(n)?(e.delete(n),t.classList.remove("active")):(e.add(n),t.classList.add("active")),o(),m(),v()})}),d&&d.addEventListener("click",()=>{e.clear(),h.forEach(e=>e.classList.remove("active")),i(t),o(),localStorage.removeItem(s)})})})()