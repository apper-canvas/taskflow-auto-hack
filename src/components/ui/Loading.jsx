import { motion } from "framer-motion";

const Loading = () => {
  return (
    <div className="space-y-6">
      {/* Header skeleton */}
      <div className="space-y-2">
        <div className="h-8 bg-gray-200 rounded-lg w-48 animate-pulse" />
        <div className="h-5 bg-gray-200 rounded w-32 animate-pulse" />
      </div>

      {/* Quick add bar skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="h-10 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Filter bar skeleton */}
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <div className="flex items-center gap-4">
          <div className="flex-1 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="w-32 h-10 bg-gray-200 rounded animate-pulse" />
          <div className="w-40 h-10 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* Task list skeleton */}
      <div className="space-y-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-white rounded-lg border border-gray-200 p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2, delay: i * 0.1 }}
          >
            <div className="flex items-start gap-3">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse mt-1" />
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-gray-200 rounded-full animate-pulse" />
                  <div className="h-5 bg-gray-200 rounded w-48 animate-pulse" />
                </div>
                <div className="h-4 bg-gray-200 rounded w-full animate-pulse" />
                <div className="flex items-center justify-between">
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
                  <div className="h-6 bg-gray-200 rounded-full w-20 animate-pulse" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Loading;