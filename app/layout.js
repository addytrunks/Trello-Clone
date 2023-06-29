import { Modal } from '@/components/Modal'
import './globals.css'

export const metadata = {
  title: 'Trello Clone',
  description: 'Increase your Productivity day by day.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className='bg-[#F5F6F8]'>
        <Modal/>
        {children}
        </body>
    </html>
  )
}
