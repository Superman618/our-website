import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col h-screen">
      <header className="h-16 border-b flex items-center px-4">
        <h1 className="text-xl font-semibold">AI 聊天助手</h1>
      </header>
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}; 