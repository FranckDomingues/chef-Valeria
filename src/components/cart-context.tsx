"use client";
import {createContext,useContext,useEffect,useState} from 'react';
type Item={id:string;quantity:number};type Cart={items:Item[];add:(id:string)=>void;remove:(id:string)=>void;clear:()=>void};
const Context=createContext<Cart|null>(null);export function CartProvider({children}:{children:React.ReactNode}){const [items,setItems]=useState<Item[]>([]);const [ready,setReady]=useState(false);
useEffect(()=>{try{const raw=JSON.parse(localStorage.getItem('commerce-cart')||'[]');if(Array.isArray(raw))setItems(raw.filter(x=>typeof x.id==='string'&&Number.isInteger(x.quantity)&&x.quantity>0&&x.quantity<=20).slice(0,30))}catch{}setReady(true)},[]);
useEffect(()=>{if(ready)localStorage.setItem('commerce-cart',JSON.stringify(items))},[items,ready]);
const add=(id:string)=>setItems(prev=>{const item=prev.find(i=>i.id===id);if(item)return prev.map(i=>i.id===id?{...i,quantity:Math.min(20,i.quantity+1)}:i);return [...prev,{id,quantity:1}].slice(0,30)});
return <Context.Provider value={{items,add,remove:(id)=>setItems(p=>p.filter(i=>i.id!==id)),clear:()=>setItems([])}}>{children}</Context.Provider>}
export function useCart(){const ctx=useContext(Context);if(!ctx)throw Error('CartProvider missing');return ctx}
