(function(){
const STACKS=[
  {id:'st-js',sym:'Js',name:'JavaScript',c:'#ffcb3d'},{id:'st-ts',sym:'Ts',name:'TypeScript',c:'#6f9bff'},
  {id:'st-cs',sym:'C#',name:'C#',c:'#ff5fa2'},{id:'st-dj',sym:'Dj',name:'Django',c:'#3dffb0'},
  {id:'st-c',sym:'C',name:'C',c:'#c9d6ff'},{id:'st-cpp',sym:'C++',name:'C++',c:'#a98bff'},
  {id:'st-py',sym:'Py',name:'Python',c:'#4fd2ff'},{id:'st-cv',sym:'Cv',name:'OpenCV',c:'#ff4d5e'}
];
const reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* letreiro */
const mq=document.getElementById('marquee');
const names=STACKS.map(s=>s.name);
[...names,...names,...names,...names].forEach(n=>{const s=document.createElement('span');s.textContent=n;mq.appendChild(s)});

/* texto rotativo */
const roll=document.getElementById('roll');let ri=6;
if(!reduce) setInterval(()=>{ri=(ri+1)%names.length;roll.textContent=names[ri]},1800);

/* bits do C++ */
const bitsEl=document.getElementById('bits');const bits=[];
for(let i=0;i<32;i++){const s=document.createElement('span');const on=Math.random()>.5;s.textContent=on?'1':'0';if(on)s.className='on';bitsEl.appendChild(s);bits.push(s);}
if(!reduce) setInterval(()=>{for(let k=0;k<3;k++){const s=bits[Math.floor(Math.random()*32)];const on=!s.classList.contains('on');s.classList.toggle('on',on);s.textContent=on?'1':'0';}},180);

/* filtros */
const btns=document.querySelectorAll('.filters button'),cards=document.querySelectorAll('.card');
btns.forEach(b=>b.addEventListener('click',()=>{
  btns.forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));
  let k=0;cards.forEach(c=>{const show=b.dataset.f==='all'||c.dataset.cat===b.dataset.f;c.hidden=!show;
    if(show){c.style.setProperty('--i',k++);c.style.animation='none';void c.offsetWidth;c.style.animation='';}});
}));

/* tilt 3D nos cards */
cards.forEach(c=>{
  c.addEventListener('pointermove',e=>{if(reduce)return;const r=c.getBoundingClientRect(),x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;
    c.style.setProperty('--ry',((x-.5)*14)+'deg');c.style.setProperty('--rx',((.5-y)*12)+'deg');
    c.style.setProperty('--mx',(x*100)+'%');c.style.setProperty('--my',(y*100)+'%');});
  c.addEventListener('pointerleave',()=>{c.style.setProperty('--rx','0deg');c.style.setProperty('--ry','0deg')});
});

function focusCard(id){
  if(document.getElementById(id).hidden) document.getElementById('f-all').click();
  const el=document.getElementById(id);el.scrollIntoView({behavior:reduce?'auto':'smooth',block:'center'});
  el.classList.remove('flash');void el.offsetWidth;el.classList.add('flash');
}

/* copiar e-mail */
const cpBtn=document.getElementById('copyMail'),addr=document.getElementById('mailAddr');
cpBtn.addEventListener('click',()=>{
  const done=()=>{cpBtn.textContent='Copiado';setTimeout(()=>cpBtn.textContent='Copiar',1800);};
  const sel=()=>{const r=document.createRange();r.selectNodeContents(addr);const s=getSelection();s.removeAllRanges();s.addRange(r);cpBtn.textContent='Selecionado';setTimeout(()=>cpBtn.textContent='Copiar',1800);};
  try{navigator.clipboard.writeText(addr.textContent).then(done,sel);}catch(e){sel();}
});

/* fundo escolhido pelo usuário (fica só no navegador dele) */
const heroEl=document.getElementById('topo'),bgImg=document.getElementById('bgImg'),bgFile=document.getElementById('bgFile'),bgClear=document.getElementById('bgClear');
function setBg(url){bgImg.style.backgroundImage=url?'url("'+url+'")':'';heroEl.classList.toggle('has-bg',!!url);bgClear.hidden=!url;}
try{const saved=localStorage.getItem('heroBg');if(saved)setBg(saved);}catch(e){}
bgFile.addEventListener('change',()=>{const f=bgFile.files[0];if(!f)return;const rd=new FileReader();
  rd.onload=()=>{setBg(rd.result);try{localStorage.setItem('heroBg',rd.result);}catch(e){}};rd.readAsDataURL(f);bgFile.value='';});
bgClear.addEventListener('click',()=>{setBg(null);try{localStorage.removeItem('heroBg');}catch(e){}});

