import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';

/**
 * SANITY CONFIGURATION
 * We use environment variables for security.
 * Ensure you have SANITY_API_TOKEN in your .env file.
 */
const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID || 'jatg6f0i',
  dataset: process.env.PUBLIC_SANITY_DATASET || 'wellness_cms',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
  apiVersion: '2024-03-20',
});

// Helper to upload images
async function uploadImage(imagePath) {
  if (!fs.existsSync(imagePath)) {
    console.warn(`⚠️  Image not found: ${imagePath}`);
    return null;
  }
  try {
    const buffer = fs.readFileSync(imagePath);
    const filename = path.basename(imagePath);
    console.log(`📸 Uploading image: ${filename}...`);
    const asset = await client.assets.upload('image', buffer, { filename });
    return {
      _type: 'image',
      asset: {
        _ref: asset._id,
        _type: 'reference'
      }
    };
  } catch (err) {
    console.error(`❌ Failed to upload ${imagePath}:`, err.message);
    return null;
  }
}

// ---------------------------------------------------------
// DATA TO MIGRATE
// ---------------------------------------------------------

const services = [
  {
    _id: 'service-stress',
    _type: 'service',
    title: 'Stress & Anxiety',
    description: 'Gentle practices to calm your mind, ease tension, and bring you back. When your mind won\'t switch off and your body\'s stuck in fight-or-flight.',
    bulletPoints: [
      'Nervous system regulation',
      'Breathing and grounding techniques',
      'Sustainable stress management'
    ],
    imagePath: 'src/assets/images/services/stress_anxiety_banner_1776545689108.png',
    order: 1
  },
  {
    _id: 'service-burnout',
    _type: 'service',
    title: 'Burnout Recovery',
    description: 'Rebuild your energy and rediscover your purpose without burning it all down. Starting with rest and working toward a routine that doesn\'t break you again.',
    bulletPoints: [
      'Rest and recovery planning',
      'Boundary setting',
      'Rebuilding sustainable routines'
    ],
    imagePath: 'src/assets/images/services/burnout_recovery_banner_1776545703294.png',
    order: 2
  },
  {
    _id: 'service-transitions',
    _type: 'service',
    title: 'Life Transitions',
    description: 'Support through career shifts, loss, and the in-between moments. The big life moments that leave you feeling unsteady.',
    bulletPoints: [
      'Navigating uncertainty',
      'Identity and confidence rebuilding',
      'Creating stability in change'
    ],
    imagePath: 'src/assets/images/services/life_transitions_banner_1776545720609.png',
    order: 3
  },
  {
    _id: 'service-mindful',
    _type: 'service',
    title: 'Mindful Living',
    description: 'Daily habits and intentional living for busy lives. Enjoy your days instead of just getting through them.',
    bulletPoints: [
      'Daily habits and routines',
      'Healthy boundaries',
      'Intentional living practices'
    ],
    imagePath: 'src/assets/images/services/mindful_living_banner_1776545736355.png',
    order: 4
  }
];

const programs = [
  {
    _id: 'program-calm-collective',
    _type: 'program',
    name: 'Calm Collective',
    type: 'Group Program',
    price: '$899',
    tagline: 'Learn alongside others while receiving individual guidance tailored to you.',
    features: [
      '8 Weekly Group Calls (Max 6 People)',
      'Private Community Access',
      'Two 1:1 Check-Ins',
      'Meditation Library',
      'Weekly Exercises',
      '3 Months Extended Access'
    ],
    order: 1
  },
  {
    _id: 'program-reset-restore',
    _type: 'program',
    name: 'Reset & Restore',
    type: '1:1 Premium',
    price: '$2,999',
    tagline: 'Deep, personalized work to completely transform your relationship with stress.',
    features: [
      '12 Weekly 1-Hour Sessions',
      'Personalized Toolkit',
      'Custom Meditation Recordings',
      'Weekday Text Support',
      'Sustainability Plan',
      'Lifetime Session Recordings'
    ],
    order: 2
  }
];

const testimonials = [
  {
    _id: 'testimonial-sarah',
    _type: 'testimonial',
    name: 'Sarah Silos',
    jobTitle: 'Marketing Director',
    quote: 'I used to lie awake replaying work conversations. Now I actually sleep through the night. Maya helped me find calm in the chaos.',
    isFeatured: true,
    order: 1
  },
  {
    _id: 'testimonial-elena',
    _type: 'testimonial',
    name: 'Elena Azalea',
    jobTitle: 'Marketing Director',
    quote: 'Going through my divorce felt impossible while managing everything else. Maya helped me rebuild my confidence and create space for what truly mattered.',
    isFeatured: true,
    order: 2
  },
  {
    _id: 'testimonial-mika',
    _type: 'testimonial',
    name: 'Mika Wazowski',
    jobTitle: 'Sales Manager',
    quote: 'I thought burnout was just part of entrepreneurship. Maya taught me that boundaries actually make you more effective.',
    isFeatured: true,
    order: 3
  }
];

const posts = [
  {
    _id: 'post-tired-vs-burnout',
    _type: 'post',
    title: 'The difference between tired and burned out',
    slug: { _type: 'slug', current: 'tired-vs-burned-out' },
    excerpt: 'Everyone says they\'re burned out. But there\'s a real difference between needing a weekend off and needing a fundamental change.',
    category: 'Burnout',
    date: '2025-03-28',
    readTime: '6 min read',
    imagePath: 'src/assets/images/services/journal_burnout_woman_1776547684317.png'
  },
  {
    _id: 'post-body-score',
    _type: 'post',
    title: 'Your body keeps the score even when you\'re fine',
    slug: { _type: 'slug', current: 'body-keeps-score' },
    excerpt: 'Stress doesn\'t always look like stress. Sometimes it shows up as a stiff neck, a short temper, or a 3am wake-up.',
    category: 'Stress',
    date: '2025-03-21',
    readTime: '5 min read',
    imagePath: 'src/assets/images/services/journal_stress_woman_1776547699202.png'
  }
];

// ---------------------------------------------------------
// MAIN MIGRATION FUNCTION
// ---------------------------------------------------------

async function runMigration() {
  if (!process.env.SANITY_API_TOKEN) {
    console.error('❌ Error: SANITY_API_TOKEN is missing in .env');
    process.exit(1);
  }

  console.log('🚀 Starting content migration to Sanity...');

  // 1. Migrate Services
  for (const s of services) {
    console.log(`📦 Migrating Service: ${s.title}...`);
    const img = await uploadImage(s.imagePath);
    await client.createOrReplace({
      ...s,
      image: img,
      imagePath: undefined // clean up
    });
  }

  // 2. Migrate Programs
  for (const p of programs) {
    console.log(`📦 Migrating Program: ${p.name}...`);
    await client.createOrReplace(p);
  }

  // 3. Migrate Testimonials
  for (const t of testimonials) {
    console.log(`📦 Migrating Testimonial: ${t.name}...`);
    await client.createOrReplace(t);
  }

  // 4. Migrate Posts
  for (const p of posts) {
    console.log(`📦 Migrating Post: ${p.title}...`);
    const img = await uploadImage(p.imagePath);
    await client.createOrReplace({
      ...p,
      mainImage: img,
      imagePath: undefined
    });
  }

  console.log('✅ Migration completed successfully!');
}

runMigration().catch(err => {
  console.error('🔥 Migration failed:', err);
  process.exit(1);
});
