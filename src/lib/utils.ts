
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Image optimization helper
export const optimizeImage = (url: string, width?: number, quality = 80) => {
  if (!url) return '';
  
  // If it's an external URL using a common image CDN, add optimization parameters
  if (url.includes('mighty.tools') || url.includes('cloudinary') || url.includes('imgix')) {
    const separator = url.includes('?') ? '&' : '?';
    return `${url}${separator}w=${width || 'auto'}&q=${quality}&auto=format`;
  }
  
  return url;
};

// Lazy loading helper for components
export const lazyLoad = <T extends React.ComponentType<any>>(
  importFunc: () => Promise<{ default: T }>,
) => {
  const LazyComponent = React.lazy(importFunc);
  
  return (props: React.ComponentProps<T>) => (
    <React.Suspense fallback={<div className="w-full h-64 bg-gray-100 animate-pulse rounded-md" />}>
      <LazyComponent {...props} />
    </React.Suspense>
  );
};

// Debounce function for event handlers
export function debounce<F extends (...args: any[]) => any>(
  func: F,
  waitFor: number
): (...args: Parameters<F>) => void {
  let timeout: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<F>): void => {
    if (timeout !== null) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

// Resource hint helper
export const preloadResources = (resources: Array<{ type: 'image' | 'font' | 'script', url: string }>) => {
  if (typeof document === 'undefined') return;
  
  resources.forEach(resource => {
    if (resource.type === 'image') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = resource.url;
      document.head.appendChild(link);
    } else if (resource.type === 'font') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'font';
      link.href = resource.url;
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    } else if (resource.type === 'script') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'script';
      link.href = resource.url;
      document.head.appendChild(link);
    }
  });
};
