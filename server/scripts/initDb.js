import 'dotenv/config';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import db from '../config/db.js';

const run = async () => {
  const schemaPath = resolve(process.cwd(), '../database/schema.sql');
  const schema = (await readFile(schemaPath, 'utf8'))
    .replace(/^\s*CREATE DATABASE IF NOT EXISTS[^;]*;\s*/im, '')
    .replace(/^\s*USE\s+[^;]+;\s*/im, '');

  for (const statement of schema.split(';').map(part => part.trim()).filter(Boolean)) {
    await db.query(statement);
  }

  console.log('MySQL schema is ready.');
};

run()
  .catch(error => {
    console.error(`Database initialization failed: ${error.message}`);
    process.exitCode = 1;
  })
  .finally(() => db.end());
