#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

// Generate robots.txt for SEO
const generateRobots = () => {
  const robots = `User-agent: *
Allow: /

# Sitemap
Sitemap: https://your-domain.com/sitemap.xml

# Disallow Firebase config or sensitive routes if any
Disallow: /api/
`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
  }

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robots);
  console.log('✅ Generated robots.txt');
};

generateRobots();
