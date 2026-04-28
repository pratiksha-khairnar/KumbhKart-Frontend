// 📁 firebase/uploadProducts.ts
// ✅ Yeh script ek baar chalao — products + images Firebase par upload ho jayenge
// Run: npx ts-node firebase/uploadProducts.ts
// Zaruri: npm install firebase @types/node ts-node typescript

import { initializeApp } from 'firebase/app';
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import * as fs from 'fs';
import * as path from 'path';

// ✅ Apna config yahan paste karo
const firebaseConfig = {
  apiKey: "AIzaSyAO1N2NbpibiXRfbToMb2F_6_7_XZeIjBg",
  authDomain: "kumbh-kart.firebaseapp.com",
  projectId: "kumbh-kart",
  storageBucket: "kumbh-kart.firebasestorage.app",
  messagingSenderId: "491925309116",
  appId: "1:491925309116:web:55f37e36f76c6917fe32b9",
  measurementId: "G-9XDEGF0JBC"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// ✅ Tab names — exactly same as Firestore collection names
const VALID_TABS = ['PAPAD', 'KURDAI', 'SEVIYAN', 'UPWAS Papad', 'CHIPS', 'KHAKHRA', 'VADE', 'FRYUM'];

// ============================================================
// ✅ PRODUCTS DATA
// img field mein LOCAL image path do, jaise './images/papad1.jpg'
// Ya agar seedha URL dena hai toh img_url field use karo (neeche dekho)
// ============================================================
const PRODUCTS_TO_UPLOAD = [
  // ---- PAPAD ----
  {
    id: 'p1',
    tab: 'PAPAD',
    name: 'Ragi / Nachni / Nagli Papad',
    price: 199,
    mrp: 300,
    discount: 34,
    weight: '500gm',
    localImagePath: './images/papad/ragi-papad.jpg',   // <- apni local image path
  },
  {
    id: 'p2',
    tab: 'PAPAD',
    name: 'Makai Masala Papad (Corn Papad)',
    price: 220,
    mrp: 325,
    discount: 33,
    weight: '500gm',
    localImagePath: './images/papad/makai-papad.jpg',
  },
  {
    id: 'p3',
    tab: 'PAPAD',
    name: 'Gahu Tandul Papad',
    price: 225,
    mrp: 350,
    discount: 36,
    weight: '500gm',
    localImagePath: './images/papad/gahu-papad.jpg',
  },

  // ---- KURDAI ----
  {
    id: 'k1',
    tab: 'KURDAI',
    name: 'KURDAI / KURDAYA (Wheat-GAHU)',
    price: 175,
    mrp: 300,
    discount: 42,
    weight: '400gm',
    localImagePath: './images/kurdai/wheat-kurdai.jpg',
  },
  {
    id: 'k2',
    tab: 'KURDAI',
    name: 'Kurdai / Kurdaya (RICE-CHAWAL)',
    price: 199,
    mrp: 275,
    discount: 28,
    weight: '400gm',
    localImagePath: './images/kurdai/rice-kurdai.jpg',
  },

  // ---- SEVIYAN ----
  {
    id: 's1',
    tab: 'SEVIYAN',
    name: 'Homemade Wheat Seviyan (Shevaya)',
    price: 149,
    mrp: 250,
    discount: 40,
    weight: '400gm',
    localImagePath: './images/seviyan/wheat-seviyan.jpg',
  },

  // ---- UPWAS Papad ----
  {
    id: 'u1',
    tab: 'UPWAS Papad',
    name: 'Batata Sabudana Chakali',
    price: 175,
    mrp: 300,
    discount: 42,
    weight: '400gm',
    localImagePath: './images/upwas/sabudana-chakali.jpg',
  },

  // ---- CHIPS ----
  {
    id: 'c1',
    tab: 'CHIPS',
    name: 'Homemade Potato Chips (Batata Wafer)',
    price: 149,
    mrp: 250,
    discount: 40,
    weight: '300gm',
    localImagePath: './images/chips/potato-chips.jpg',
  },

  // ---- KHAKHRA ----
  {
    id: 'kh1',
    tab: 'KHAKHRA',
    name: 'Plain Wheat Khakhra',
    price: 149,
    mrp: 250,
    discount: 40,
    weight: '400gm',
    localImagePath: './images/khakhra/plain-khakhra.jpg',
  },

  // ---- VADE ----
  {
    id: 'v1',
    tab: 'VADE',
    name: 'Homemade Urad Dal Vade (Ready To Fry)',
    price: 199,
    mrp: 300,
    discount: 34,
    weight: '400gm',
    localImagePath: './images/vade/urad-vade.jpg',
  },

  // ---- FRYUM ----
  {
    id: 'f1',
    tab: 'FRYUM',
    name: 'Star Fryum (Ready To Fry)',
    price: 149,
    mrp: 250,
    discount: 40,
    weight: '300gm',
    localImagePath: './images/fryum/star-fryum.jpg',
  },

  // ✅ Aise aur products add karte raho same format mein...
];

// ============================================================
// ✅ MAIN UPLOAD FUNCTION
// ============================================================
async function uploadProducts() {
  console.log('🚀 Upload shuru ho raha hai...\n');

  for (const product of PRODUCTS_TO_UPLOAD) {
    // Tab validate karo
    if (!VALID_TABS.includes(product.tab)) {
      console.warn(`⚠️  Invalid tab "${product.tab}" for product ${product.id} — skip kar rahe hain`);
      continue;
    }

    try {
      let imageUrl = '';

      // ✅ Local image upload karo Firebase Storage par
      if (product.localImagePath && fs.existsSync(product.localImagePath)) {
        const imageBuffer = fs.readFileSync(product.localImagePath);
        const ext = path.extname(product.localImagePath).replace('.', '');
        const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' : `image/${ext}`;

        const storageRef = ref(storage, `products/${product.tab}/${product.id}.${ext}`);
        await uploadBytes(storageRef, imageBuffer, { contentType: mimeType });
        imageUrl = await getDownloadURL(storageRef);
        console.log(`  📸 Image upload hua: ${imageUrl}`);
      } else {
        console.warn(`  ⚠️  Image file nahi mila: ${product.localImagePath}`);
        imageUrl = ''; // placeholder
      }

      // ✅ Firestore mein product save karo
      // Collection: "products", Document ID: product.id
      const productRef = doc(collection(db, 'products'), product.id);
      await setDoc(productRef, {
        id: product.id,
        tab: product.tab,
        name: product.name,
        price: product.price,
        mrp: product.mrp,
        discount: product.discount,
        weight: product.weight,
        img: imageUrl,
        createdAt: new Date().toISOString(),
      });

      console.log(`✅ Product save hua: [${product.tab}] ${product.name}`);
    } catch (err) {
      console.error(`❌ Error for ${product.id}:`, err);
    }
  }

  console.log('\n🎉 Sab products upload ho gaye!');
  process.exit(0);
}

uploadProducts();