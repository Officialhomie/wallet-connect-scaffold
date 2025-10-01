"use client";

import { useState, ReactNode } from 'react'

interface Tab {
  id: string
  label: string
  icon?: string
  content: ReactNode
}

interface TabsProps {
  tabs: Tab[]
  defaultTab?: string
}

export function Tabs({ tabs, defaultTab }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultTab || tabs[0]?.id)

  return (
    <div className="w-full">
      {/* Tab Headers */}
      <div className="flex space-x-1 bg-slate-100/80 p-1 rounded-xl backdrop-blur-sm border border-slate-200/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              relative px-6 py-3 text-sm font-medium rounded-lg transition-all duration-200 flex items-center gap-2
              ${activeTab === tab.id
                ? 'bg-white text-slate-900 shadow-lg shadow-slate-200/50 border border-slate-200/50'
                : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
              }
            `}
          >
            {tab.icon && <span className="text-lg">{tab.icon}</span>}
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {tabs.map((tab) => (
          <div
            key={tab.id}
            className={`
              transition-all duration-300 ease-in-out
              ${activeTab === tab.id ? 'opacity-100 visible' : 'opacity-0 invisible absolute'}
            `}
          >
            {activeTab === tab.id && tab.content}
          </div>
        ))}
      </div>
    </div>
  )
}