const header=document.querySelector('.header');
const toggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
addEventListener('scroll',()=>header.classList.toggle('scrolled',scrollY>40),{passive:true});
toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.classList.toggle('active',open);toggle.setAttribute('aria-expanded',open);document.body.style.overflow=open?'hidden':''});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{nav.classList.remove('open');toggle.classList.remove('active');toggle.setAttribute('aria-expanded','false');document.body.style.overflow=''}));
const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}}),{threshold:.12});
document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
