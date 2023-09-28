import './globals.css'
import type { Metadata } from 'next'
import ThemeRegistry from '@/helpers/theme-register'
import { Footer, Navbar } from '@/components'
import { Box } from '@mui/material'

export const metadata: Metadata = {
  title: 'Next App',
  description: 'NextJS application project',
}

export default function RootLayout({children,} : {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body  suppressHydrationWarning={true}>
        <ThemeRegistry>
          <Navbar />
          <Box minHeight={'82vh'}>{children}</Box>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  )
}
