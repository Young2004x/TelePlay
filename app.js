const sampleMovies=[
{title:"KPop Demon Hunters",year:2025,genre:"Fantasy, Action",rating:8.0,quality:"1080p",type:"Movie",poster_url:"",featured:true},
{title:"My Bias, My Boss",year:2026,genre:"Comedy, Romance",rating:8.6,quality:"1080p",type:"Series",poster_url:"",featured:false},
{title:"Scam 2003: The Telgi Story",year:2023,genre:"Drama, Crime",rating:8.1,quality:"1080p",type:"Series",poster_url:"",featured:false},
{title:"Lucy",year:2014,genre:"Action, Sci-Fi",rating:6.5,quality:"4K",type:"Movie",poster_url:"",featured:true},
{title:"The Walking Dead",year:2010,genre:"Action, Drama",rating:8.1,quality:"1080p",type:"Series",poster_url:"",featured:true},
{title:"The Last Voyage",year:2026,genre:"Adventure, Action",rating:7.9,quality:"1080p",type:"Movie",poster_url:"",featured:false},
{title:"Neon City",year:2026,genre:"Sci-Fi, Thriller",rating:8.2,quality:"1080p",type:"Movie",poster_url:"",featured:false},
{title:"Night Runner",year:2025,genre:"Action, Crime",rating:7.7,quality:"1080p",type:"Movie",poster_url:"",featured:false},
{title:"Hidden Summer",year:2025,genre:"Romance, Drama",rating:8.3,quality:"1080p",type:"Movie",poster_url:"",featured:false},
{title:"The Silent Room",year:2024,genre:"Mystery, Thriller",rating:7.6,quality:"4K",type:"Movie",poster_url:"",featured:false}
];
const fallbackColors=[["#722f38","#1b1518"],["#27596a","#d09a45"],["#354f40","#1e241e"],["#8c8c8c","#262626"],["#5c6635","#161a18"],["#9a5c25","#193c63"],["#3b0c5c","#e51e4e"],["#151c38","#6c1824"],["#9b6b7b","#e3b86d"],["#243c45","#0d1114"]];
let movies=[...sampleMovies];

function card(m,i=0){
 const fallback=`background:linear-gradient(145deg,${fallbackColors[i%fallbackColors.length][0]},${fallbackColors[i%fallbackColors.length][1]})`;
 const art=m.poster_url?`<img src="${escapeHtml(m.poster_url)}" alt="${escapeHtml(m.title)}">`:`<div class="art" style="${fallback}">${escapeHtml(m.title)}</div>`;
 return `<article class="card" onclick="openMovie('${escapeJs(m.title)}')"><div class="poster">${art}<span class="badge ${m.type==='Series'?'blue':''}">${escapeHtml(m.type.toUpperCase())}</span><span class="badge quality">${escapeHtml(m.quality||'1080p')}</span></div><div class="info"><div class="title">${escapeHtml(m.title)}</div><div class="meta"><span class="rating">★ ${Number(m.rating||0).toFixed(1)}</span><span>▣ ${m.year||''}</span><span>${escapeHtml(m.genre||'')}</span></div></div></article>`;
}
function render(id,list){document.getElementById(id).innerHTML=list.length?list.map((m,i)=>card(m,i)).join(""):'<div class="empty">No movies found.</div>'}
async function loadMovies(){
 if(sb){const {data,error}=await sb.from("movies").select("*").eq("published",true).order("created_at",{ascending:false}); if(!error&&data?.length) movies=data;}
 render("trendingRail",movies.filter(m=>m.featured).slice(0,8));
 render("latestRail",movies.slice(0,8)); render("movieGrid",movies.filter(m=>m.type==="Movie")); render("seriesGrid",movies.filter(m=>m.type==="Series"));
 document.getElementById("movieCount").textContent=movies.filter(m=>m.type==="Movie").length;
}
function toggleSearch(){const b=document.getElementById("searchBox");b.classList.toggle("show");if(b.classList.contains("show"))document.getElementById("searchInput").focus()}
function searchMovies(q){q=q.toLowerCase().trim();const list=movies.filter(m=>(m.title+" "+m.genre).toLowerCase().includes(q));render("movieGrid",list);document.getElementById("movieCount").textContent=list.length}
function openMovie(title){const m=movies.find(x=>x.title===title);if(!m)return;alert(`${m.title}\n\n${m.year} • ${m.genre}\nRating: ${m.rating}\nQuality: ${m.quality}\n\nNext upgrade: connect cards to a full detail page.`)}
function escapeHtml(s){return String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function escapeJs(s){return String(s??"").replace(/\\/g,"\\\\").replace(/'/g,"\\'")}
loadMovies();
