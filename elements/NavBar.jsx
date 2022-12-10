import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function NavBar() {
  const [swipe, setSwipe] = useState();
  let pos = 0;

  const router = useRouter();
  if (router.asPath === '/Profile') {
    pos = '6rem';
  }
  if (router.asPath === '/Discover') {
    pos = '-6rem';
  }

  return (
    <>
      <div className="NavPos" style={{ alignSelf: 'center' }}>
        <div className="NavBar Flex Center">
          <Link
            href="/Discover"
            className="Link Flex Center"
            onClick={() => {
              setSwipe('-6rem');
            }}>
            <img className="Icon" src="/Explore.svg"></img>
          </Link>

          <Link
            href="/Home"
            className="Link Flex Center"
            onClick={() => {
              setSwipe('0rem');
            }}>
            <img className="Icon" src="/Home.svg"></img>
          </Link>

          <Link
            href="/Profile"
            className="Link Flex Center"
            onClick={() => {
              setSwipe('6rem');
            }}>
            <img className="Icon" src="/Profile.svg"></img>
          </Link>

          <motion.div className="NavBall" initial={{ x: pos }} animate={{ x: swipe }}></motion.div>
        </div>
      </div>
    </>
  );
}
