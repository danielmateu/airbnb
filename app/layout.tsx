import './globals.css'
import type { Metadata } from 'next'
import { Nunito, Inter } from 'next/font/google'
import { ThemeProvider } from '../components/theme-provider'
import { Navbar } from '@/components/navbar/Navbar'
// import { ClientOnly } from '@/components/ClientOnly'
// import { Modal } from '@/components/modals/Modal'
import { RegisterModal } from '@/components/modals/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'
import { LoginModal } from '@/components/modals/LoginModal'
import getCurrentUser from './actions/getCurrentUser'
import { RentModal } from '@/components/modals/RentModal'


const inter = Inter({ subsets: ['latin'] })
const font = Nunito({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Airbnb Clone',
  description: 'This is an Airbnb Clone',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser()

  return (
    <html lang="es" suppressHydrationWarning>
      <body className={font.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <RentModal />
          <Navbar currentUser={currentUser} />
          <div className='pb-20 pt-28'>
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
