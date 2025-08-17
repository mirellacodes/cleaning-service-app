#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');

console.log('🚀 Vercel build hook: Starting post-build setup...');

try {
  // Generate Prisma client
  console.log('📦 Generating Prisma client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Seed the database with production data
  console.log('🌱 Seeding production database...');
  execSync('npm run seed:prod', { stdio: 'inherit' });
  
  console.log('✅ Vercel build hook completed successfully!');
} catch (error) {
  console.error('❌ Vercel build hook failed:', error);
  process.exit(1);
}
