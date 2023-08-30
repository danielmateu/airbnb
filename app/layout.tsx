import './globals.css'
import type { Metadata } from 'next'
import { Nunito, Inter } from 'next/font/google'
import { ThemeProvider } from '../components/theme-provider'
import { Navbar } from '@/components/navbar/Navbar'
import { ClientOnly } from '@/components/ClientOnly'
// import { Modal } from '@/components/modals/Modal'
import { RegisterModal } from '@/components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'


const inter = Inter({ subsets: ['latin'] })
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb: Vacation Rentals & Experiences',
  description: 'This is an Airbnb Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning>


      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          <RegisterModal />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