/* ---------- cena 3D ---------- */
if(!window.THREE) return;
const hero=heroEl,cv=document.getElementById('scene');
let renderer;
try{renderer=new THREE.WebGLRenderer({canvas:cv,antialias:true,alpha:true});}catch(e){return;}
renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
const scene=new THREE.Scene();scene.fog=new THREE.FogExp2(0x061238,0.03);
const camera=new THREE.PerspectiveCamera(50,1,0.1,200);camera.position.set(0,2.2,13);

scene.add(new THREE.AmbientLight(0x3a5cff,0.7));
const dl=new THREE.DirectionalLight(0x9fdcff,0.8);dl.position.set(-5,8,6);scene.add(dl);
const coreLight=new THREE.PointLight(0x8dff3a,2.4,22);scene.add(coreLight);

/* núcleo radioativo */
const core=new THREE.Group();scene.add(core);
const gem=new THREE.Mesh(new THREE.IcosahedronGeometry(1.2,0),new THREE.MeshStandardMaterial({color:0x7dff2a,emissive:0x36e000,emissiveIntensity:.9,flatShading:true,metalness:.2,roughness:.25}));
const cage=new THREE.Mesh(new THREE.IcosahedronGeometry(1.8,1),new THREE.MeshBasicMaterial({color:0x9dff3a,wireframe:true,transparent:true,opacity:.22}));
core.add(gem,cage);
function radial(col){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');
  const gr=g.createRadialGradient(64,64,0,64,64,64);gr.addColorStop(0,col);gr.addColorStop(.35,col.replace('1)','.35)'));gr.addColorStop(1,'rgba(0,0,0,0)');
  g.fillStyle=gr;g.fillRect(0,0,128,128);return new THREE.CanvasTexture(c);}
const glow=new THREE.Sprite(new THREE.SpriteMaterial({map:radial('rgba(157,255,58,1)'),blending:THREE.AdditiveBlending,depthWrite:false,transparent:true}));
glow.scale.set(7,7,1);core.add(glow);

/* hangar: cúpula geodésica + piso */
const dome=new THREE.Mesh(new THREE.SphereGeometry(24,36,14,0,Math.PI*2,0,Math.PI/2),new THREE.MeshBasicMaterial({color:0x2a6bff,wireframe:true,transparent:true,opacity:.13}));
dome.position.y=-3;scene.add(dome);
const grid=new THREE.GridHelper(70,46,0x4fd2ff,0x1f4fd8);grid.position.y=-3;grid.material.transparent=true;grid.material.opacity=.28;scene.add(grid);

/* partículas subindo */
const PN=reduce?120:420,pg=new THREE.BufferGeometry(),pp=new Float32Array(PN*3),ps=[];
for(let i=0;i<PN;i++){const a=Math.random()*Math.PI*2,r=Math.random()*10;pp[i*3]=Math.cos(a)*r;pp[i*3+1]=Math.random()*12-3;pp[i*3+2]=Math.sin(a)*r;ps.push(.004+Math.random()*.012);}
pg.setAttribute('position',new THREE.BufferAttribute(pp,3));
const pts=new THREE.Points(pg,new THREE.PointsMaterial({color:0x9dff3a,size:.07,transparent:true,opacity:.8,blending:THREE.AdditiveBlending,depthWrite:false}));scene.add(pts);

/* blocos das stacks em órbita */
function tileTex(s){const c=document.createElement('canvas');c.width=c.height=256;const g=c.getContext('2d');
  const bg=g.createLinearGradient(0,0,0,256);bg.addColorStop(0,'#13306f');bg.addColorStop(1,'#071440');g.fillStyle=bg;g.fillRect(0,0,256,256);
  g.strokeStyle=s.c;g.lineWidth=10;g.strokeRect(10,10,236,236);g.globalAlpha=.15;g.fillStyle=s.c;g.fillRect(10,10,236,236);g.globalAlpha=1;
  g.fillStyle=s.c;g.textAlign='center';g.font='900 '+(s.sym.length>2?100:120)+'px "Big Shoulders Display", Impact, sans-serif';g.fillText(s.sym,128,150);
  g.fillStyle='#dbe6ff';g.font='600 26px "JetBrains Mono", monospace';g.fillText(s.name,128,214);
  const t=new THREE.CanvasTexture(c);t.anisotropy=4;return t;}
const rings=[0,1,2].map(k=>{const gr=new THREE.Group();gr.rotation.x=[.18,-.28,.42][k];gr.rotation.z=[.1,.22,-.15][k];scene.add(gr);
  const r=3.4+k*1.55;const tor=new THREE.Mesh(new THREE.TorusGeometry(r,.012,6,160),new THREE.MeshBasicMaterial({color:0x4fd2ff,transparent:true,opacity:.35}));
  tor.rotation.x=Math.PI/2;gr.add(tor);return {g:gr,r};});
