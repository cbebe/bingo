import{s as p,n as h}from"./card-2aunGIH8.js";u();window.print();function u(){var c,o;const e=new URLSearchParams(window.location.search),a=((c=e.get("code"))==null?void 0:c.split(","))||[],d=((o=e.get("id"))==null?void 0:o.split(",").map(n=>parseInt(n)))||[];for(let n=0;n<d.length;n+=2){const t=document.createElement("div");t.classList.add("row"),t.appendChild(l(a,d,n)),d[n+1]?t.appendChild(l(a,d,n+1)):t.appendChild(v()),document.body.appendChild(t)}}function l(e,a,d){const c=p(e[d]),o=a[d],n=h(c);n[2][2]="X";const t=document.createElement("table");t.innerHTML=`
<tr>
  ${"BINGO".split("").map(r=>`<th><div class="content"><h1>${r}</h1></div></th>`).join(`
`)}
</tr>
${n.map(r=>`<tr>${r.map(m=>`<td><div class="content">${m}</div></td>`).join(`
`)}</tr>`).join(`
`)}`;const s=document.createElement("h2");s.innerHTML=`Card #${o}`;const i=document.createElement("div");return i.classList.add("column"),i.appendChild(s),i.appendChild(t),i}function v(){const e=document.createElement("div");return e.classList.add("column"),e}
