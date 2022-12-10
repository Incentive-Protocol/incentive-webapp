import style from '../style/style.css'
import reset from '../style/reset.css'

// stylePages
import styleEntry from '../style/stylePages/styleEntry.css'
import styleDiscover from '../style/stylePages/styleDiscover.css'
import styleProfile from '../style/stylePages/styleProfile.css'

// styleElements
import styleButton from '../style/styleElements/styleButton.css'
import styleNavBar from '../style/styleElements/styleNavBar.css'
import styleRegTabs from '../style/styleElements/styleRegTabs.css'
import styleInputs from '../style/styleElements/styleInputs.css'


export default function MyApp({ Component, pageProps }) {
    const getLayout = Component.getLayout || ((page) => page)
    return getLayout(<Component {...pageProps} />)
}