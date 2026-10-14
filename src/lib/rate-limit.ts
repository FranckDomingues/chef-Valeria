// Development-only process-local limiter. Production must use shared Redis/WAF limits.
const attempts=new Map<string,{count:number;until:number}>();
export function allowed(key:string,max=5,windowMs=15*60*1000){const now=Date.now();if(attempts.size>10000)attempts.clear();const entry=attempts.get(key);if(!entry||entry.until<now){attempts.set(key,{count:1,until:now+windowMs});return true}entry.count++;return entry.count<=max}
