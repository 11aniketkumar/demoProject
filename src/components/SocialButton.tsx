import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
}

export function SocialButton({ icon, label }: SocialButtonProps) {
  return (
    <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
      {icon}
      <span className="text-sm font-medium text-gray-700">Sign in with {label}</span>
    </button>
  );
}