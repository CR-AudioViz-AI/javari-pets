// app/layout.tsx — Javari Pets
import type { Metadata } from 'next'
import './globals.css'
export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Javari Pets | Javari by CR AudioViz AI',
  description: 'Pet care AI',
}
import AppShell from '@/components/AppShell'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body style={{ margin: 0, padding: 0 }}><AppShell appName="Javari Pets" appColor="#f59e0b" appEmoji="🐾" appDesc="Pet care AI">{children}</AppShell></body></html>)
}
