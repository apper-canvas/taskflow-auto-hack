import { Outlet } from "react-router-dom";
import { motion } from "framer-motion";
import CategorySidebar from "@/components/organisms/CategorySidebar";
import { useCategories } from "@/hooks/useCategories";

const Layout = () => {
  const { categories, loading, createCategory } = useCategories();

  return (
    <div className="min-h-screen bg-background">
      <div className="flex">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <div className="fixed top-0 left-0 h-screen w-64 p-4 overflow-y-auto custom-scrollbar">
            <CategorySidebar
              categories={categories}
              loading={loading}
              onCreateCategory={createCategory}
            />
          </div>
        </div>

        {/* Mobile Sidebar - Overlay */}
        <div className="lg:hidden">
          {/* Mobile sidebar would be implemented here as an overlay */}
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          <motion.main
            className="p-4 lg:p-6 max-w-4xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Outlet />
          </motion.main>
        </div>
      </div>
    </div>
  );
};

export default Layout;