'use client';
import {motion,useReducedMotion} from 'motion/react';
import {Plus} from 'lucide-react';
import Image from 'next/image';
import {products,money} from '@/domain/catalog';
import {useCart} from './cart-context';
import {useState} from 'react';
export function ProductGrid({limit}:{limit?:number}){const {add}=useCart();const reduce=useReducedMotion();const [recent,setRecent]=useState<string|null>(null);return <div className="grid">{products.slice(0,limit).map((p,i)=><motion.article key={p.id} className="product-card" initial={reduce?false:{opacity:0,y:38}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.12}} whileHover={reduce?undefined:{y:-9}} transition={{duration:.45,delay:reduce?0:Math.min(i,5)*.08,ease:[.22,1,.36,1]}}><div className="product-visual"><Image src={p.image} alt={p.name} fill sizes="(max-width:760px) 100vw, 33vw" style={{objectFit:'cover'}}/></div><div className="product-info"><small className="eyebrow">{p.category}</small><h3>{p.name}</h3><p>{p.description}</p><div className="product-foot"><strong>{p.priceCents?money(p.priceCents):'Consultar'}</strong><motion.button whileTap={reduce?undefined:{scale:.9}} className="mini-btn" disabled={!p.priceCents} onClick={()=>{add(p.id);setRecent(p.id)}} aria-label={`Agregar ${p.name} al carrito`}><Plus size={16}/>{recent===p.id?'¡Agregado!':'Agregar'}</motion.button></div><small className="price-note">Precio referencial · por confirmar</small></div></motion.article>)}</div>}
