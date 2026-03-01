import './style.css'

document.addEventListener('DOMContentLoaded', () => {

  // ========== Scroll Progress Bar ==========
  const scrollProgress = document.createElement('div');
  scrollProgress.classList.add('scroll-progress');
  document.body.prepend(scrollProgress);

  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    scrollProgress.style.width = ((scrollTop / docHeight) * 100) + '%';
  }, { passive: true });

  // ========== Cursor Follower ==========
  const cursorFollower = document.createElement('div');
  cursorFollower.classList.add('cursor-follower');
  document.body.appendChild(cursorFollower);

  let cursorX = 0, cursorY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
  });

  (function animateCursor() {
    followerX += (cursorX - followerX - 16) * 0.15;
    followerY += (cursorY - followerY - 16) * 0.15;
    cursorFollower.style.transform = `translate(${followerX}px, ${followerY}px)`;
    requestAnimationFrame(animateCursor);
  })();

  document.addEventListener('mouseover', (e) => {
    const target = e.target;
    if (
      target.tagName === 'BUTTON' || target.tagName === 'A' ||
      target.closest('button') || target.closest('a') ||
      target.closest('.service-card') || target.closest('.glass-panel')
    ) {
      cursorFollower.classList.add('hovering');
    } else {
      cursorFollower.classList.remove('hovering');
    }
  });

  // ========== EN / AR Full Page Translation ==========
  const translations = {
    en: {
      // Nav
      'nav-services': 'Services',
      'nav-network': 'Network',
      'nav-tracking': 'Tracking',
      'nav-about': 'About Us',
      'nav-cta': 'Get an Instant Quote',
      // Hero
      'hero-badge': 'Vision 2030 Ready Logistics',
      'hero-h1-1': 'SEAMLESS CUSTOMS',
      'hero-h1-2': 'ZERO DELAYS',
      'hero-subtitle': 'Seamless. Secure. Swift. The premier freight forwarding partner for Saudi Importers and Exporters.',
      'hero-cta-1': 'Get an Instant Quote →',
      'hero-cta-2': '🔍 Track a Shipment',
      // Metrics
      'metric-1': 'Deliveries Across the Globe',
      'metric-2': 'Countries — Global Presence',
      'metric-3': 'Years of Excellence',
      'metric-4': 'Trusted Partners',
      // Services
      'services-h2': 'What We Move. How We Protect It.',
      'services-sub': 'Every service built around one outcome — your cargo arrives on time, cleared, and cost-controlled.',
      // Service Cards
      'svc-1-h': 'Ocean Freight',
      'svc-1-p': 'FCL & LCL handled end-to-end. No demurrage surprises. Guaranteed container space, even in peak seasons.',
      'svc-2-h': 'Air Cargo',
      'svc-2-p': 'Time-critical shipments delivered fast. Direct airline access. Your cargo moves the same day it clears.',
      'svc-3-h': 'Land Transport',
      'svc-3-p': 'GCC-wide road freight with pre-cleared border docs. No holds. No delays at any crossing.',
      'svc-4-h': 'Project Cargo',
      'svc-4-p': 'Oversized, heavy, or fragile — handled with precision. Zero downtime on your infrastructure projects.',
      'svc-5-h': 'Warehousing & 3PL',
      'svc-5-p': 'Store smarter. Real-time inventory. No stock-outs, no capital tied up in excess stock.',
      'svc-6-h': 'Supply Chain Consulting',
      'svc-6-p': 'We find where your logistics is bleeding money — and fix it. Faster throughput, lower landed costs.',
      'svc-7-h': 'Exhibition Logistics',
      'svc-7-p': 'Trade show freight delivered port-to-floor. Your stand is set up before competitors even land.',
      'svc-8-h': 'Customs Clearance',
      'svc-8-p': 'Saudi-licensed brokers. ZATCA pre-vetted. Your cargo released at the first inspection — every time.',
      'svc-9-h': 'Cargo Insurance',
      'svc-9-p': 'High-value shipments fully covered. One claim process. No disputes. Your capital stays protected.',
      'svc-10-h': 'Compliance Advisory',
      'svc-10-p': 'Know before you ship. We flag KSA import risks upfront so you never face a fine or seizure.',
      'svc-11-h': 'NVOCC Ocean Capacity',
      'svc-11-p': 'Guaranteed space at fixed rates — even when the market peaks. No last-minute reroutes.',
      'svc-12-h': 'Container Trading',
      'svc-12-p': 'Buy or sell marine containers at market value. Fast turnaround. Vetted stock only.',
      // Testimonials
      'testimonials-badge': 'Real Results',
      'testimonials-h2': 'What Our Clients Actually Say',
      'testimonials-sub': 'Not marketing. Real feedback from Saudi importers and exporters.',
      // Testimonial cards
      't1-quote': '"Cleared in Jeddah 3 days ahead of schedule. No extra fees, no surprises. BeJoice knows Saudi customs better than anyone."',
      't1-name': 'Ahmed Al-Farsi',
      't1-role': 'Logistics Manager, TechCorp KSA',
      't2-quote': '"18% cut in shipping costs — same quarter we switched. Their consolidation model eliminated the empty space we were paying for."',
      't2-name': 'Sarah Jenkins',
      't2-role': 'Procurement Director, Global Build',
      't3-quote': '"Vision 2030 deadlines don\'t move. BeJoice is the only forwarder we trust when the timeline is non-negotiable."',
      't3-name': 'Khalid Bin Salman',
      't3-role': 'Operations Head, Future City Dev',
      // About specialties
      'spec-1-h': 'Saudi Experts Only',
      'spec-1-p': 'We live KSA regulations. Your shipment is pre-cleared, compliant, and moving — before it arrives.',
      'spec-2-h': 'No Delays. Ever.',
      'spec-2-p': 'Pre-docking clearance. Zero detention fees. Your cargo releases the moment it hits port.',
      'spec-3-h': 'Your Cargo is Covered',
      'spec-3-p': 'Full insurance on every shipment. Something goes wrong — you\'re compensated. Fast.',
      // USP
      'usp-badge': 'Why BeJoice',
      'usp-h2': 'The BeJoice\nCompliance Edge',
      'usp-p': 'Most delays aren\'t shipping problems — they\'re compliance problems. We fix the paperwork before it costs you.',
      'usp-tagline': '200+ Saudi businesses. Zero customs penalties. Every year.',
      'usp-1-h': 'Pre-Cleared Before Arrival',
      'usp-1-p': 'Documents audited before the vessel docks. No holds at Riyadh or Jeddah.',
      'usp-2-h': 'Port Congestion Bypass',
      'usp-2-p': 'We reroute in real time. You never pay a single day of detention fees.',
      'usp-3-h': 'Live Shipment Tracking',
      'usp-3-p': 'Every milestone visible in real time. Know exactly where your cargo is — always.',
      'usp-4-h': 'GCC-Wide Liability Cover',
      'usp-4-p': 'Full insurance on every cross-border mile. One point of contact for any claim.',
      // About
      // Certifications
      'cert-badge': 'Accredited & Certified',
      'cert-h2': 'Globally Recognised.\nSaudi Compliant.',
      'cert-sub': 'Our certifications aren\'t badges — they\'re proof we\'ve been audited and cleared by the bodies that matter.',
      'cert-active': 'Active',
      'cert-1-tag': 'Saudi Authority', 'cert-1-h': 'ZATCA Certified', 'cert-1-p': 'Registered with Saudi\'s tax & customs authority. Your shipments clear without documentation delays.',
      'cert-2-tag': 'Quality Management', 'cert-2-h': 'ISO 9001:2015', 'cert-2-p': 'Internationally audited quality system. Consistent, error-free freight handling on every single order.',
      'cert-3-tag': 'Freight Forwarders', 'cert-3-h': 'FIATA Member', 'cert-3-p': 'Part of the global freight forwarding body representing 40,000+ companies across 150+ countries.',
      'cert-4-tag': 'Air Cargo', 'cert-4-h': 'IATA Accredited', 'cert-4-p': 'Direct access to 290+ airlines. Priority handling. Your air cargo moves without middlemen.',
      'cert-5-tag': 'Customs Security', 'cert-5-h': 'AEO Authorised', 'cert-5-p': 'Fewer inspections. Faster clearance. Priority lanes at all GCC ports — for every shipment we touch.',
      'cert-6-tag': 'Saudi Standards', 'cert-6-h': 'SASO Compliant', 'cert-6-p': 'All goods verified against Saudi import standards before they ship. Zero risk of rejection at the border.',
      'cert-trust-1': '100% Regulatory Compliant', 'cert-trust-2': 'Audited Annually', 'cert-trust-3': 'Vision 2030 Aligned', 'cert-trust-4': 'GCC-Wide Coverage',
      // About
      'about-h2': 'Logistics = Your Profit.',
      'about-p': 'Every delayed shipment costs you money. We remove that risk. Saudi ports, GCC borders, ZATCA clearance — handled. You focus on your business. We handle the rest.',
      // Tracking
      'tracking-h3': 'Where Is Your Shipment?',
      'tracking-p': 'Enter your BOL or Container Number. Get live status, port position, and ZATCA clearance stage — instantly.',
      'tracking-placeholder': 'BOL or Container Number...',
      'tracking-btn': 'Track Now',
      // Contact
      'contact-h2': 'Get a Quote in 60 Seconds.',
      'contact-sub': 'Tell us your route. We\'ll tell you the cost, the timeline, and how we protect your cargo.',
      'contact-name': 'Your Name',
      'contact-email': 'Business Email',
      'contact-company': 'Company Name',
      'contact-message': 'Shipment details — what, where, when...',
      'contact-btn': 'Get My Free Quote',
      // Footer
      'footer-brand-p': 'Saudi Arabia\'s freight partner for importers and exporters who can\'t afford delays. ZATCA-cleared. GCC-covered. Always on time.',
      'footer-links-h': 'Links',
      'footer-link-home': 'Home',
      'footer-link-about': 'About',
      'footer-link-services': 'Gallery / Services',
      'footer-link-contact': 'Contact',
      'footer-office-h': 'Office',
    },
    ar: {
      // Nav
      'nav-services': 'الخدمات',
      'nav-network': 'الشبكة',
      'nav-tracking': 'التتبع',
      'nav-about': 'من نحن',
      'nav-cta': 'احصل على عرض فوري',
      // Hero
      'hero-badge': 'لوجستيات جاهزة لرؤية 2030',
      'hero-h1-1': 'جمارك سلسة',
      'hero-h1-2': 'بلا تأخير',
      'hero-subtitle': 'سلاسة. أمان. سرعة. الشريك الأول في الشحن الدولي للمستوردين والمصدرين في المملكة العربية السعودية.',
      'hero-cta-1': 'احصل على عرض فوري ←',
      'hero-cta-2': '🔍 تتبع شحنتك',
      // Metrics
      'metric-1': 'عمليات توصيل حول العالم',
      'metric-2': 'دولة — حضور عالمي',
      'metric-3': 'سنوات من التميز',
      'metric-4': 'شريك موثوق',
      // Services
      'services-h2': 'لوجستيات استراتيجية قائمة على عائد الاستثمار',
      'services-sub': 'مصممة للقضاء على تأخيرات الموانئ وحماية هوامشك وضمان الامتثال الكامل للجمارك السعودية.',
      // Service Cards
      'svc-1-h': 'شحن بحري عالي العائد',
      'svc-1-p': 'تعظيم كفاءة الحاوية وتقليل رسوم التأخير لحماية أرباحك في الرحلات الطويلة.',
      'svc-2-h': 'شحن جوي سريع',
      'svc-2-p': 'عندما تعني كل ساعة تأخير خسارة في الإيرادات. لوجستيات ذات أولوية عالية للبضائع الحساسة للوقت.',
      'svc-3-h': 'نقل بري آمن عبر الحدود',
      'svc-3-p': 'عبور سريع لحدود دول الخليج مع وثائق التخليص المسبق لضمان عدم توقف شحناتك.',
      'svc-4-h': 'حماية الأصول والشحن المشروع',
      'svc-4-p': 'معالجة متخصصة للمعدات الرأسمالية الكبيرة. نقلل المخاطر التقنية لضمان استمرارية مشاريعك.',
      'svc-5-h': 'إدارة المخزون الذكي وخدمات اللوجستيات',
      'svc-5-p': 'تخفيض تكاليف التخزين عبر تخزين استراتيجي وتحكم فوري في المخزون للحد من النقص والأموال المجمدة.',
      'svc-6-h': 'ربحية سلسلة التوريد',
      'svc-6-p': 'تحديد الاختناقات الخفية. نُعيد هندسة سلسلة توريدك لتعظيم السيولة والميزة التنافسية في السوق السعودي.',
      'svc-7-h': 'عائد المعارض وفعاليات التجارة',
      'svc-7-p': 'تنفيذ مثالي للفعاليات التجارية السعودية. نضمن أن عروضك ومخزونك جاهز للعرض قبل منافسيك.',
      'svc-8-h': 'سرعة التخليص الجمركي',
      'svc-8-p': 'خبرة في أنظمة KSA لضمان الإفراج الفوري عن البضائع. نتجاوز اختناقات الموانئ ونلغي تكاليف الاحتجاز الخفية.',
      'svc-9-h': 'استراتيجية حماية رأس المال',
      'svc-9-p': 'تخفيف شامل للمخاطر على البضائع عالية القيمة. حماية استثماراتك الرأسمالية من مخاطر العبور.',
      'svc-10-h': 'استشارات الامتثال الاستراتيجية',
      'svc-10-p': 'تخفيف مخاطر التنظيم بإرشاد استباقي على قوانين التجارة السعودية. حماية سلسلة توريدك من التغييرات المستمرة.',
      'svc-11-h': 'طاقة بحرية مرنة (NVOCC)',
      'svc-11-p': 'حلول بحرية مرنة توفر مساحة ثابتة للناقل وتسعيراً متوقعاً حتى في ظل تقلبات سلسلة التوريد العالمية.',
      'svc-12-h': 'تداول أصول الحاويات',
      'svc-12-p': 'شراء أو تصفية معدات شحن بحري بثقة. تداول حاويات عالي المواصفات يناسب متطلباتك التشغيلية أو التخزينية.',
      // Testimonials
      'testimonials-badge': 'نجاح عملائنا',
      'testimonials-h2': 'موثوق من قبل رواد الصناعة',
      'testimonials-sub': 'يمثل عملاؤنا قمة التجارة والتصنيع العالمي.',
      // Testimonial cards
      't1-quote': '"خلّصت بيجويس شحنتنا في جدة بسرعة 3 أيام أكثر من مزودنا السابق. خبرتهم في ZATCA لا مثيل لها."',
      't1-name': 'أحمد الفارسي',
      't1-role': 'مدير لوجستيات، تك كورب KSA',
      't2-quote': '"توقفنا عن دفع ثمن المساحة الفارغة. وفّر لنا دمج الشحن البحري 18% من تكاليف الشحن في هذا الربع وحده."',
      't2-name': 'سارة جينكينز',
      't2-role': 'مدير المشتريات، جلوبال بيلد',
      't3-quote': '"عندما يكون لدينا شحن جوي عاجل لمشاريع رؤية 2030، بيجويس هو الشريك الوحيد الذي نثق به للتسليم في الوقت المحدد."',
      't3-name': 'خالد بن سلمان',
      't3-role': 'رئيس العمليات، مطوّر مدينة المستقبل',
      // About specialties
      'spec-1-h': 'خبراء السوق السعودي فقط',
      'spec-1-p': 'نعيش اللوائح السعودية. شحنتك جاهزة للتخليص قبل وصولها.',
      'spec-2-h': 'لا تأخير. أبداً.',
      'spec-2-p': 'تخليص مسبق قبل الرسو. صفر رسوم احتجاز. بضاعتك تتحرك فور وصولها للميناء.',
      'spec-3-h': 'شحنتك مؤمّنة',
      'spec-3-p': 'تأمين كامل على كل شحنة. إذا حدث خطأ — تعويضك سريع وبلا جدال.',
      // USP
      'usp-badge': 'ميزة الامتثال',
      'usp-h2': 'ميزة الامتثال لدى BeJoice',
      'usp-p': 'نحن لا نشحن البضائع فحسب — بل نزيل الاحتكاك التنظيمي الذي يضر بأرباحك. نعالج نقاط الألم قبل أن تؤثر على ميزانيتك.',
      'usp-tagline': 'موثوق به من قبل أكثر من 200 شركة سعودية. نوصل اليقين في كل ميل.',
      'usp-1-h': 'استراتيجية جمارك بلا تأخير',
      'usp-1-p': 'امتثال مسبق لموانئ الرياض وجدة. لا مفاجآت عند التخليص الجمركي.',
      'usp-2-h': 'تخفيف اختناقات الموانئ',
      'usp-2-p': 'إعادة توجيه فورية لتجنب رسوم الاحتجاز وتأخيرات ازدحام الموانئ.',
      'usp-3-h': 'تتبع شفاف لعائد الاستثمار',
      'usp-3-p': 'كل شحنة مرتبطة بأهداف عملك مع لوحات تحكم في الوقت الفعلي.',
      'usp-4-h': 'لوجستيات خليجية خالية من المخاطر',
      'usp-4-p': 'حماية كاملة من المسؤولية وتأمين بحدود عالية على كل ميل عابر للحدود.',
      // About
      // Certifications
      'cert-badge': 'معتمد ومرخص',
      'cert-h2': 'معترف به عالمياً. متوافق مع السعودية.',
      'cert-sub': 'كل شهادة نحملها هي التزام — بالدقة والامتثال وحماية شحنتك.',
      'cert-active': 'ساري',
      'cert-1-tag': 'هيئة سعودية', 'cert-1-h': 'معتمد من هيئة الزكاة والضريبة والجمارك', 'cert-1-p': 'مسجل بالكامل ومتوافق مع لوائح هيئة الزكاة والضريبة والجمارك. جميع الشحنات تمر عبر الموانئ السعودية بدون أي مخاطر وثائقية.',
      'cert-2-tag': 'إدارة الجودة', 'cert-2-h': 'ISO 9001:2015', 'cert-2-p': 'المعيار الدولي لأنظمة إدارة الجودة — يضمن عمليات معالجة بضائع عالية الجودة ومتسقة في كل شحنة ندير.',
      'cert-3-tag': 'وكلاء الشحن', 'cert-3-h': 'عضو FIATA', 'cert-3-p': 'عضو معتمد في الاتحاد الدولي لجمعيات وكلاء الشحن — الهيئة العالمية التي تمثل أكثر من 40,000 شركة.',
      'cert-4-tag': 'الشحن الجوي', 'cert-4-h': 'معتمد من IATA', 'cert-4-p': 'معترف به من الاتحاد الدولي للنقل الجوي لمناولة الشحن الجوي — يتيح الحجز المباشر مع أكثر من 290 شركة طيران.',
      'cert-5-tag': 'أمن الجمارك', 'cert-5-h': 'مشغل اقتصادي معتمد AEO', 'cert-5-p': 'وضع المشغل الاقتصادي المعتمد — المعيار الذهبي في أمن سلسلة التوريد العالمية. فحوصات أقل وتخليص جمركي أسرع.',
      'cert-6-tag': 'المعايير السعودية', 'cert-6-h': 'متوافق مع SASO', 'cert-6-p': 'امتثال كامل لهيئة المواصفات والمقاييس والجودة السعودية — يضمن تلبية جميع البضائع لمتطلبات الاستيراد في المملكة.',
      'cert-trust-1': '100% متوافق مع اللوائح', 'cert-trust-2': 'مدقق سنوياً', 'cert-trust-3': 'متوافق مع رؤية 2030', 'cert-trust-4': 'تغطية خليجية شاملة',
      // About
      'about-h2': 'اللوجستيات = ربحك.',
      'about-p': 'كل شحنة متأخرة تكلفك مالاً. نحن نزيل هذا الخطر. موانئ سعودية، حدود خليجية، تخليص جمركي — كلها في أيدينا. ركّز على عملك. نحن نتولى الباقي.',
      // Tracking
      'tracking-h3': 'تتبع شحنتك',
      'tracking-p': 'أدخل رقم بوليصة الشحن (BOL) أو رقم الحاوية لتلقي تحديثات فورية وتتبع تخليص ZATCA.',
      'tracking-placeholder': 'أدخل رقم BOL أو الحاوية...',
      'tracking-btn': 'تتبع الآن',
      // Contact
      'contact-h2': 'هل أنت مستعد لتحسين سلسلة التوريد؟',
      'contact-sub': 'انضم إلى كبرى شركات التجارة السعودية التي تثق في بيجويس.',
      'contact-name': 'اسمك',
      'contact-email': 'البريد الإلكتروني للعمل',
      'contact-company': 'اسم الشركة',
      'contact-message': 'أخبرنا عن متطلبات الشحن لديك...',
      'contact-btn': 'طلب عرض مخصص',
      // Footer
      'footer-brand-p': 'الشريك اللوجستي المدفوع بعائد الاستثمار للمستوردين والمصدرين السعوديين. نزيل اختناقات الموانئ والتأخيرات التنظيمية لحماية هوامش ربحك.',
      'footer-links-h': 'روابط',
      'footer-link-home': 'الرئيسية',
      'footer-link-about': 'من نحن',
      'footer-link-services': 'المعرض / الخدمات',
      'footer-link-contact': 'تواصل معنا',
      'footer-office-h': 'المكتب',
    }
  };

  function setLanguage(lang) {
    // Swap textContent for all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.textContent = translations[lang][key];
      }
    });

    // Swap placeholder for inputs/textareas with data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[lang] && translations[lang][key] !== undefined) {
        el.setAttribute('placeholder', translations[lang][key]);
      }
    });

    // Update document direction and lang
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update active button state
    const btnEn = document.getElementById('lang-en');
    const btnAr = document.getElementById('lang-ar');
    if (btnEn && btnAr) {
      btnEn.classList.toggle('lang-active', lang === 'en');
      btnAr.classList.toggle('lang-active', lang === 'ar');
    }
  }

  const langBtnEn = document.getElementById('lang-en');
  const langBtnAr = document.getElementById('lang-ar');
  if (langBtnEn) langBtnEn.addEventListener('click', () => setLanguage('en'));
  if (langBtnAr) langBtnAr.addEventListener('click', () => setLanguage('ar'));

  // ========== Tracking Form Handler ==========
  const trackingForm = document.getElementById('tracking-form');
  if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = document.getElementById('tracking-input');
      if (input && input.value.trim()) {
        alert(`Tracking ${input.value.trim()}... (This would connect to a real tracking API)`);
      }
    });
  }

  const navbar = document.querySelector('.navbar');
  const parallaxBgs = document.querySelectorAll('.parallax-bg');
  const reveals = document.querySelectorAll('.reveal');

  // Auto-hide navbar on scroll
  let lastScrollY = 0;
  let ticking = false;

  const handleScroll = () => {
    let scrollY = window.pageYOffset;

    // Navbar: show on top, hide when scrolling down, show when scrolling up
    if (scrollY > 100) {
      navbar.classList.add('scrolled');
      if (scrollY > lastScrollY && scrollY > 200) {
        // Scrolling DOWN — hide the navbar
        navbar.classList.add('navbar-hidden');
      } else {
        // Scrolling UP — show the navbar
        navbar.classList.remove('navbar-hidden');
      }
    } else {
      navbar.classList.remove('scrolled');
      navbar.classList.remove('navbar-hidden');
    }

    lastScrollY = scrollY;

    // Move parallax backgrounds
    parallaxBgs.forEach((bg) => {
      let parentSection = bg.parentElement;
      let offsetTop = parentSection.offsetTop;
      let offsetHeight = parentSection.offsetHeight;

      if (scrollY >= offsetTop - window.innerHeight && scrollY <= offsetTop + offsetHeight) {
        let diff = scrollY - offsetTop;
        bg.style.transform = `translateY(${diff * 0.4}px)`;
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Init Check

  // Intersection Observer for scroll reveal animations
  const revealOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  };

  const revealObserver = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    });
  }, revealOptions);

  reveals.forEach(reveal => {
    revealObserver.observe(reveal);
  });

  // ========== Animated Counter for About Section ==========
  function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16); // ~60fps
    const suffix = element.dataset.suffix || '';

    function updateCounter() {
      start += increment;
      if (start >= target) {
        element.textContent = target.toLocaleString() + suffix;
        return;
      }
      element.textContent = Math.floor(start).toLocaleString() + suffix;
      requestAnimationFrame(updateCounter);
    }
    updateCounter();
  }

  // Observe the metrics strip and trigger counting when visible
  const metricsStrip = document.querySelector('.metrics-strip');
  if (metricsStrip) {
    const metricsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = metricsStrip.querySelectorAll('.counter-number');
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            animateCounter(counter, target, 2500);
          });
          metricsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    metricsObserver.observe(metricsStrip);
  }

  // Also keep counter for any remaining about-stats if present
  const statsSection = document.querySelector('.about-stats');
  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const counters = statsSection.querySelectorAll('.counter-number');
          counters.forEach(counter => {
            const target = parseInt(counter.dataset.target, 10);
            animateCounter(counter, target, 2500);
          });
          statsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    statsObserver.observe(statsSection);
  }

  // Smooth scrolling for Anchor tags
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

});


