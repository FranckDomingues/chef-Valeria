import 'server-only';import {SignJWT,jwtVerify} from 'jose';import {cookies} from 'next/headers';
const key=()=>{const secret=process.env.SESSION_SECRET;if(!secret||secret.length<32)throw new Error('SESSION_SECRET must be at least 32 characters');return new TextEncoder().encode(secret)};
export async function makeSession(){return new SignJWT({role:'owner'}).setProtectedHeader({alg:'HS256'}).setIssuer('commerce-template').setAudience('owner').setIssuedAt().setExpirationTime('8h').sign(key())}
export async function isOwner(){const token=(await cookies()).get('owner_session')?.value;if(!token)return false;try{const {payload}=await jwtVerify(token,key(),{issuer:'commerce-template',audience:'owner',algorithms:['HS256']});return payload.role==='owner'}catch{return false}}
export async function requireOwner(){if(!await isOwner())throw new Error('Unauthorized')}
export function sameOrigin(req:Request){const origin=req.headers.get('origin');const host=req.headers.get('x-forwarded-host')||req.headers.get('host');if(!origin||!host)return false;try{return new URL(origin).host===host}catch{return false}}
