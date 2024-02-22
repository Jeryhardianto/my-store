import '@/styles/globals.css'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { Quicksand } from 'next/font/google'
import Navbar from './components/fragments/Navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'

const quicksand = Quicksand({
  subsets: ['latin'],
  weight: ['300','400', '700'],
})

const disableNavbar = [
  'auth',
  'admin'
]
export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const {pathname} = useRouter();
  
  return(
   <SessionProvider session={session}>
   <Head>
     <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet' />
   </Head>
    <div className={quicksand.className}>
     {!disableNavbar.includes(pathname.split('/')[1]) && <Navbar />}
      <Component {...pageProps} />
    </div>  
  </SessionProvider>
    
  )
}
