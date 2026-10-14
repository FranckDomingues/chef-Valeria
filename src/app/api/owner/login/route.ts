import {NextResponse} from 'next/server';import argon2 from 'argon2';import {z} from 'zod';import {makeSession,sameOrigin} from '@/lib/auth';import {allowed} from '@/lib/rate-limit';
const schema=z.object({email:z.email().max(254),password:z.string().min(1).max(1024)});
export async function POST(req:Request){if(!sameOrigin(req))return NextResponse.json({error:'Invalid origin'},{status:403});
 const ip=req.headers.get('x-forwarded-for')?.split(',')[0]||'unknown';if(!allowed('login:'+ip))return NextResponse.json({error:'Too many attempts'},{status:429});
 const parsed=schema.safeParse(await req.json().catch(()=>null));if(!parsed.success)return NextResponse.json({error:'Invalid credentials'},{status:401});
 const hash=process.env.OWNER_PASSWORD_HASH;const email=process.env.OWNER_EMAIL;
 if(!hash||!email)return NextResponse.json({error:'Owner login not configured'},{status:503});
 let ok=false;try{ok=parsed.data.email.toLowerCase()===email.toLowerCase()&&await argon2.verify(hash,parsed.data.password)}catch{}
 if(!ok)return NextResponse.json({error:'Invalid credentials'},{status:401});
 const res=NextResponse.json({ok:true});res.cookies.set('owner_session',await makeSession(),{httpOnly:true,secure:process.env.NODE_ENV==='production',sameSite:'strict',path:'/',maxAge:8*60*60});return res;
}
