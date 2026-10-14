export type Product={id:string;name:string;category:string;description:string;priceCents:number;emoji:string;accent:string;image:string;priceConfirmed:boolean};
// Los precios son referencias de publicaciones. Confirmar con la propietaria antes de habilitar pagos.
export const products:Product[]=[
{id:'combo-especial',name:'Súper Combo Especial',category:'Combos',description:'5 arepitas a elegir y 1 libra de proteína. Opciones sujetas a confirmación.',priceCents:3299,emoji:'🥙',accent:'#d6a2b5',image:'/images/combo.webp',priceConfirmed:false},
{id:'arepas-cinco',name:'Arepas (5 unidades)',category:'Arepas',description:'Yuca, plátano o harina PAN. Confirma variedades y disponibilidad.',priceCents:1500,emoji:'🫓',accent:'#c7d7a8',image:'/images/menu.webp',priceConfirmed:false},
{id:'carne-mechada',name:'Carne mechada (1 lb)',category:'Proteínas',description:'Carne mechada casera, lista para calentar y disfrutar.',priceCents:2200,emoji:'🍖',accent:'#d5b49a',image:'/images/carne-mechada.webp',priceConfirmed:false},
{id:'pollo-mechado',name:'Pollo mechado (1 lb)',category:'Proteínas',description:'Pollo mechado casero, ideal para arepas y meal prep.',priceCents:2000,emoji:'🍗',accent:'#e0cc96',image:'/images/pollo-mechado.webp',priceConfirmed:false},
{id:'sopa-vegetales',name:'Sopa de vegetales',category:'Sopas',description:'Preparación casera. Ingredientes y disponibilidad por confirmar.',priceCents:800,emoji:'🥣',accent:'#c9d8b0',image:'/images/cantinas.webp',priceConfirmed:false},
{id:'torta-artesanal',name:'Torta artesanal',category:'Postres',description:'Postre artesanal. Consultar tamaño, ingredientes y precio.',priceCents:0,emoji:'🍰',accent:'#f0cadb',image:'/images/torta.webp',priceConfirmed:false}
];
export const money=(cents:number)=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'}).format(cents/100);
