# Loading & Error States - Usage Guide

## Components Available

All components are in `app/components/ui/LoadingStates.tsx`

### 1. LoadingSpinner

**Purpose**: Show a loading indicator while data is being fetched

```tsx
import { LoadingSpinner } from '@/app/components/ui/LoadingStates'

// Basic usage
<LoadingSpinner />

// With size
<LoadingSpinner size="lg" />

// With message
<LoadingSpinner message="Loading projects..." />
```

**Props**:
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `message`: Optional loading message

---

### 2. LoadingSkeleton

**Purpose**: Placeholder for content while loading

```tsx
import { LoadingSkeleton } from '@/app/components/ui/LoadingStates'

// Single skeleton
<LoadingSkeleton className="h-64 w-full rounded-lg" />

// Multiple skeletons
<LoadingSkeleton className="h-20 w-full rounded-lg" count={3} />
```

**Props**:
- `className`: Tailwind classes for styling
- `count`: Number of skeletons (default: 1)

---

### 3. SectionLoading

**Purpose**: Full section loading state

```tsx
import { SectionLoading } from '@/app/components/ui/LoadingStates'

// With title skeletons
<SectionLoading title />

// Without title
<SectionLoading />
```

**Props**:
- `title`: Show title skeleton (boolean)

---

### 4. ErrorFallback

**Purpose**: Display errors gracefully

```tsx
import { ErrorFallback } from '@/app/components/ui/LoadingStates'

// Basic usage
<ErrorFallback error={error} />

// With retry
<ErrorFallback 
  error={error} 
  resetErrorBoundary={() => window.location.reload()} 
/>
```

**Props**:
- `error`: Error object
- `resetErrorBoundary`: Optional retry function

---

### 5. EmptyState

**Purpose**: Show when no data is available

```tsx
import { EmptyState } from '@/app/components/ui/LoadingStates'

// Basic usage
<EmptyState title="No projects found" />

// With action
<EmptyState
  icon="🔍"
  title="No results"
  description="Try adjusting your search criteria"
  action={{
    label: "Clear Filters",
    onClick: () => clearFilters()
  }}
/>
```

**Props**:
- `icon`: Emoji or icon (default: '📭')
- `title`: Heading text
- `description`: Optional description
- `action`: Optional action button with label and onClick

---

## Usage Examples

### With React Suspense

```tsx
import { Suspense } from 'react'
import { LoadingSpinner } from '@/app/components/ui/LoadingStates'

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner message="Loading..." />}>
      <AsyncComponent />
    </Suspense>
  )
}
```

### With Error Boundary

```tsx
import { ErrorBoundary } from '@/app/components/ErrorBoundary'
import { ErrorFallback } from '@/app/components/ui/LoadingStates'

export default function Page() {
  return (
    <ErrorBoundary fallback={ErrorFallback}>
      <RiskyComponent />
    </ErrorBoundary>
  )
}
```

### With Data Fetching

```tsx
'use client'

import { useState, useEffect } from 'react'
import { LoadingSpinner, ErrorFallback, EmptyState } from '@/app/components/ui/LoadingStates'

export function DataComponent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <LoadingSpinner message="Fetching data..." />
  if (error) return <ErrorFallback error={error} resetErrorBoundary={() => window.location.reload()} />
  if (!data || data.length === 0) return <EmptyState title="No data available" />

  return <div>{/* Render data */}</div>
}
```

### Skeleton Loading Pattern

```tsx
'use client'

import { useState, useEffect } from 'react'
import { LoadingSkeleton } from '@/app/components/ui/LoadingStates'

export function CardList() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchItems().then(data => {
      setItems(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <div className="grid md:grid-cols-3 gap-6">
        <LoadingSkeleton className="h-64 rounded-xl" count={6} />
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-3 gap-6">
      {items.map(item => <Card key={item.id} {...item} />)}
    </div>
  )
}
```

---

## Recommended Implementation

### Priority 1: Add to AI Components

```tsx
// app/components/ai/AIProjectRecommender.tsx
import { LoadingSpinner, ErrorFallback } from '@/app/components/ui/LoadingStates'

export function AIProjectRecommender() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // ... existing code

  if (loading) return <LoadingSpinner message="AI is thinking..." />
  if (error) return <ErrorFallback error={error} resetErrorBoundary={() => setError(null)} />

  // ... rest of component
}
```

### Priority 2: Add to Data-Heavy Sections

```tsx
// app/components/sections/CaseStudies.tsx
import { SectionLoading } from '@/app/components/ui/LoadingStates'

export function CaseStudies() {
  const [loading, setLoading] = useState(true)

  if (loading) return <SectionLoading title />

  // ... rest of component
}
```

### Priority 3: Add Global Error Boundary

```tsx
// app/layout.tsx
import { ErrorBoundary } from './components/ErrorBoundary'
import { ErrorFallback } from './components/ui/LoadingStates'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ErrorBoundary fallback={ErrorFallback}>
          {children}
        </ErrorBoundary>
      </body>
    </html>
  )
}
```

---

## Best Practices

1. **Always provide feedback**: Never leave users wondering if something is loading
2. **Match skeleton to content**: Make skeletons look like the actual content
3. **Provide retry options**: Let users try again when errors occur
4. **Use appropriate sizes**: Small spinners for buttons, large for pages
5. **Add meaningful messages**: "Loading projects..." is better than just "Loading..."

---

## Accessibility

All components include:
- ✅ Proper ARIA labels
- ✅ Semantic HTML
- ✅ Keyboard navigation support
- ✅ Screen reader friendly

---

**Created**: 2026-02-01  
**Last Updated**: 2026-02-01
