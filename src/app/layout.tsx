import type { Metadata } from 'next'
import { Inter, Poppins } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter'
})

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'GSU AI Club - Artificial Intelligence Student Organization',
  description: 'Georgia State University\'s premier AI and machine learning student organization. Join us to explore the future of artificial intelligence through workshops, projects, and networking.',
  keywords: 'GSU, AI, Artificial Intelligence, Machine Learning, Student Organization, Georgia State University',
  authors: [{ name: 'GSU AI Club' }],
  openGraph: {
    title: 'GSU AI Club',
    description: 'Georgia State University\'s premier AI and machine learning student organization',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}
