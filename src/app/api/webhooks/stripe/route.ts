import {NextResponse} from 'next/server';import Stripe from 'stripe';import db from '@/adapters/database';
export async function POST(req:Request){const key=process.env.STRIPE_SECRET_KEY;const secret=process.env.STRIPE_WEBHOOK_SECRET;const signature=req.headers.get('stripe-signature');if(!key||!secret||!signature)return NextResponse.json({error:'Webhook not configured'},{status:400});
 let event:Stripe.Event;try{event=new Stripe(key).webhooks.constructEvent(await req.text(),signature,secret)}catch{return NextResponse.json({error:'Invalid signature'},{status:400})}
 if(event.type==='checkout.session.completed'||event.type==='checkout.session.async_payment_succeeded'){
 const session=event.data.object as Stripe.Checkout.Session;
 if(session.payment_status==='paid')db.transaction(()=>{const exists=db.prepare('SELECT id FROM processed_events WHERE id=?').get(event.id);if(exists)return;db.prepare('INSERT INTO orders(id,customer_email,amount_cents,status) VALUES(?,?,?,?) ON CONFLICT(id) DO UPDATE SET status=excluded.status').run(session.id,session.customer_details?.email||'',session.amount_total||0,'Paid');db.prepare('INSERT INTO processed_events(id) VALUES(?)').run(event.id)})();
 }
 return NextResponse.json({received:true})
}
