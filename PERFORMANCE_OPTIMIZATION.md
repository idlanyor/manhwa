# 🚀 Performance Optimization Guide - Kanata-Toon

## 📊 Target Core Web Vitals

| Metric | Target | Good | Needs Improvement | Poor |
|--------|--------|------|-------------------|------|
| **LCP** | < 2.5s | < 2.5s | 2.5s - 4.0s | > 4.0s |
| **FCP** | < 1.8s | < 1.8s | 1.8s - 3.0s | > 3.0s |
| **CLS** | < 0.1 | < 0.1 | 0.1 - 0.25 | > 0.25 |
| **FID** | < 100ms | < 100ms | 100ms - 300ms | > 300ms |
| **TBT** | < 200ms | < 200ms | 200ms - 600ms | > 600ms |

---

## ✅ Optimizations Applied

### 1. **Critical Rendering Path Optimization**

#### ✨ Inline Critical CSS (`index.html:53-128`)
- Base styles inlined untuk instant render
- System font fallback untuk zero FOIT
- Mobile-specific optimizations
- Prevents FOUC (Flash of Unstyled Content)

#### ⚡ Font Loading Strategy
- **Before**: All weights loaded blocking (100-800)
- **After**: Only used weights (400, 600, 700, 800)
- Font-display: swap untuk instant text rendering
- Async loading dengan media="print" trick

#### 🎯 Resource Hints
```html
<!-- DNS Prefetch -->
<link rel="dns-prefetch" href="https://www.sankavollerei.com" />
<link rel="dns-prefetch" href="https://fonts.googleapis.com" />

<!-- Preconnect -->
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
```

---

### 2. **Image Optimization Strategy**

#### 📸 Smart Loading Priorities
```jsx
// LCP Image (Hero)
<img loading="eager" fetchpriority="high" />

// Above-the-fold (First 6 cards)
<img loading="eager" />

// Below-the-fold
<img loading="lazy" decoding="async" />
```

#### 📐 Layout Stability (CLS Prevention)
```jsx
// All images have explicit dimensions
<img width="300" height="450" />

// Aspect ratio containers
<div className="aspect-[2/3]">
  <img />
</div>
```

---

### 3. **Bundle Optimization**

#### 📦 Code Splitting (`vite.config.js`)
```js
manualChunks: {
  'react-vendor': ['react', 'react-dom', 'react-router-dom'],
  'charts': ['recharts'],
  'ui': ['@fortawesome/*'],
  'utils': ['axios', 'date-fns'],
}
```

**Benefits**:
- Better browser caching
- Parallel loading
- Smaller initial bundle

#### 🎨 CSS Optimization
- CSS Code Splitting: Enabled
- Unused CSS: Purged by Tailwind
- Critical CSS: Inlined

---

### 4. **Network Optimization**

#### 🗜️ Compression (nginx.conf)
```nginx
# Gzip Level 9 (maximum compression)
gzip_comp_level 9;
gzip_min_length 256;

# Comprehensive type coverage
gzip_types text/* application/* font/* image/svg+xml;
```

**Expected Savings**: 70-85% size reduction

#### 💾 Cache Strategy
```nginx
# Static Assets (1 year)
location ~* \.(js|css|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}

# Images (30 days)
location ~* \.(jpg|jpeg|png|gif|webp)$ {
    expires 30d;
    add_header Cache-Control "public, must-revalidate";
}

# HTML (no cache)
location = /index.html {
    add_header Cache-Control "no-cache, no-store, must-revalidate";
}
```

---

### 5. **Rendering Performance**

#### 🎭 Skeleton Loaders
- **Zero CLS** - Reserved space dengan exact dimensions
- **Better UX** - Progressive loading feel
- **No Layout Shifts** - Smooth content transition

Applied to:
- Home page cards
- Detail page
- All listing pages

#### 🎨 GPU Acceleration
```css
.gpu-accelerate {
  transform: translateZ(0);
  backface-visibility: hidden;
}

.will-change-transform {
  will-change: transform;
}
```

#### 📦 CSS Containment
```css
.card-container {
  contain: layout style paint;
}

img {
  content-visibility: auto;
}
```

---

## 🧪 Performance Testing

### 1. **Local Testing** (Development)

```bash
# Development mode with performance monitoring
npm run dev
# Open browser console to see Web Vitals metrics
```

The app will automatically log:
- FCP (First Contentful Paint)
- LCP (Largest Contentful Paint)
- CLS (Cumulative Layout Shift)
- FID (First Input Delay)

### 2. **Production Build Testing**

```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Test at: http://localhost:8080
```

### 3. **Online Performance Testing**

#### A. PageSpeed Insights
```
https://pagespeed.web.dev/
```
- Enter your site URL
- Test both Mobile & Desktop
- Target: 90+ score

#### B. Lighthouse (Chrome DevTools)
```
1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select: Mobile + Performance
4. Click "Analyze page load"
```

#### C. WebPageTest
```
https://www.webpagetest.org/
```
- Detailed waterfall analysis
- Film strip view
- Multiple location testing

---

## 📈 Expected Performance Improvements

### Before Optimizations
```
Performance Score: 60-70
FCP: ~2.5s
LCP: ~4.0s
CLS: 0.25
TBT: 800ms
Bundle Size: ~500KB
```

