import { ReactNode, Suspense, lazy, ComponentType } from "react";
import { useLazyLoad } from "@/hooks/useLazyLoad";
import { motion } from "framer-motion";

interface LazySectionProps {
  children: ReactNode;
  fallback?: ReactNode;
  rootMargin?: string;
}

const LoadingPlaceholder = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
  </div>
);

export const LazySection = ({ 
  children, 
  fallback = <LoadingPlaceholder />,
  rootMargin = "300px" 
}: LazySectionProps) => {
  const { ref, isVisible } = useLazyLoad(rootMargin);

  return (
    <div ref={ref}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      ) : (
        fallback
      )}
    </div>
  );
};

// HOC for lazy loading components
export function withLazyLoad<P extends object>(
  Component: ComponentType<P>,
  rootMargin = "300px"
) {
  return function LazyComponent(props: P) {
    const { ref, isVisible } = useLazyLoad(rootMargin);

    return (
      <div ref={ref}>
        {isVisible ? <Component {...props} /> : <LoadingPlaceholder />}
      </div>
    );
  };
}

export default LazySection;
