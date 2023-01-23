import type { AppProps } from 'next/app'
import PrimeReact from 'primereact/api';
import useSWR, { SWRConfig } from 'swr'

import "primeicons/primeicons.css";                                //icons
import '@/styles/globals.scss'
import "primereact/resources/primereact.min.css";                  //core css
import "primereact/resources/themes/lara-light-blue/theme.css";  //theme

//font config
import { Poppins } from '@next/font/google'
import { Provider } from 'react-redux';
import { store } from '../store';

const poppins = Poppins({
    weight: ['400', '500', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--font-poppins'
})

export default function App({ Component, pageProps }: AppProps) {
    PrimeReact.ripple = true;

    return (
        <Provider store={store}>
            <SWRConfig
                value={{
                    refreshInterval: 3000,
                    fetcher: (resource, init) => fetch(resource, init).then(res => res.json()),
                }}
            >
                <main className={`${poppins.variable} font-sans`}>
                    <Component {...pageProps} />
                </main>
            </SWRConfig>
        </Provider>
    )
}
