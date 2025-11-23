import React from "react";

import Sidebar from "@/components/shared/Sidebar";

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="pl-64">
        <main className="h-full min-h-screen p-6">{children}</main>
      </div>
    </div>
  );
};