// ========== Quote Modal (global scope so onclick="" works) ==========
let quoteStep = 1;
const quoteTotalSteps = 4;
const quoteData = { shippingType: '', transportMode: '' };

function openQuoteModal() {
  quoteStep = 1;
  document.querySelectorAll('.quote-step').forEach(s => s.classList.remove('active'));
  const s1 = document.getElementById('qstep-1');
  if (s1) s1.classList.add('active');
  const progressBar = document.getElementById('quote-progress-bar');
  const nav = document.getElementById('quote-modal-nav');
  if (progressBar) progressBar.style.display = '';
  if (nav) nav.style.display = '';
  updateQuoteNav();
  const overlay = document.getElementById('quote-modal-overlay');
  if (overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuoteModal() {
  const overlay = document.getElementById('quote-modal-overlay');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
  setTimeout(() => {
    quoteStep = 1;
    document.querySelectorAll('.quote-step').forEach(s => s.classList.remove('active'));
    const s1 = document.getElementById('qstep-1');
    if (s1) s1.classList.add('active');
    document.querySelectorAll('.quote-option-btn').forEach(b => b.classList.remove('selected'));
    const progressBar = document.getElementById('quote-progress-bar');
    const nav = document.getElementById('quote-modal-nav');
    if (progressBar) progressBar.style.display = '';
    if (nav) nav.style.display = '';
    updateQuoteNav();
  }, 300);
}

function selectOption(btn, field) {
  const grid = btn.closest('.quote-options-grid');
  if (grid) grid.querySelectorAll('.quote-option-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  quoteData[field] = btn.dataset.value;
  setTimeout(() => quoteNext(), 280);
}

function quoteNext() {
  if (quoteStep >= quoteTotalSteps) {
    showQuoteStep(5);
    const progressBar = document.getElementById('quote-progress-bar');
    const nav = document.getElementById('quote-modal-nav');
    if (progressBar) progressBar.style.display = 'none';
    if (nav) nav.style.display = 'none';
    return;
  }
  quoteStep++;
  showQuoteStep(quoteStep);
  updateQuoteNav();
}

function quoteBack() {
  if (quoteStep <= 1) return;
  quoteStep--;
  showQuoteStep(quoteStep);
  updateQuoteNav();
}

function showQuoteStep(n) {
  document.querySelectorAll('.quote-step').forEach(s => s.classList.remove('active'));
  const target = document.getElementById('qstep-' + n);
  if (target) target.classList.add('active');
}

function updateQuoteNav() {
  const backBtn = document.getElementById('quote-nav-back');
  const nextBtn = document.getElementById('quote-nav-next');
  const stepLabel = document.getElementById('quote-step-label');
  const stepPct = document.getElementById('quote-step-pct');
  const fill = document.getElementById('quote-progress-fill');
  const pct = Math.round((quoteStep / quoteTotalSteps) * 100);
  if (stepLabel) stepLabel.textContent = 'Step ' + quoteStep + ' of ' + quoteTotalSteps;
  if (stepPct) stepPct.textContent = pct + '%';
  if (fill) fill.style.width = pct + '%';
  if (backBtn) backBtn.classList.toggle('invisible', quoteStep === 1);
  if (nextBtn) nextBtn.textContent = quoteStep === quoteTotalSteps ? 'Submit Request' : 'Next ›';
}

// Close modal on overlay/X click
document.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('quote-modal-overlay');
  if (overlay) overlay.addEventListener('click', (e) => { if (e.target === overlay) closeQuoteModal(); });
  const closeBtn = document.getElementById('quote-modal-close');
  if (closeBtn) closeBtn.addEventListener('click', closeQuoteModal);
});

// Expose modal functions to global scope (required because main.js is a module)
window.openQuoteModal = openQuoteModal;
window.closeQuoteModal = closeQuoteModal;
window.selectOption = selectOption;
window.quoteNext = quoteNext;
window.quoteBack = quoteBack;
