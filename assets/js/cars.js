/*
  العربيات المعروضة على الموقع
  ─────────────────────────────
  عشان تضيف عربية: انسخ بلوك { ... } كامل وعدّل بياناته، وحط صورها في فولدر assets/cars/

  - photos : أول صورة هي الغلاف. الأنسب صور طولية (4:5) بعرض 800–1200 بكسل، webp أو jpg.
  - price  : الرقم بالجنيه (مثال 1850000)، أو null عشان يظهر «اسأل على واتساب».
  - status : 'available' متاحة · 'reserved' محجوزة · 'sold' اتباعت (مابتظهرش على الموقع).
  - badge  : كلمة قصيرة تظهر على الصورة، زي 'استلام فوري'.
  - post   : (اختياري) رابط منشور العربية على فيسبوك.
  - brandLatin : (اختياري) اسم الماركة بالإنجليزي، زي 'KIA'.
*/
window.AB_CARS = [
  {
    brand: 'كيا',
    brandLatin: 'KIA',
    model: 'سبورتاج',
    year: 2024,
    trim: 'أعلى فئة',
    badge: 'استلام فوري',
    specs: [
      ['الموديل', '2024'],
      ['الشاسيه', 'لونج'],
      ['اللون', 'أبيض'],
      ['الاستلام', 'فوري'],
    ],
    price: null,
    status: 'available',
    photos: ['assets/cars/sportage-2024-1.webp'],
    post: 'https://www.facebook.com/caratef/posts/pfbid0FEpPuaYkzKRSTyBMQAhhR6C4amsayJ1R1zqCRUruCnbr1GoaKZjcqc3aUBrPmHZYl',
  },
];
