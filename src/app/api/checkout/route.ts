import {NextResponse} from 'next/server';import Stripe from 'stripe';import {z} from 'zod';import {products} from '@/domain/catalog';import {sameOrigin} from '@/lib/auth';import {allowed} from '@/lib/rate-limit';
const schema=z.object({items:z.array(z.object({id:z.string(),quantity:z.number().int().min(1).max(20)})).min(1).max(30)});
export async function POST(req:Request){if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';if(!allowed('checkout:'+ip,15,60000))return NextResponse.json({error:'Rate limited'},{status:429});
 const parsed=schema.safeParse(await req.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:'Invalid cart'},{status:400});
 const key=process.env.STRIPE_SECRET_KEY;const base=process.env.NEXT_PUBLIC_BASE_URL;if(!key||!base)return NextResponse.json({error:'Payments not configured. Add Stripe test keys.'},{status:503});
 const consolidated=new Map<string,number>();for(const item of parsed.data.items)consolidated.set(item.id,(consolidated.get(item.id)||0)+item.quantity);
 if([...consolidated.values()].some(q=>q>20))return NextResponse.json({error:'Quantity exceeded'},{status:400});
 const lines=[];for(const [id,quantity] of consolidated){const product=products.find(p=>p.id===id);if(!product)return NextResponse.json({error:'Unknown product'},{status:400});lines.push({price_data:{currency:'usd',unit_amount:product.priceCents,product_data:{name:product.name}},quantity})}
 try{const stripe=new Stripe(key);const session=await stripe.checkout.sessions.create({mode:'payment',line_items:lines,customer_creation:'always',success_url:base+'/success?session_id={CHECKOUT_SESSION_ID}',cancel_url:base+'/cart',billing_address_collection:'auto'});return NextResponse.json({url:session.url})}catch{return NextResponse.json({error:'Payment provider unavailable'},{status:502})}
}
