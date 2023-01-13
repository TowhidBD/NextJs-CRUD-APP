import '@/styles/globals.scss'
import type { AppProps } from 'next/app'
import PrimeReact from 'primereact/api';

import "primereact/resources/themes/mdc-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

//font config
import { Poppins } from '@next/font/google'

const poppins = Poppins({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-poppins'
})

export default function App({ Component, pageProps }: AppProps) {
    PrimeReact.ripple = true;

    return (
        <main className={`${poppins.variable} font-sans`}>
            <Component {...pageProps} />
        </main>
    )
}
