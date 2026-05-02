# 🚀 JAANMITR AI - Quick Reference Guide

## 📁 The 3 Core Files You Asked For

### 1️⃣ **App Logic** → `src/app/App.tsx`
Your main application file with all the logic

### 2️⃣ **Data** → `src/app/data/mockData.ts` or `FINAL_DATA.ts`
All types, interfaces, and mock data

### 3️⃣ **Styles** → `src/styles/theme.css` or `FINAL_STYLES.css`
All Tailwind CSS and custom styles

---

## 🎯 Quick Tasks

### ✏️ Add New Scheme/Job
**File**: `src/app/data/mockData.ts`
```typescript
{
  id: 13,
  category: 'Scheme',
  title: 'New Scheme Name',
  authority: 'Ministry Name',
  eligibility: ['Criterion 1', 'Criterion 2'],
  location: 'National',
  benefit: '₹10,000',
  description: 'Details here...',
  tags: ['Tag1', 'Tag2'],
}
```

### 🎨 Change Primary Color
**File**: `src/styles/theme.css`
```css
:root {
  --primary: #your-color-here;
}
```

### 🌍 Add New Language
**File**: `src/app/data/mockData.ts`
```typescript
{ code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: '🇮🇳' }
```

### 🤖 Add Chatbot Keywords
**File**: `src/app/components/AIChatbot.tsx`
```typescript
const keywords = {
  yourKeyword: ['word1', 'word2', 'word3'],
}
```

---

## 📂 File Locations

| What | Where |
|------|-------|
| Main App | `src/app/App.tsx` |
| All Components | `src/app/components/*.tsx` |
| All Data | `src/app/data/mockData.ts` |
| Colors & Theme | `src/styles/theme.css` |
| Fonts | `src/styles/fonts.css` |

---

## 🔑 Key Components

```
Navbar.tsx           → Top navigation bar
OnboardingWizard.tsx → 3-step user setup
CategoryTabs.tsx     → Filter buttons
InfoCard.tsx         → Scheme/Job cards
AIChatbot.tsx        → AI assistant
LoginModal.tsx       → Login/signup
DetailModal.tsx      → Full details popup
```

---

## 🎨 Common Tailwind Classes

```tsx
// Gradients
bg-gradient-to-r from-blue-500 to-purple-600

// Dark mode
bg-white dark:bg-gray-800

// Hover effects
hover:shadow-lg transition-all

// Rounded corners
rounded-xl

// Padding
px-4 py-3
```

---

## 💾 LocalStorage Keys

```typescript
'user'          // Login info
'userProfile'   // Onboarding data
'savedItems'    // Bookmarked schemes
'darkMode'      // Theme preference
```

---

## 🚀 Your App is Running!

The app is **already live** in Figma Make preview.  
Any changes you make will auto-reload!

---

## 📱 Features Checklist

- ✅ User onboarding (3 steps)
- ✅ Personalized feed
- ✅ AI chatbot
- ✅ Voice search
- ✅ Dark mode
- ✅ 10 languages
- ✅ Login/signup
- ✅ Notifications
- ✅ Bookmarks
- ✅ User analytics

---

## 🎯 Common State Variables (in App.tsx)

```typescript
user              // Logged in user
userProfile       // Onboarding data
activeCategory    // Current filter
savedItems        // Bookmarked IDs
searchOpen        // Search modal visible
detailItem        // Selected item for modal
showBookmarks     // Bookmarks view active
showLogin         // Login modal visible
```

---

## 🔧 Customization Hotspots

### Change Logo/Brand Name
**File**: `src/app/components/Navbar.tsx`
```tsx
<span className="font-semibold">JAANMITR AI</span>
```

### Change Hero Title
**File**: `src/app/components/Hero.tsx`
```tsx
<h1>Your New Title</h1>
```

### Change Onboarding Steps
**File**: `src/app/components/OnboardingWizard.tsx`
```tsx
const roles = [/* add/remove options */]
const states = [/* add/remove options */]
const categories = [/* add/remove options */]
```

---

## 🎨 Category Colors

```typescript
Scheme       → Green  (#10b981)
Job          → Blue   (#3b82f6)
Tender       → Purple (#8b5cf6)
Compensation → Red    (#ef4444)
```

**Change in**: `src/app/data/mockData.ts`

---

## 🧩 Component Props Pattern

```tsx
// Parent (App.tsx) passes data down:
<InfoCard 
  item={item}
  onSave={handleSaveItem}
  isSaved={savedItems.includes(item.id)}
/>

// Child (InfoCard.tsx) receives:
interface InfoCardProps {
  item: InfoItem;
  onSave: (id: number) => void;
  isSaved: boolean;
}
```

---

## 📊 Data Structure

```typescript
InfoItem {
  id: number
  category: 'Scheme' | 'Job' | 'Tender' | 'Compensation'
  title: string
  authority: string
  eligibility: string[]
  location: string
  benefit?: string
  deadline?: string
  description: string
  tags: string[]
  matchPercentage?: number
}
```

---

## 🎯 Match Percentage Logic

**File**: `src/app/App.tsx`

```typescript
calculateMatchPercentage(item: InfoItem) {
  // Checks:
  // 1. Role match (farmer, student, etc.)
  // 2. Location match
  // 3. Category match
  
  // Returns: 0-100%
}
```

---

## 🔍 Search & Filter Flow

```
User Input
  ↓
Filter mockData by:
  - activeCategory (Scheme, Job, etc.)
  - showBookmarks (saved items only)
  - userProfile (match percentage)
  ↓
Sort by matchPercentage
  ↓
Display InfoCards
```

---

## 🌙 Dark Mode Implementation

```typescript
// Toggle function:
const toggleDarkMode = () => {
  setIsDark(!isDark)
  localStorage.setItem('darkMode', String(!isDark))
  document.documentElement.classList.toggle('dark')
}

// CSS automatically switches via dark: prefix
```

---

## 📝 Quick Command Reference

```bash
# Your app runs automatically in Figma Make!
# No commands needed - just edit and save files
```

---

## 🎨 Design System

**Font**: Inter (Google Fonts)  
**Border Radius**: 0.625rem (10px)  
**Spacing**: Multiples of 4px  
**Breakpoints**:
- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px

---

## 🚨 Important Notes

1. **Don't run `npm run build`** - Not needed in Figma Make
2. **No localhost access** - Use Figma Make preview
3. **Auto-reload enabled** - Changes appear immediately
4. **All components are TSX** - Not regular HTML/CSS/JS

---

## 🏆 Quick Stats

- **14** React Components
- **10+** Major Features
- **12** Mock Data Items
- **10** Supported Languages
- **3,500+** Lines of Code

---

## 💡 Pro Tips

1. Always use TypeScript interfaces for type safety
2. Include dark mode classes: `dark:bg-gray-800`
3. Use Tailwind utilities instead of custom CSS
4. Keep components small and focused
5. Store data in localStorage for persistence

---

## 📞 Need Help?

1. Check `PROJECT_DOCUMENTATION.md` for details
2. Read component comments in code files
3. Check browser console for errors

---

**Your app is ready to use! 🎉**
