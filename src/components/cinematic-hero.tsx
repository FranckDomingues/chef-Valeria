'use client';
import {useEffect,useRef,useState} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {motion,useReducedMotion} from 'motion/react';

export function CinematicHero(){
 const videoRef=useRef<HTMLVideoElement>(null);
 const reduced=useReducedMotion();
 const [paused,setPaused]=useState(false);
 const [videoReady,setVideoReady]=useState(false);
 useEffect(()=>{if(reduced){videoRef.current?.pause();setPaused(true)}},[reduced]);
 const toggle=()=>{const v=videoRef.current;if(!v||!videoReady)return;if(v.paused){v.play().then(()=>setPaused(false)).catch(()=>setPaused(true))}else{v.pause();setPaused(true)}};
 return <section className="cinematic-hero" aria-label="Bienvenidos a Luva's Healthy">
   <Image src="/images/kitchen-cinematic.webp" alt="Cocina cálida con carne mechada y vegetales salteándose en un sartén" fill priority sizes="100vw" className="cinematic-poster"/>
   {!reduced&&<video ref={videoRef} className="cinematic-video" autoPlay muted playsInline loop preload="metadata" poster="/images/kitchen-cinematic.webp" onCanPlay={()=>setVideoReady(true)} onError={()=>setVideoReady(false)} aria-hidden="true"><source src="/videos/luvas-intro.mp4" type="video/mp4"/></video>}
   <div className="cinematic-shade"/>
   <motion.div className="cinematic-copy" initial={reduced?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.9,delay:.35}}>
    <motion.div initial={reduced?false:{opacity:0,scale:.86}} animate={{opacity:1,scale:1}} transition={{duration:.8,delay:.55}} className="cinematic-brand"><Image src="/images/logo.webp" alt="Luva's Healthy" width={132} height={132}/></motion.div>
    <span className="cinematic-kicker">HECHO CON AMOR · KISSIMMEE, FLORIDA</span>
    <h1>Comer saludable <em>también puede ser delicioso.</em></h1>
    <p>Arepas artesanales, proteínas caseras y sabores que nacen del corazón.</p>
    <div className="cinematic-actions"><Link href="/products" className="btn cinematic-primary">Explorar nuestro menú ↗</Link><Link href="/about" className="btn cinematic-secondary">Nuestra historia</Link></div>
   </motion.div>
   {videoReady&&!reduced&&<button className="cinematic-play" type="button" onClick={toggle} aria-label={paused?'Reproducir animación':'Pausar animación'}>{paused?'▶ Reproducir':'Ⅱ Pausar'}</button>}
   <a href="#favoritos" className="cinematic-discover">DESCUBRE <span aria-hidden="true">↓</span></a>
 </section>
}
