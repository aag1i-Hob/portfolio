# 🚀 Portfolio Site — Next.js + Firebase

Динамик буюу агуулгаа website-аас удирддаг Portfolio сайт. Admin dashboard-аар проект, ур чадвар, мессежүүдийг удирдана.

## ✨ Онцлог

- **Portfolio**: Гоё, animated нүүр хуудас — hero, projects, skills, contact
- **Admin Dashboard**: Нэвтрэлт хамгаалалттай бүрэн CRUD удирдлага
- **Firebase Firestore**: Real-time мэдээллийн сан
- **Firebase Auth**: Аюулгүй нэвтрэх систем
- **Next.js 14 App Router**: Server components, API routes
- **TypeScript**: Бүрэн type safety
- **Responsive**: Бүх дэлгэцэнд зохицдог

---

## 📋 Шаардлага

- **Node.js** v18 болон түүнээс дээш
- **npm** эсвэл **yarn**
- **Firebase** бүртгэл (үнэгүй)

---

## 🔧 Суулгах заавар

### 1. Файл задлах

```bash
unzip portfolio-site.zip
cd portfolio-site
```

### 2. Хамаарлуудыг суулгах

```bash
npm install
```

### 3. Firebase Төсөл Үүсгэх

1. [Firebase Console](https://console.firebase.google.com) руу орно уу
2. **"Add project"** → Нэр өгнө (жишээ: `my-portfolio`)
3. Google Analytics-ийг идэвхжүүлж болно (заавал биш)

### 4. Firebase Үйлчилгээнүүд Тохируулах

#### 4a. Authentication
1. Firebase Console → **Authentication** → **Get started**
2. **Sign-in method** → **Email/Password** → идэвхжүүлнэ
3. **Users** таб → **Add user** → имэйл болон нууц үг оруулна

#### 4b. Firestore Database
1. Firebase Console → **Firestore Database** → **Create database**
2. **Start in production mode** → **Next**
3. Байршлаа сонгоно (asia-east2 = Hong Kong, ойролцоо)

#### 4c. Firestore Rules тохируулах
1. Firestore → **Rules** таб
2. `firestore.rules` файлын агуулгыг хуулж тавина:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /projects/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /skills/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /messages/{docId} {
      allow create: if true;
      allow read, update, delete: if request.auth != null;
    }
    match /config/{docId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

3. **Publish** дарна

### 5. Firebase Тохиргооны Утгуудыг Авах

#### Client-side config:
1. Firebase Console → **Project Settings** (⚙️ дүрс)
2. **General** таб → **Your apps** → **Add app** → **Web** (</>)
3. App нэр оруулна → **Register app**
4. Гарч ирсэн `firebaseConfig` объектоос утгуудыг хуулна

#### Service Account (Admin SDK):
1. **Project Settings** → **Service accounts** таб
2. **Generate new private key** → **Generate key**
3. JSON файл татагдана — **аюулгүй хадгалаарай!**

### 6. Environment Variables Тохируулах

```bash
cp .env.example .env.local
```

`.env.local` файлыг нээж утгуудыг оруулна:

```env
# Firebase Client (Project Settings > General > Your apps дээрээс авна)
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSy...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=myproject.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=myproject
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=myproject.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc...

# Firebase Admin (татсан JSON файлаас авна)
FIREBASE_ADMIN_PROJECT_ID=myproject
FIREBASE_ADMIN_CLIENT_EMAIL=firebase-adminsdk-xxxxx@myproject.iam.gserviceaccount.com
FIREBASE_ADMIN_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nMIIEv...\n-----END PRIVATE KEY-----\n"

# Бусад
ADMIN_EMAIL=admin@example.com
NEXTAUTH_SECRET=any-random-32-character-string-here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> ⚠️ **Анхаар**: `FIREBASE_ADMIN_PRIVATE_KEY` дотор `\n` нь мөр шилжилтийг заана. Хашилт `"..."` дотор байх ёстой.

### 7. Анхны Өгөгдөл (Seed) Оруулах

```bash
node scripts/seed.js
```

Энэ нь Firestore дотор дараах зүйлсийг үүсгэнэ:
- Profile мэдээлэл
- 3 жишээ проект
- 8 ур чадвар

### 8. Хөгжүүлэлтийн Сервер Ажиллуулах

```bash
npm run dev
```

Хөтөч нээгээд: **http://localhost:3000**

---

## 📁 Хавтасны Бүтэц

```
portfolio-site/
├── app/
│   ├── page.tsx                 # Нийтийн нүүр хуудас
│   ├── layout.tsx               # Root layout
│   ├── globals.css              # Глобал стилүүд + CSS variables
│   ├── admin/
│   │   ├── page.tsx             # Нэвтрэх хуудас
│   │   ├── layout.tsx           # Admin layout + sidebar
│   │   ├── dashboard/           # Тойм / статистик
│   │   ├── projects/            # Проект удирдлага
│   │   ├── skills/              # Ур чадвар удирдлага
│   │   └── messages/            # Мессеж харах
│   └── api/
│       ├── contact/route.ts     # Холбоо барих form
│       ├── projects/route.ts    # Проектийн API
│       └── skills/route.ts      # Ур чадварын API
├── components/
│   └── portfolio/
│       ├── Navbar.tsx
│       ├── HeroSection.tsx
│       ├── ProjectsSection.tsx
│       ├── SkillsSection.tsx
│       └── ContactSection.tsx
├── hooks/
│   └── useAuth.tsx              # Firebase Auth context
├── lib/
│   ├── firebase.ts              # Client Firebase
│   ├── firebase-admin.ts        # Server Firebase Admin
│   └── db.ts                    # Firestore CRUD функцүүд
├── types/
│   └── index.ts                 # TypeScript types
├── scripts/
│   └── seed.js                  # Анхны өгөгдөл оруулах
├── firestore.rules              # Firestore аюулгүйн дүрмүүд
├── .env.example                 # Env variables жишээ
└── README.md
```

---

## 🛠 Admin Dashboard ашиглах

### Нэвтрэх
**http://localhost:3000/admin** → имэйл + нууц үгийг оруулна

(Firebase Authentication дотор үүсгэсэн хэрэглэгчийн мэдээллийг ашиглана)

### Боломжууд

| Хэсэг | Боломж |
|-------|--------|
| Dashboard | Статистик, шуурхай холбоосууд |
| Проектүүд | Нэмэх, засах, устгах, featured тохируулах |
| Ур чадвар | Нэмэх, засах, категориор бүлэглэх |
| Мессежүүд | Харах, уншсан тэмдэглэх, хариу илгээх, устгах |

---

## 🌐 Деплой (Vercel)

### 1. Vercel дээр байршуулах

```bash
npm install -g vercel
vercel
```

Эсвэл [vercel.com](https://vercel.com) → "Import Git Repository"

### 2. Environment Variables нэмэх
Vercel Dashboard → Project → **Settings** → **Environment Variables**

`.env.local` дээрх бүх утгуудыг нэмнэ.

### 3. Production URL шинэчлэх
`NEXT_PUBLIC_SITE_URL` утгыг Vercel-ийн домайнаар солино:
```
NEXT_PUBLIC_SITE_URL=https://yourname.vercel.app
```

---

## 🎨 Загварыг Өөрчлөх

### Өнгө солих
`app/globals.css` файлын `:root` хэсэгт:

```css
:root {
  --accent: #6c63ff;      /* Үндсэн өнгө */
  --accent-2: #ff6584;    /* Хоёрдогч өнгө */
  --bg: #0a0a0f;          /* Дэвсгэр өнгө */
}
```

### Profile мэдээлэл шинэчлэх
Admin dashboard → эсвэл `scripts/seed.js` файлыг засаж дахин ажиллуулна.

---

## ❓ Түгээмэл Асуудлууд

**"Firebase App already initialized" алдаа**
→ Энэ нь normal, Next.js hot-reload-ийн улмаас гардаг. Алдаа биш.

**Admin page-рүү нэвтэрч чадахгүй байна**
→ Firebase Console → Authentication → Users дотор хэрэглэгч үүссэн эсэхийг шалга.

**Firestore permission denied**
→ `firestore.rules`-ийг Firebase Console дотор publish хийсэн эсэхийг шалга.

**Seed script ажиллахгүй**
→ `.env.local` файлд Admin SDK утгуудыг зөв оруулсан эсэхийг шалга.

---

## 📄 Лиценз

MIT — чөлөөтэй ашиглаж, өөрчилж болно.
