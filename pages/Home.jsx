import LayoutHome from '../components/LayoutHome';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { TransitionElement } from '../components/TransitionElement';

export default function Home() {
  const filters = ['FOOD', 'POKE', 'PIZZA', 'SUSHI', 'PASTA', 'MEXICAN', 'DRINK'];
  const [selectedFilter, setSelectedFilter] = useState(filters[0]);

  return (
    <>
      <div
        className="Full Flex Column"
        style={{ height: '8.5rem', padding: '3rem 3rem 0', alignItems: 'flex-start', gap: '1rem' }}>
        <TransitionElement>
          <p className="Bold SubTitle"> Hello Amanda! </p>
        </TransitionElement>

        <p className="Thin Mid"> Check new incentives for you. </p>
      </div>

      <div className="Flex Container">
        <nav>
          <ul className="Flex Center Filters" style={{ gap: '1rem', padding: '0 3rem' }}>
            {filters.map(item => (
              <li
                key={item}
                className={item == selectedFilter ? 'Flex Center Mid Filter selected' : 'Flex Center Mid Filter'}
                onClick={() => setSelectedFilter(item)}>
                {item}
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="Flex Center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedFilter ? selectedFilter : 'empty'}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}>
            <div className="Full Flex Column Feed" style={{ gap: '3rem' }}>
              <img className="Full imgTry" src="/Poke.jpg"></img>
              <img className="Full imgTry" src="/Pizza.jpg"></img>
              <img className="Full imgTry" src="/Pasta.jpg"></img>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}

Home.getLayout = function getLayout(page) {
  return <LayoutHome>{page}</LayoutHome>;
};
