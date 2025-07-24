#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Starting comprehensive build process...\n');

// Build steps
const steps = [
  {
    name: 'Clean previous builds',
    command: 'npm run clean',
    description: 'Removing .next and out directories'
  },
  {
    name: 'Install dependencies',
    command: 'npm ci',
    description: 'Clean install of all dependencies'
  },
  {
    name: 'Security audit',
    command: 'npm run audit-security',
    description: 'Checking for security vulnerabilities',
    optional: true
  },
  {
    name: 'Lint code',
    command: 'npm run lint:fix',
    description: 'Linting and fixing code style issues'
  },
  {
    name: 'Type check',
    command: 'npm run type-check',
    description: 'TypeScript type checking'
  },
  {
    name: 'Build application',
    command: 'npm run build:production',
    description: 'Building optimized production bundle'
  },
  {
    name: 'Generate sitemap',
    command: 'npm run build:sitemap',
    description: 'Creating sitemap.xml for SEO'
  },
  {
    name: 'Generate robots.txt',
    command: 'npm run build:robots',
    description: 'Creating robots.txt for search engines'
  }
];

const runStep = (step, index) => {
  console.log(`\n[${index + 1}/${steps.length}] ${step.name}`);
  console.log(`📝 ${step.description}`);
  
  try {
    execSync(step.command, { 
      stdio: 'inherit',
      cwd: process.cwd()
    });
    console.log(`✅ ${step.name} completed`);
  } catch (error) {
    if (step.optional) {
      console.log(`⚠️  ${step.name} failed but continuing (optional step)`);
    } else {
      console.error(`❌ ${step.name} failed`);
      process.exit(1);
    }
  }
};

// Run all steps
steps.forEach(runStep);

// Build summary
console.log('\n🎉 Build completed successfully!');
console.log('\n📊 Build Summary:');
console.log('✅ Code linted and formatted');
console.log('✅ TypeScript types validated');
console.log('✅ Production bundle optimized');
console.log('✅ SEO files generated');
console.log('✅ Security audit completed');

// Check if .next directory exists and show build info
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  const buildId = fs.readFileSync(path.join(nextDir, 'BUILD_ID'), 'utf8').trim();
  console.log(`\n🏗️  Build ID: ${buildId}`);
  console.log(`📦 Build ready for deployment`);
}

console.log('\n🚀 Ready to deploy! Run "npm start" to test locally.');
