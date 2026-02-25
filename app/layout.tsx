import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: '猪猪CP天津之旅 | 甜蜜旅行回忆',
  description: '记录我们在天津的美好时光，意式风情街、海河、美食探索之旅',
  keywords: '天津旅行, 情侣旅行, 意式风情街, 海河, 天津美食',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="antialiased">{children}</body>
    </html>
  )
}
