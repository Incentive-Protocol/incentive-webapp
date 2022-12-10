import '../style/style.css';
import '../style/reset.css';

// stylePages
import '../style/stylePages/styleEntry.css';
import '../style/stylePages/styleDiscover.css';
import '../style/stylePages/styleProfile.css';

// styleElements
import '../style/styleElements/styleButton.css';
import '../style/styleElements/styleNavBar.css';
import '../style/styleElements/styleRegTabs.css';
import '../style/styleElements/styleInputs.css';

export default function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout || (page => page);
  return getLayout(<Component {...pageProps} />);
}