const tokens=[];const side=new THREE.MeshStandardMaterial({color:0x1a2f6e,metalness:.7,roughness:.35});
function buildTokens(){
  tokens.forEach(t=>t.mesh.parent.remove(t.mesh));tokens.length=0;
  STACKS.forEach((s,i)=>{const ring=rings[i%3];const face=new THREE.MeshStandardMaterial({map:tileTex(s),emissive:0xffffff,emissiveIntensity:0,metalness:.1,roughness:.6});
    const m=new THREE.Mesh(new THREE.BoxGeometry(1.25,1.25,.22),[side,side,side,side,face,face]);
    m.userData={s,i};ring.g.add(m);tokens.push({mesh:m,ring,a0:(Math.floor(i/3)/3)*Math.PI*2+(i%3)*.6,sp:[.22,-.16,.12][i%3],delay:.25+i*.1,hover:0});});
}
buildTokens();
if(document.fonts&&document.fonts.ready) document.fonts.ready.then(()=>{if(document.fonts.check('900 20px "Big Shoulders Display"'))buildTokens();});

/* interação */
const mouse={x:0,y:0,tx:0,ty:0},ndc=new THREE.Vector2(9,9),ray=new THREE.Raycaster();let hovered=null;
hero.addEventListener('pointermove',e=>{const r=hero.getBoundingClientRect();mouse.tx=(e.clientX-r.left)/r.width*2-1;mouse.ty=(e.clientY-r.top)/r.height*2-1;ndc.set(mouse.tx,-mouse.ty);});
hero.addEventListener('pointerleave',()=>{ndc.set(9,9);mouse.tx=mouse.ty=0;});
cv.addEventListener('click',()=>{if(hovered) focusCard(hovered.userData.s.id);});

function resize(){const w=hero.clientWidth,h=hero.clientHeight;renderer.setSize(w,h,false);camera.aspect=w/h;
  camera.position.z=w<720?16.5:13;core.position.x=w<720?0:2.6;rings.forEach(r=>r.g.position.x=core.position.x);camera.updateProjectionMatrix();}
new ResizeObserver(resize).observe(hero);resize();

let visible=true;new IntersectionObserver(es=>{visible=es[0].isIntersecting;},{threshold:0}).observe(hero);
const clock=new THREE.Clock();const tmp=new THREE.Vector3();const speed=reduce?.15:1;
const ease=p=>1-Math.pow(1-p,3);
function frame(){
  requestAnimationFrame(frame);if(!visible)return;
  const t=clock.getElapsedTime()*speed;
  mouse.x+=(mouse.tx-mouse.x)*.05;mouse.y+=(mouse.ty-mouse.y)*.05;
  camera.position.x=mouse.x*1.6;camera.position.y=2.2-mouse.y*.9;camera.lookAt(core.position.x*.5,.2,0);
  gem.rotation.x=t*.4;gem.rotation.y=t*.6;cage.rotation.y=-t*.25;cage.rotation.z=t*.15;
  const pulse=1+Math.sin(t*3)*.08;glow.scale.set(7*pulse,7*pulse,1);coreLight.intensity=2.2+Math.sin(t*3)*.5;coreLight.position.copy(core.position);
  dome.rotation.y=t*.02;
  const arr=pg.attributes.position.array;for(let i=0;i<PN;i++){arr[i*3+1]+=ps[i]*(reduce?.2:1);if(arr[i*3+1]>9)arr[i*3+1]=-3;}pg.attributes.position.needsUpdate=true;

  ray.setFromCamera(ndc,camera);const hit=ray.intersectObjects(tokens.map(k=>k.mesh))[0];
  hovered=hit?hit.object:null;cv.style.cursor=hovered?'pointer':'default';

  tokens.forEach(k=>{
    const p=reduce?1:ease(Math.min(1,Math.max(0,(clock.getElapsedTime()-k.delay)/1.6)));
    const a=k.a0+t*k.sp;const r=k.ring.r*(1+(1-p)*5);
    k.mesh.position.set(Math.cos(a)*r,Math.sin(t*1.3+k.mesh.userData.i)*.25+(1-p)*6,Math.sin(a)*r);
    k.hover+=((k.mesh===hovered?1:0)-k.hover)*.15;
    const sc=p*(1+k.hover*.35);k.mesh.scale.set(sc,sc,sc);
    camera.getWorldPosition(tmp);k.mesh.lookAt(tmp);k.mesh.rotateY(Math.sin(t*.9+k.mesh.userData.i)*.45+(1-p)*4);k.mesh.rotateZ(Math.sin(t*.7+k.mesh.userData.i*2)*.08);
    k.mesh.material[4].emissiveIntensity=k.hover*.12;
  });
  rings.forEach((r,i)=>{r.g.rotation.y=t*.03*(i%2?-1:1);});
  renderer.render(scene,camera);
}
frame();
})();
