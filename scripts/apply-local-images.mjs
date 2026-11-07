import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const client = new MongoClient(process.env.MONGODB_URI);

async function main() {
  await client.connect();
  const db = client.db();
  console.log('Connected to MongoDB:', db.databaseName);

  // 1. Update Products in MongoDB
  const productImages = {
    'aurora-solitaire-pendant': ['/images/products/aurora-solitaire-pendant.jpg'],
    'verona-baroque-pearl-drops': ['/images/products/verona-baroque-pearl-drops.jpg'],
    'sovereign-ribbed-gold-cuff': ['/images/products/sovereign-ribbed-gold-cuff.jpg'],
    'celestial-pave-eternity-band': ['/images/products/celestial-pave-eternity-band.jpg'],
    'crimson-dynasty-enamel-bangle': ['/images/products/crimson-dynasty-enamel-bangle.jpg'],
    'seoul-geometric-threader-earrings': ['/images/products/seoul-geometric-threader-earrings.jpg'],
    'monarch-filigree-hair-pin': ['/images/products/monarch-filigree-hair-pin.jpg'],
    'atelier-roman-signet-ring': ['/images/products/atelier-roman-signet-ring.jpg'],
  };

  for (const [slug, images] of Object.entries(productImages)) {
    const res = await db.collection('products').updateOne(
      { slug },
      { $set: { images } }
    );
    console.log(`Product ${slug}: updated ${res.modifiedCount}`);
  }

  // 2. Update Categories in MongoDB
  const categoryImages = {
    'necklaces': '/images/categories/necklaces.jpg',
    'earrings': '/images/categories/earrings.jpg',
    'bracelets': '/images/categories/bracelets.jpg',
    'rings': '/images/categories/rings.jpg',
    'enamel-bangles': '/images/categories/enamel-bangles.jpg',
    'korean-earrings': '/images/categories/fine-sets.jpg',
    'hair-accessories': '/images/categories/hair-accessories.jpg',
  };

  for (const [slug, image] of Object.entries(categoryImages)) {
    const res = await db.collection('categories').updateOne(
      { slug },
      { $set: { image } }
    );
    console.log(`Category ${slug}: updated ${res.modifiedCount}`);
  }

  // 3. Update Collections in MongoDB
  const collectionImages = {
    'royal-burgundy-edit': {
      image: '/images/collections/royal-burgundy-edit.jpg',
      bannerImage: '/images/collections/royal-burgundy-edit-banner.jpg',
    },
    'eternal-gold': {
      image: '/images/collections/eternal-gold.jpg',
      bannerImage: '/images/collections/eternal-gold-banner.jpg',
    },
    'evening-radiance': {
      image: '/images/collections/evening-radiance.jpg',
      bannerImage: '/images/collections/evening-radiance-banner.jpg',
    },
    'heritage-solitaire': {
      image: '/images/collections/heritage-solitaire.jpg',
      bannerImage: '/images/collections/heritage-solitaire-banner.jpg',
    },
  };

  for (const [slug, imgs] of Object.entries(collectionImages)) {
    const res = await db.collection('collections').updateOne(
      { slug },
      { $set: imgs }
    );
    console.log(`Collection ${slug}: updated ${res.modifiedCount}`);
  }

  // 4. Update Homepage CMS in MongoDB
  await db.collection('homepage').updateOne(
    {},
    {
      $set: {
        'hero.image': '/images/editorial/hero-campaign.jpg',
        'editorialBanner.image': '/images/editorial/craftsmanship-banner.jpg',
      },
    }
  );
  console.log('Homepage CMS updated');

  await client.close();
  console.log('All MongoDB documents updated to local high-quality images!');
}

main().catch(console.error);
