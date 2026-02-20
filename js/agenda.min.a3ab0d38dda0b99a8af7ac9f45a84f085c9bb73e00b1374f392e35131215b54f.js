(function(){const s="agendaFilters",n=document.getElementById("next-event"),m=document.getElementById("agenda-full"),u=document.querySelectorAll(".agenda-tag"),l=document.getElementById("agenda-reset-filter");let e=new Set,t=[];if(!n&&!m)return;const f="/data/agenda.json",r={marche:"🥾",balade:"🌲",voyage:"🚌",salon:"🏕️",repas:"🍽️",reunion:"🏛️",autre:"❓"};function c(e){return r[e]||r.autre}function a(e){const[t,n,s]=e.split("-").map(Number);return new Date(t,n-1,s)}function d(e){return e.toLocaleDateString("fr-BE",{weekday:"long",year:"numeric",month:"long",day:"numeric"})}function p(e){const t=a(e.date),s=c(e.type);n.innerHTML=`
    <div class="next-event-box entry agenda-with-icon">
      <div class="agenda-icon">${s}</div>
      <div class="agenda-content">
        <div class="agenda-date">
          ${d(t)}${e.time?` à ${e.time}`:""}
        </div>
        <div class="agenda-title">
          ${e.slug?`<a href="${e.slug}">${e.title}</a>`:e.title}
          <span class="agenda-location">(${e.location})</span>
        </div>
        ${e.distances?`<div class="agenda-distances">Distances : ${e.distances}</div>`:""}
      </div>
    </div>
  `}function i(e){const t=e.map(e=>{const t=a(e.date),n=c(e.type);return`
        <li class="agenda-item agenda-with-icon">
          <div class="agenda-icon">${n}</div>
          <div class="agenda-content">
            <div class="agenda-date">
              ${d(t)}${e.time?` à ${e.time}`:""}
            </div>
            <div class="agenda-title">
              ${e.slug?`<a href="${e.slug}">${e.title}</a>`:e.title}
              <span class="agenda-location">(${e.location})</span>
            </div>
            ${e.distances?`<div class="agenda-distances">Distances : ${e.distances}</div>`:""}            
          </div>
        </li>`}).join("");m.innerHTML=`<ul class="agenda-list">${t}</ul>`}function h(){if(e.size===0){i(t);return}const n=t.filter(t=>e.has(t.type));i(n)}function g(){localStorage.setItem(s,JSON.stringify(Array.from(e)))}function v(){const t=localStorage.getItem(s);if(!t)return;try{const n=JSON.parse(t);n.forEach(t=>{e.add(t);const n=document.querySelector(`.agenda-tag[data-type="${t}"]`);n&&n.classList.add("active")})}catch{console.warn("Erreur restauration filtres agenda")}}function o(){const t=document.getElementById("agenda-reset-filter");if(!t)return;e.size>0?t.style.display="inline-block":t.style.display="none"}fetch(f).then(e=>e.json()).then(r=>{const c=new Date;c.setHours(0,0,0,0),t=r.map(e=>({...e,_d:a(e.date)})).filter(e=>e._d>=c).sort((e,t)=>e._d-t._d),v(),o(),h(),n&&(t.length>0?p(t[0]):n.innerHTML="<p>Aucune activité future pour le moment.</p>"),u.forEach(t=>{t.addEventListener("click",()=>{const n=t.dataset.type;e.has(n)?(e.delete(n),t.classList.remove("active")):(e.add(n),t.classList.add("active")),o(),h(),g()})}),l&&l.addEventListener("click",()=>{e.clear(),u.forEach(e=>e.classList.remove("active")),i(t),o(),localStorage.removeItem(s)})})})()