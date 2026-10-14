'use client';
import {motion,useReducedMotion} from 'motion/react';
import type {ReactNode} from 'react';
export function Reveal({children,delay=0,className=''}:{children:ReactNode;delay?:number;className?:string}){const reduce=useReducedMotion();return <motion.div className={className} initial={reduce?false:{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true,amount:.13}} transition={{duration:reduce?0:.65,delay:reduce?0:delay,ease:[.22,1,.36,1]}}>{children}</motion.div>}
export function HeroMotion({children}:{children:ReactNode}){const reduce=useReducedMotion();return <motion.div initial={reduce?false:{opacity:0,y:28}} animate={{opacity:1,y:0}} transition={{duration:.8,ease:[.22,1,.36,1]}}>{children}</motion.div>}
export function HeroPhoto({children}:{children:ReactNode}){const reduce=useReducedMotion();return <motion.div className="hero-photo" initial={reduce?false:{opacity:0,scale:.92,rotate:2}} animate={{opacity:1,scale:1,rotate:0}} transition={{duration:1,ease:[.22,1,.36,1]}} whileHover={reduce?undefined:{scale:1.018}}>{children}</motion.div>}
