'use client'

import { useState, useEffect, useRef } from 'react'
import { Heart, MapPin, Camera, Utensils, Calendar, ChevronDown, Sparkles } from 'lucide-react'
import Image from 'next/image'

// Trip data
const tripHighlights = [
  {
    id: 1,
    type: 'scene',
    title: '意式风情街',
    subtitle: '浪漫的欧式建筑',
    description: '在这里感受异域风情，阳光正好，微风不燥',
    image: '/images/tianjin/girl-italian.jpg',
    icon: MapPin,
  },
  {
    id: 2,
    type: 'couple',
    title: '海河漫步',
    subtitle: '世纪钟与解放桥',
    description: '牵手走过百年老桥，时间仿佛凝固在这一刻',
    image: '/images/tianjin/couple-river.jpg',
    icon: Heart,
  },
  {
    id: 3,
    type: 'portrait',
    title: '河畔时光',
    subtitle: '最美的风景是你',
    description: '海河边的午后，阳光洒在你的笑容上',
    image: '/images/tianjin/girl-river.jpg',
    icon: Camera,
  },
  {
    id: 4,
    type: 'portrait',
    title: '阳光少年',
    subtitle: '冬日暖阳',
    description: '天津的阳光格外温暖，像你一样',
    image: '/images/tianjin/boy-sun.jpg',
    icon: Sparkles,
  },
]

const foodGallery = [
  {
    id: 1,
    name: '八珍豆腐',
    description: '鲜香浓郁的经典津味',
    image: '/images/tianjin/food-1.jpg',
  },
  {
    id: 2,
    name: '老爆三样',
    description: '外酥里嫩，超级下饭',
    image: '/images/tianjin/food-2.jpg',
  },
  {
    id: 3,
    name: '老味刨冰',
    description: '天津特色，甜蜜蜜',
    image: '/images/tianjin/food-3.jpg',
  },
  {
    id: 4,
    name: '煎饼果子',
    description: '地道天津早点，必吃！',
    image: '/images/tianjin/food-4.jpg',
  },
  {
    id: 5,
    name: '锅塌里脊',
    description: '滑嫩鲜美，入口即化',
    image: '/images/tianjin/food-5.jpg',
  },
]

export default function TianjinTrip() {
  const [scrollY, setScrollY] = useState(0)
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set())
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set([...prev, entry.target.id]))
          }
        })
      },
      { threshold: 0.1 }
    )

    document.querySelectorAll('.scroll-section').forEach((section) => {
      observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight - 100, behavior: 'smooth' })
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-hero"
      >
        {/* Floating hearts decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <Heart
              key={i}
              className="heart-float text-love"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                width: `${30 + i * 8}px`,
                height: `${30 + i * 8}px`,
              }}
              fill="currentColor"
            />
          ))}
        </div>

        <div 
          className="relative z-10 text-center px-6"
          style={{ transform: `translateY(${scrollY * 0.3}px)` }}
        >
          {/* Title badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-love/10 border border-love/20 mb-6">
            <Heart className="w-4 h-4 text-love animate-heartbeat" fill="currentColor" />
            <span className="text-sm font-medium text-love">2026年2月 · 甜蜜之旅</span>
          </div>

          {/* Main title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 font-serif">
            <span className="text-gradient-love">猪猪CP</span>
          </h1>
          <h2 className="text-3xl md:text-5xl font-bold text-foreground/80 mb-6 font-serif">
            天津之旅
          </h2>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-md mx-auto mb-8 leading-relaxed">
            意式风情街的浪漫邂逅<br/>
            海河边的温柔时光<br/>
            还有吃不完的津味美食
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl font-bold text-love">3</div>
              <div className="text-sm text-muted-foreground">天</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-coral">5+</div>
              <div className="text-sm text-muted-foreground">美食</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-love">∞</div>
              <div className="text-sm text-muted-foreground">甜蜜</div>
            </div>
          </div>

          {/* Scroll indicator */}
          <button 
            onClick={scrollToContent}
            className="animate-bounce inline-flex flex-col items-center gap-1 text-muted-foreground hover:text-love transition-colors"
          >
            <span className="text-sm">开始回忆</span>
            <ChevronDown className="w-5 h-5" />
          </button>
        </div>

        {/* Gradient overlay at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Trip Highlights Section */}
      <section 
        id="highlights" 
        className="scroll-section py-20 px-6"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('highlights') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary mb-4">
              <Camera className="w-4 h-4 text-love" />
              <span className="text-sm font-medium text-secondary-foreground">精彩瞬间</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">
              旅途中的
              <span className="text-gradient-love">美好时刻</span>
            </h2>
          </div>

          {/* Photo Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {tripHighlights.map((item, index) => (
              <div
                key={item.id}
                className={`group transition-all duration-700 delay-${index * 100} ${
                  visibleSections.has('highlights') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="photo-card shadow-photo">
                  <div className="relative aspect-[4/5] overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/20 to-transparent" />
                    
                    {/* Content overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-primary-foreground">
                      <div className="flex items-center gap-2 mb-2">
                        <item.icon className="w-5 h-5 text-love" fill={item.type === 'couple' ? 'currentColor' : 'none'} />
                        <span className="text-sm opacity-80">{item.subtitle}</span>
                      </div>
                      <h3 className="text-2xl font-bold font-serif mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Food Section */}
      <section 
        id="food" 
        className="scroll-section py-20 px-6 bg-gradient-romantic"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${visibleSections.has('food') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-love/10 border border-love/20 mb-4">
              <Utensils className="w-4 h-4 text-love" />
              <span className="text-sm font-medium text-love">津味美食</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif text-foreground">
              舌尖上的
              <span className="text-gradient-love">天津味道</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-md mx-auto">
              来天津怎能不吃！每一口都是幸福的味道
            </p>
          </div>

          {/* Food Gallery - Polaroid style */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {foodGallery.map((food, index) => (
              <div
                key={food.id}
                className={`transition-all duration-700 ${
                  visibleSections.has('food') 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-10'
                }`}
                style={{ 
                  transitionDelay: `${index * 100}ms`,
                  transform: visibleSections.has('food') ? `rotate(${(index % 2 === 0 ? -2 : 2)}deg)` : undefined
                }}
              >
                <div className="polaroid">
                  <div className="relative aspect-square overflow-hidden rounded">
                    <Image
                      src={food.image}
                      alt={food.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 50vw, 20vw"
                    />
                  </div>
                  <div className="mt-3 text-center">
                    <h4 className="font-bold text-foreground font-serif">{food.name}</h4>
                    <p className="text-xs text-muted-foreground mt-1">{food.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Love Message Section */}
      <section 
        id="message" 
        className="scroll-section py-20 px-6"
      >
        <div className={`max-w-2xl mx-auto text-center transition-all duration-1000 ${visibleSections.has('message') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <Heart className="w-12 h-12 text-love mx-auto mb-6 animate-heartbeat" fill="currentColor" />
          <h2 className="text-2xl md:text-3xl font-serif text-foreground leading-relaxed mb-6">
            "和你一起<br/>
            每一个平凡的日子<br/>
            都变成了<span className="text-gradient-love">珍贵的回忆</span>"
          </h2>
          <p className="text-muted-foreground">
            期待我们的下一次旅行
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-border">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Heart className="w-4 h-4 text-love" fill="currentColor" />
            <span className="text-sm">猪猪CP · 2026</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span>天津之旅 · 2026年2月</span>
          </div>
        </div>
      </footer>
    </main>
  )
}
