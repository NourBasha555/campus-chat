const C='campus-v5',F=['./','index.html','manifest.webmanifest','icon.svg'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F.map(u=>new Request(u,{cache:'no-cache'})))));self.skipWaiting();});
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
  if(e.request.method!=='GET')return;
  if(e.request.mode==='navigate'){
    e.respondWith(fetch(e.request,{cache:'no-store'}).then(r=>{const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl));return r;}).catch(()=>caches.match(e.request).then(m=>m||caches.match('index.html'))));
    return;
  }
  e.respondWith(fetch(e.request,{cache:'no-cache'}).then(r=>{if(r&&r.ok){const cl=r.clone();caches.open(C).then(c=>c.put(e.request,cl));}return r;}).catch(()=>caches.match(e.request)));
});
