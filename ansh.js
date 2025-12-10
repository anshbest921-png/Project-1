// Simple client-side owner-only post mechanism.
// WARNING: This is client-side only and not secure for public-sensitive sites.
// Change OWNER_PASSWORD before using: currently set to 'ansh-pass' (change it!).
const OWNER_PASSWORD = 'ansh-pass'; // CHANGE THIS on your device before publishing
const unlockBtn = document.getElementById('unlockBtn');
const postForm = document.getElementById('postForm');
const lockBtn = document.getElementById('lockBtn');
const saveBtn = document.getElementById('saveBtn');
const postsEl = document.getElementById('posts');
const postTitle = document.getElementById('postTitle');
const postBody = document.getElementById('postBody');
function loadPosts(){
const saved = localStorage.getItem('ansh_posts');
const posts = saved ? JSON.parse(saved) : [];
postsEl.innerHTML = '';
if(posts.length === 0){
postsEl.innerHTML = '<p class="empty">No posts yet — you can add one below (owner only).</p>';
return;
}
posts.forEach(p=>{
const d = document.createElement('div');
d.className = 'post';
d.innerHTML = `<h3>${escapeHtml(p.title)}</h3><p>${escapeHtml(p.body)}</p>`;
postsEl.appendChild(d);
});
}
function escapeHtml(s){ return
s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;'); }
unlockBtn.addEventListener('click', ()=>{
const pwd = prompt('Enter owner password to unlock posting:');
if(pwd === OWNER_PASSWORD){
postForm.classList.remove('hidden');
unlockBtn.classList.add('hidden');
alert('Unlocked. You can create a post. Remember to change the password in script.js file.');
} else {
alert('Incorrect password.');
}
});
lockBtn.addEventListener('click', ()=>{
postForm.classList.add('hidden');
unlockBtn.classList.remove('hidden');
postTitle.value=''; postBody.value='';
});
saveBtn.addEventListener('click', ()=>{
const title = postTitle.value.trim();
const body = postBody.value.trim();
if(!title || !body){ alert('Add title and body.'); return; }
const saved = localStorage.getItem('ansh_posts');
const posts = saved ? JSON.parse(saved) : [];
posts.unshift({title, body, date: new Date().toISOString()});
localStorage.setItem('ansh_posts', JSON.stringify(posts));
loadPosts();
postTitle.value=''; postBody.value='';
alert('Saved locally in your browser (owner-only).');
});
// initialize
loadPosts();
