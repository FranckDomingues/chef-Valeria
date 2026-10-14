import 'server-only';
import Database from 'better-sqlite3';
import {mkdirSync} from 'node:fs';import {dirname,resolve} from 'node:path';
const filename=resolve(process.env.DB_PATH||'./data/commerce.sqlite');mkdirSync(dirname(filename),{recursive:true});
const db=new Database(filename);db.pragma('journal_mode = WAL');db.pragma('busy_timeout = 5000');
db.exec(`CREATE TABLE IF NOT EXISTS tickets(id INTEGER PRIMARY KEY AUTOINCREMENT,subject TEXT NOT NULL,customer TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'Open',created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS orders(id TEXT PRIMARY KEY,customer_email TEXT NOT NULL DEFAULT '',amount_cents INTEGER NOT NULL,status TEXT NOT NULL,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);
CREATE TABLE IF NOT EXISTS processed_events(id TEXT PRIMARY KEY,created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP);`);
export default db;
