import Link from 'next/link';
import Image from 'next/image';
import {ProductGrid} from '@/components/product-grid';
import {Reveal} from '@/components/reveal';
import {CinematicHero} from '@/components/cinematic-hero';
export default function Home(){return <><CinematicHero/><div className="container"><Reveal><section id="favoritos" className="section"><div className="section-head"><div><span className="eyebrow">FRESCO · CASERO · DELICIOSO</span><h2>Favoritos de nuestra cocina</h2></div><Link className="text-link" href="/products">Ver catálogo ↗</Link></div><ProductGrid limit={3}/></section></Reveal><Reveal><section className="section"><div className="banner"><div><span className="eyebrow">DE NUESTRA COCINA A TU MESA</span><h2>Conoce a Chef Valeria</h2><p>Una marca nacida del amor por la comida saludable, la disciplina y la pasión por crear recetas que se disfrutan.</p><Link className="btn alt" href="/about">Conoce nuestra historia ↗</Link></div><div className="banner-photo"><Image src="/images/chef-valeria.webp" alt="Chef Valeria, creadora de Luva’s Healthy" fill sizes="(max-width:760px) 100vw, 50vw" style={{objectFit:'cover'}}/></div></div></section></Reveal></div></>}
