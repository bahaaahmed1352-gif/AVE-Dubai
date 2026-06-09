'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Montserrat, Cormorant_Garamond } from 'next/font/google';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';
import { Compass, Phone, Menu, X, ArrowRight, Star, Clock, MapPin } from 'lucide-react';

// تفعيل الخطوط الفخمة المحددة في الهوية البصرية
const serifLuxury = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-serif-luxury',
});

const sansMinimal = Montserrat({
  subsets: ['latin'],
  weight: ['300', '400', '600'],
  variable: '--font-sans-minimal',
});

// تسجيل إضافات GSAP في بيئة المتصفح فقط
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// مصفوفة الـ 15 مشهد السينمائي الكاملة مع توقيت ظهورها ونصوصها الفاخرة
const STORYBOARD_SCENES = [
  { id: 1, start: 0, end: 6, title: "AVE DUBAI", subtitle: "A New Ritual Awaits.", desc: "The awakening of pure sensory architecture in the heart of the city.", alignment: "center" },
  { id: 2, start: 6, end: 13, title: "The Origin", subtitle: "Sourced Globally. Perfected in Dubai.", desc: "Hand-selected micro-lots from rich volcanic soils, curated for elite palates.", alignment: "left" },
  { id: 3, start: 13, end: 20, title: "The Roast", subtitle: "Crafted Slowly. Roasted to Perfection.", desc: "Where complex thermal physics meets artisan intuition to lock in pure essence.", alignment: "right" },
  { id: 4, start: 20, end: 27, title: "The Grind", subtitle: "Precision Ground. Capturing Every Aroma.", desc: "Micron-level structural accuracy preserving the most delicate flavor compounds.", alignment: "left" },
  { id: 5, start: 27, end: 35, title: "The Extraction", subtitle: "Liquid Gold. Born Under Immaculate Pressure.", desc: "A rich, viscous espresso stream extracted precisely at 9 bars of pure sophistication.", alignment: "right" },
  { id: 6, start: 35, end: 42, title: "The Blank Canvas", subtitle: "The Vessel Awaits.", desc: "Immaculate custom white porcelain sitting symmetrically on rare dark timber.", alignment: "center" },
  { id: 7, start: 42, end: 50, title: "The Foundation", subtitle: "The Core of the Experience.", desc: "The fresh aromatic baseline anchors itself gracefully inside the vessel.", alignment: "left" },
  { id: 8, start: 50, end: 58, title: "The Velvet Stream", subtitle: "Textured into Liquid Silk.", desc: "Organic micro-foam introduced at ultra-precise macro-angles.", alignment: "right" },
  { id: 9, start: 58, end: 66, title: "The Artistry", subtitle: "Where Passion Meets Fluid Dynamics.", desc: "Symmetrical visual execution crafting a flawless contemporary profile.", alignment: "left" },
  { id: 10, start: 66, end: 74, title: "The Masterpiece", subtitle: "Every Cup Has A Story. This is Yours.", desc: "The definitive apex of hospitality, design, and taste united.", alignment: "center" },
  { id: 11, start: 74, end: 81, title: "Welcome to AVE", subtitle: "An Urban Escape, Redefined.", desc: "Transcend the ordinary within our meticulously curated sanctuary.", alignment: "left" },
  { id: 12, start: 81, end: 88, title: "Architectural Sophistication", subtitle: "Designed for the Global Connoisseur.", desc: "Sculptural ceiling light installations meeting contemporary minimalist layouts.", alignment: "right" },
  { id: 13, start: 88, end: 93, title: "Impeccable Vibe", subtitle: "Unforgettable Memories.", desc: "Where Dubai's high-energy lifestyle yields seamlessly to sophisticated indulgence.", alignment: "center" },
  { id: 14, start: 93, end: 96, title: "Elite Validation", subtitle: "4.8 Stars / 3,750+ Reviews", desc: "'The coffee is pure poetry, the architecture is breathtaking, and the service is immaculate.'", alignment: "center", isReview: true },
  { id: 15, start: 96, end: 100, title: "Experience AVE Tonight", subtitle: "Your Table Awaits.", desc: "Step into the ritual of contemporary Dubai luxury lifestyle.", alignment: "center", isCTA: true }
];

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeScene, setActiveScene] = useState(STORYBOARD_SCENES[0]);
  const [showStickyDock, setShowStickyDock] = useState(false);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);

  const totalFrames = 150; // العدد المثالي لإطارات الفيديو لضمان النعومة والسرعة
  const menuUrl = "https://qr.finedinemenu.com/ave-restaurant/menu/697a4f44d7174724382a6f6c";

  // حل مشكلة ارتفاع الشاشات على متصفحات الموبايل الذكية (Viewport Hack)
  useEffect(() => {
    const handleResize = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // جلب وتخزين إطارات الفيديو في ذاكرة المتصفح المباشرة كـ WebP تضمن الأداء الأقوى
  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      
      // هنا نقوم بإنشاء تدرج لوني سينمائي وهمي عالي الدقة ريثما تضع مسار صورك الحقيقية
      // عند الإنتاج: قم باستبدال الرابط أدناه بمسار صورك مثل: `/assets/frames/frame_${i.toString().padStart(3, '0')}.webp`
      img.src = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" viewBox="0 0 1920 1080"><rect width="100%" height="100%" fill="%23${i > 110 ? '121110' : '0B0B0B'}"/><circle cx="960" cy="540" r="${150 + (i * 2)}" fill="none" stroke="%23D4AF37" stroke-width="0.75" opacity="${0.02 + (i / totalFrames) * 0.08}"/><path d="M0 ${1080 - (i * 3)} Q 960 ${540 - (i * 1.5)} 1920 ${1080 - (i * 3)}" fill="none" stroke="%23FFBF00" stroke-width="0.5" opacity="0.04"/></svg>`;
      
      img.onload = () => {
        loadedCount++;
        const progress = Math.floor((loadedCount / totalFrames) * 100);
        setLoadingProgress(progress);

        if (loadedCount >= totalFrames * 0.3 && !isLoaded) {
          // السماح للمستخدم بالتفاعل بمجرد تحميل أول 30% من الإطارات في الذاكرة المؤقتة
          setIsLoaded(true);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, []);

  // تشغيل نظام السكرول الانسيابي الحريري وربطه بمحرك الكانفاس و الـ GSAP
  useEffect(() => {
    if (!isLoaded || images.length === 0) return;

    // تهيئة محرك Lenis للسكرول الفاخر والموزون
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.sin((t * Math.PI) / 2),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.95,
      touchMultiplier: 1.1,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    lenis.on('scroll', ScrollTrigger.update);

    ScrollTrigger.scrollerProxy(document.body, {
      scrollTop(value) {
        return arguments.length ? lenis.scrollTo(value!) : lenis.scroll;
      },
      getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
      }
    });

    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // دالة رسم الإطارات داخل الكانفاس بمحاكاة الـ Object-fit: cover لضمان التجاوب الفخم
    const renderFrame = (index: number) => {
      if (images[index]) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[index];
        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);
        const centerShift_x = (canvas.width - img.width * ratio) / 2;
        const centerShift_y = (canvas.height - img.height * ratio) / 2;
        
        context.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * ratio, img.height * ratio);
      }
    };

    // رسم أول إطار فوراً
    renderFrame(0);

    // التحكم في فريمات الفيديو عبر الـ Scrubbing المربوط بالسكرول
    const sequenceController = { frame: 0 };
    gsap.to(sequenceController, {
      frame: totalFrames - 1,
      snap: "frame",
      ease: "none",
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 0.6, // تأخير ناعم جداً ليعطي الكاميرا ثقل سينمائي فاخر جداً
        onUpdate: (self) => {
          renderFrame(sequenceController.frame);
          
          const currentPercent = self.progress * 100;
          const matchedScene = STORYBOARD_SCENES.find(
            scene => currentPercent >= scene.start && currentPercent <= scene.end
          );
          
          if (matchedScene && matchedScene.id !== activeScene.id) {
            setActiveScene(matchedScene);
          }

          // تفعيل ظهور الدوك السفلي الثابت عند الانتقال لمشاهد الـ Lifestyle
          if (currentPercent >= 75) {
            setShowStickyDock(true);
          } else {
            setShowStickyDock(false);
          }
        }
      }
    });

    // تنظيف المكونات عند مغادرة الصفحة لعدم استهلاك الذاكرة
    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [isLoaded, images, activeScene]);

  // ماسك الانتقال السينمائي لفتح المنيو الفاخر بدون تشتيت العميل
  const handleMenuRedirection = (e: React.MouseEvent) => {
    e.preventDefault();
    gsap.to(".luxury-page-mask", {
      opacity: 1,
      scale: 1,
      duration: 0.8,
      ease: "power4.inOut",
      onComplete: () => {
        window.location.href = menuUrl;
      }
    });
  };

  return (
    <div className={`${serifLuxury.variable} ${sansMinimal.variable} bg-[#0B0B0B] text-[#F5F2EB] selection:bg-[#D4AF37] selection:text-[#0B0B0B] relative min-h-screen font-sans`} ref={containerRef}>
      
      {/* ماسك الانتقال الفاخر */}
      <div className="luxury-page-mask pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-[#121110] opacity-0 scale-95 transition-all duration-300">
        <div className="text-center">
          <h2 className="font-serif-luxury text-4xl lg:text-6xl text-[#D4AF37] tracking-widest mb-4">AVE DUBAI</h2>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#F5F2EB]/60">Unveiling Culinary Manifestations...</p>
        </div>
      </div>

      {/* الهيدر العلوي العالمي للبراند */}
      <header className="fixed top-0 left-0 w-full z-50 px-6 lg:px-16 py-6 flex justify-between items-center bg-gradient-to-b from-[#0B0B0B]/90 to-transparent backdrop-blur-[1px]">
        <div className="flex flex-col">
          <span className="font-serif-luxury text-2xl lg:text-3xl tracking-[0.25em] text-[#F5F2EB]">AVE</span>
          <span className="text-[9px] uppercase tracking-[0.55em] text-[#D4AF37] mt-0.5">DUBAI</span>
        </div>
        
        <nav className="hidden md:flex space-x-12 text-xs uppercase tracking-[0.25em] text-[#F5F2EB]/80">
          <a href="#experience" className="hover:text-[#D4AF37] transition-colors duration-300">The Ritual</a>
          <a href={menuUrl} onClick={handleMenuRedirection} className="hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1">The Menu <Compass className="w-3 h-3 text-[#D4AF37]"/></a>
          <a href="#reservations" className="hover:text-[#D4AF37] transition-colors duration-300">Reservations</a>
        </nav>

        <div className="flex items-center space-x-6">
          <a href="tel:+9714000000" className="hidden lg:flex items-center space-x-2 text-xs tracking-widest text-[#D4AF37] font-light">
            <Phone className="w-3.5 h-3.5" />
            <span>+971 4 AVE DUBAI</span>
          </a>
          <button onClick={() => setMenuOpen(!menuOpen)} className="text-[#F5F2EB] hover:text-[#D4AF37] transition-colors duration-300 focus:outline-none z-50">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* القائمة الجانبية الكاملة التي تظهر من الأعلى بدقة عالي */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed inset-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-2xl flex flex-col justify-center items-center text-center p-6">
            <div className="space-y-8 lg:space-y-12 max-w-lg w-full">
              <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37]">The Ultimate Destination</p>
              <div className="flex flex-col space-y-4 font-serif-luxury text-3xl lg:text-5xl tracking-widest">
                <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">The Narrative</a>
                <a href={menuUrl} onClick={handleMenuRedirection} className="hover:text-[#D4AF37] transition-colors">Culinary Menu</a>
                <a href="#reservations" onClick={() => setMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Table Bookings</a>
                <a href="#" onClick={() => setMenuOpen(false)} className="hover:text-[#D4AF37] transition-colors">Our Space</a>
              </div>
              <div className="h-[1px] w-12 bg-[#D4AF37]/40 mx-auto my-4"></div>
              <p className="text-xs text-[#F5F2EB]/60 font-light leading-relaxed">
                Dubai Fountain St, Empire Heights, Dubai, UAE <br />
                Open Daily: 8:00 AM – Midnight
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* شاشة التحميل الأولية الأنيقة للفخامة المطلقة قبل فتح المنصة */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div exit={{ opacity: 0 }} className="fixed inset-0 z-[100] bg-[#0B0B0B] flex flex-col justify-center items-center px-6">
            <div className="w-full max-w-md text-center space-y-12">
              <div className="space-y-2">
                <h1 className="font-serif-luxury text-5xl tracking-[0.3em] text-[#F5F2EB]">AVE</h1>
                <p className="text-xs uppercase tracking-[0.6em] text-[#D4AF37]">DUBAI</p>
              </div>
              
              <div className="relative w-48 h-[1px] bg-[#F5F2EB]/10 mx-auto overflow-hidden">
                <motion.div className="absolute top-0 left-0 h-full bg-[#D4AF37]" style={{ width: `${loadingProgress}%` }} />
              </div>
              
              <div className="space-y-1">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[#F5F2EB]/40 font-light">Assembling High-Fidelity Sequence Engine</p>
                <p className="text-xs font-serif-luxury text-[#D4AF37] italic">{loadingProgress}% Cached</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* بوكس تثبيت الكانفاس في الخلفية، لا يتحرك أبداً والسكرول يغير فريماته */}
      <div className="fixed top-0 left-0 w-full h-screen z-10 pointer-events-none overflow-hidden bg-[#0B0B0B]">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B] via-transparent to-[#0B0B0B]/30" />
      </div>

      {/* طبقة النصوص الإبداعية الموزعة في فضاء السكرول لتتطابق مع الـ 15 مشهد */}
      <div className="relative z-20 w-full pointer-events-none">
        {STORYBOARD_SCENES.map((scene) => (
          <section key={scene.id} className="min-h-screen w-full flex items-center px-6 lg:px-24 py-20 relative select-none">
            <div className={`w-full max-w-4xl mx-auto flex flex-col justify-center pointer-events-auto
              ${scene.alignment === 'center' ? 'text-center items-center' : ''}
              ${scene.alignment === 'right' ? 'text-right items-end ml-auto' : ''}
              ${scene.alignment === 'left' ? 'text-left items-start mr-auto' : ''}
            `}>
              {activeScene.id === scene.id && (
                <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }} className="space-y-4 bg-[#0B0B0B]/40 p-6 lg:p-10 rounded-3xl backdrop-blur-[6px] border border-[#F5F2EB]/5 max-w-xl shadow-2xl">
                  
                  <div className="flex items-center space-x-2 text-[#D4AF37] text-[10px] tracking-[0.4em] uppercase">
                    <span className="inline-block w-4 h-[1px] bg-[#D4AF37]"></span>
                    <span>Ritual Chapter {scene.id.toString().padStart(2, '0')}</span>
                  </div>

                  <h2 className={`text-4xl lg:text-6xl tracking-wide text-[#F5F2EB] font-serif-luxury leading-tight`}>
                    {scene.title}
                  </h2>

                  <p className="text-xs lg:text-sm text-[#D4AF37] tracking-[0.18em] font-light uppercase leading-relaxed">
                    {scene.subtitle}
                  </p>

                  <p className="text-xs lg:text-sm text-[#F5F2EB]/70 font-light tracking-wide leading-relaxed">
                    {scene.desc}
                  </p>

                  {/* تهيئة المشاهد الخاصة بالـ Social Proof الموثقة بـ 4.8 نجوم */}
                  {scene.isReview && (
                    <div className="flex items-center space-x-1 text-[#D4AF37] pt-2 justify-center">
                      {[...Array(5)].map((_, index) => (
                        <Star key={index} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  )}

                  {/* تهيئة مشهد الـ CTA النهائي والعملاق لحجز الطاولات */}
                  {scene.isCTA && (
                    <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
                      <button className="bg-[#D4AF37] text-[#0B0B0B] text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-full font-semibold hover:bg-[#F5F2EB] transition-colors duration-300 flex items-center justify-center gap-2">
                        Reserve Table <Clock className="w-3.5 h-3.5" />
                      </button>
                      <a href={menuUrl} onClick={handleMenuRedirection} className="border border-[#F5F2EB]/20 text-[#F5F2EB] text-xs uppercase tracking-[0.25em] px-8 py-4 rounded-full font-light hover:bg-[#F5F2EB]/10 transition-colors duration-300 flex items-center justify-center gap-2">
                        Explore Menu <ArrowRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}

                </motion.div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* الـ Sticky Floating Dock الذكي الذي يظهر في الأسفل عند مشاهد النهاية لمنع ضياع العميل وتأكيد التحويل */}
      <AnimatePresence>
        {showStickyDock && (
          <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }} className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md bg-[#121110]/80 backdrop-blur-xl border border-[#F5F2EB]/10 rounded-full py-3 px-4 flex justify-between items-center shadow-2xl pointer-events-auto">
            <div className="flex flex-col pl-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">AVE DUBAI</span>
              <span className="text-[9px] text-[#F5F2EB]/50 font-light flex items-center gap-1"><MapPin className="w-2.5 h-2.5 text-[#D4AF37]"/> Downtown Dubai</span>
            </div>
            <div className="flex             space-x-2">
              <a href={menuUrl} onClick={handleMenuRedirection} className="text-[10px] uppercase tracking-widest text-[#F5F2EB]/80 hover:text-[#D4AF37] px-3 py-2 transition-colors">Menu</a>
              <button className="bg-[#D4AF37] text-[#0B0B0B] text-[10px] uppercase tracking-widest px-4 py-2 rounded-full font-semibold hover:bg-[#F5F2EB] transition-colors duration-300">
                Book Table
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
