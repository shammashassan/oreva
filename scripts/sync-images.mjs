import fs from 'fs';
import path from 'path';
import https from 'https';
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const DOWNLOAD_MAP = [
  // Remaining Products
  {
    url: 'https://images.unsplash.com/photo-1611591475806-0302b1154848?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/products/sovereign-ribbed-gold-cuff.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'sovereign-ribbed-gold-cuff',
  },
  {
    url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/products/crimson-dynasty-enamel-bangle.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'crimson-dynasty-enamel-bangle',
  },
  {
    url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/products/seoul-geometric-threader-earrings.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'seoul-geometric-threader-earrings',
  },
  {
    url: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/products/monarch-filigree-hair-pin.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'monarch-filigree-hair-pin',
  },
  {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/products/atelier-roman-signet-ring.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'atelier-roman-signet-ring',
  },

  // Categories
  {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/categories/necklaces.jpg',
    cloudinaryFolder: 'oreva/categories',
    publicId: 'necklaces',
  },
  {
    url: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/categories/earrings.jpg',
    cloudinaryFolder: 'oreva/categories',
    publicId: 'earrings',
  },
  {
    url: 'https://images.unsplash.com/photo-1611591475806-0302b1154848?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/categories/bracelets.jpg',
    cloudinaryFolder: 'oreva/categories',
    publicId: 'bracelets',
  },
  {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/categories/rings.jpg',
    cloudinaryFolder: 'oreva/categories',
    publicId: 'rings',
  },
  {
    url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/categories/enamel-bangles.jpg',
    cloudinaryFolder: 'oreva/categories',
    publicId: 'enamel-bangles',
  },
  {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/categories/fine-sets.jpg',
    cloudinaryFolder: 'oreva/categories',
    publicId: 'fine-sets',
  },
  {
    url: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/categories/hair-accessories.jpg',
    cloudinaryFolder: 'oreva/categories',
    publicId: 'hair-accessories',
  },

  // Collections
  {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/collections/royal-burgundy-edit.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'royal-burgundy-edit',
  },
  {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1920&auto=format&fit=crop',
    localPath: 'public/images/collections/royal-burgundy-edit-banner.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'royal-burgundy-edit-banner',
  },
  {
    url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/collections/eternal-gold.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'eternal-gold',
  },
  {
    url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1920&auto=format&fit=crop',
    localPath: 'public/images/collections/eternal-gold-banner.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'eternal-gold-banner',
  },
  {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/collections/evening-radiance.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'evening-radiance',
  },
  {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1920&auto=format&fit=crop',
    localPath: 'public/images/collections/evening-radiance-banner.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'evening-radiance-banner',
  },
  {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/collections/heritage-solitaire.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'heritage-solitaire',
  },
  {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1920&auto=format&fit=crop',
    localPath: 'public/images/collections/heritage-solitaire-banner.jpg',
    cloudinaryFolder: 'oreva/collections',
    publicId: 'heritage-solitaire-banner',
  },

  // Editorial & Home Campaigns
  {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1920&auto=format&fit=crop',
    localPath: 'public/images/editorial/hero-campaign.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'hero-campaign',
  },
  {
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?q=80&w=1920&auto=format&fit=crop',
    localPath: 'public/images/editorial/craftsmanship-banner.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'craftsmanship-banner',
  },
  {
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/editorial/gender-women.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'gender-women',
  },
  {
    url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/editorial/gender-men.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'gender-men',
  },
  {
    url: 'https://images.unsplash.com/photo-1535632787350-4e68ef0ac584?q=80&w=800&auto=format&fit=crop',
    localPath: 'public/images/editorial/gift-for-her.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'gift-for-her',
  },
  {
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=800&auto=format&fit=crop',
    localPath: 'public/images/editorial/gift-anniversary.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'gift-anniversary',
  },
  {
    url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?q=80&w=800&auto=format&fit=crop',
    localPath: 'public/images/editorial/gift-bridesmaid.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'gift-bridesmaid',
  },
  {
    url: 'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?q=80&w=800&auto=format&fit=crop',
    localPath: 'public/images/editorial/gift-keepsakes.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'gift-keepsakes',
  },
  {
    url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/editorial/about-genesis.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'about-genesis',
  },
  {
    url: 'https://images.unsplash.com/photo-1611591475806-0302b1154848?q=80&w=1200&auto=format&fit=crop',
    localPath: 'public/images/editorial/about-workshop.jpg',
    cloudinaryFolder: 'oreva/editorial',
    publicId: 'about-workshop',
  },
];

// Also upload the 3 AI-generated images to Cloudinary in oreva/products:
const LOCAL_ONLY_UPLOADS = [
  {
    localPath: 'public/images/products/aurora-solitaire-pendant.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'aurora-solitaire-pendant',
  },
  {
    localPath: 'public/images/products/verona-baroque-pearl-drops.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'verona-baroque-pearl-drops',
  },
  {
    localPath: 'public/images/products/celestial-pave-eternity-band.jpg',
    cloudinaryFolder: 'oreva/products',
    publicId: 'celestial-pave-eternity-band',
  },
];

function downloadFile(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    https.get(url, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadFile(response.headers.location, dest).then(resolve).catch(reject);
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log('--- Step 1: Downloading images locally to public/images ---');
  for (const item of DOWNLOAD_MAP) {
    const dir = path.dirname(item.localPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    try {
      await downloadFile(item.url, item.localPath);
      console.log('✓ Saved local:', item.localPath);
    } catch (e) {
      console.warn('✗ Failed local download:', item.localPath, e.message);
    }
  }

  console.log('\n--- Step 2: Uploading images to Cloudinary in named folders ---');
  const allUploads = [...DOWNLOAD_MAP, ...LOCAL_ONLY_UPLOADS];
  const urlMap = {};

  for (const item of allUploads) {
    if (!fs.existsSync(item.localPath)) continue;
    try {
      const res = await cloudinary.uploader.upload(item.localPath, {
        folder: item.cloudinaryFolder,
        public_id: item.publicId,
        overwrite: true,
      });
      urlMap[item.localPath] = res.secure_url;
      console.log(`✓ Cloudinary [${item.cloudinaryFolder}]: ${res.public_id} -> ${res.secure_url}`);
    } catch (e) {
      console.warn(`✗ Cloudinary upload failed for ${item.publicId}:`, e.message);
    }
  }

  fs.writeFileSync('scripts/uploaded-urls.json', JSON.stringify(urlMap, null, 2));
  console.log('\nDone! Wrote URL mapping to scripts/uploaded-urls.json');
}

run().catch(console.error);