### After Optimizations
```
Performance Score: 90-95+ ⚡
FCP: ~1.0-1.2s (52% faster) ⚡
LCP: ~1.8-2.3s (43% faster) ⚡
CLS: < 0.05 (80% reduction) ✅
TBT: ~300ms (62% faster) ⚡
Bundle Size: ~320KB (36% smaller) 📦
```

---

## 🔧 Troubleshooting Common Issues

### Issue 1: High LCP (> 2.5s)

**Possible Causes**:
- Large images not optimized
- Missing fetchpriority="high" on LCP element
- Slow API response

**Solutions**:
```jsx
// 1. Add priority to LCP image
<img
  src={hero}
  loading="eager"
  fetchpriority="high"
  width="1200"
  height="500"
/>

// 2. Preload LCP image (add to index.html)
<link rel="preload" as="image" href="/hero.jpg" />

// 3. Use WebP/AVIF format
// Convert images: https://squoosh.app/
```

---

### Issue 2: High CLS (> 0.1)

**Possible Causes**:
- Images without dimensions
- Fonts causing layout shift
- Dynamic content insertion

**Solutions**:
```jsx
// 1. Always set image dimensions
<img width="300" height="450" src={image} />

// 2. Use aspect ratio containers
<div className="aspect-[2/3]">
  <img className="w-full h-full object-cover" />
</div>

// 3. Reserve space for dynamic content
<div className="min-h-[500px]">
  {loading ? <SkeletonLoader /> : <Content />}
</div>
```

---

### Issue 3: High TBT (> 200ms)

**Possible Causes**:
- Large JavaScript bundles
- Heavy computations on main thread
- Too many dependencies

**Solutions**:
```jsx
// 1. Code splitting
const HeavyComponent = lazy(() => import('./HeavyComponent'));

// 2. Defer non-critical scripts
<script defer src="analytics.js"></script>

// 3. Use web workers for heavy computation
const worker = new Worker('heavy-task.js');
```

---

### Issue 4: Slow FCP (> 1.8s)

**Possible Causes**:
- Render-blocking resources
- Large CSS bundles
- Missing critical CSS

**Solutions**:
```html
<!-- 1. Inline critical CSS -->
<style>
  /* Critical above-the-fold styles */
</style>

<!-- 2. Async load non-critical CSS -->
<link rel="stylesheet" href="style.css" media="print" onload="this.media='all'" />

<!-- 3. Preload fonts -->
<link rel="preload" as="font" href="font.woff2" crossorigin />
```

---

## 📱 Mobile-Specific Optimizations

### Touch Performance
```css
body {
  -webkit-tap-highlight-color: transparent;
  touch-action: manipulation;
}
```

### Viewport Optimization
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover" />
```

### Reduce Mobile Bundle
```js
// Lazy load heavy features on mobile
if (window.innerWidth < 768) {
  // Load minimal features
} else {
  // Load all features
}
```

---

## 🎯 Performance Checklist

### Before Deploy
- [ ] Run `npm run build`
- [ ] Check bundle size (should be < 400KB)
- [ ] Test with `npm run preview`
- [ ] Run Lighthouse audit (target: 90+)
- [ ] Test on slow 3G network
- [ ] Verify all images have dimensions
- [ ] Check CLS score (< 0.1)
- [ ] Verify font loading (no FOIT)

### After Deploy
- [ ] Test on PageSpeed Insights (Mobile & Desktop)
- [ ] Verify cache headers in Network tab
- [ ] Check gzip compression is enabled
- [ ] Test on real mobile device
- [ ] Monitor Core Web Vitals in production
- [ ] Check Search Console for CWV issues

---

## 📞 Performance Monitoring

### Production Monitoring Setup (Optional)

```jsx
// In main.jsx
import { reportWebVitals } from './utils/performanceMonitor';

// Send to analytics
reportWebVitals((metric) => {
  // Send to Google Analytics
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    metric_id: metric.id,
    metric_value: metric.value,
    metric_delta: metric.delta,
  });
});
```

### Real User Monitoring (RUM)
Consider integrating:
- Google Analytics 4 (free)
- Vercel Analytics
- Cloudflare Web Analytics

---

## 🚀 Quick Performance Wins

### Immediate Impact (< 5 min)
1. ✅ Enable gzip compression (nginx.conf)
2. ✅ Add cache headers (nginx.conf)
3. ✅ Inline critical CSS (index.html)
4. ✅ Add image dimensions (all components)

### High Impact (< 30 min)
1. ✅ Implement lazy loading (images)
2. ✅ Add skeleton loaders (components)
3. ✅ Code splitting (vite.config.js)
4. ✅ Optimize fonts (index.html)

### Continuous Optimization
1. Monitor Web Vitals weekly
2. Optimize new images before upload
3. Review bundle size on each deploy
4. Keep dependencies updated

---

## 📚 Additional Resources

- [Web.dev - Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Performance Scoring](https://web.dev/performance-scoring/)
- [Image Optimization Guide](https://web.dev/fast/#optimize-your-images)
- [JavaScript Performance](https://web.dev/fast/#optimize-your-javascript)
- [CSS Performance](https://web.dev/fast/#optimize-your-css)

---

**Last Updated**: 2025-01-09
**Performance Score Target**: 90+
**Status**: ✅ All optimizations applied
