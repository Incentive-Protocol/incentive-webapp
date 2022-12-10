import Head from 'next/head';
import Link from 'next/link';

import LayoutEntry from '../components/LayoutEntry';
import { TransitionStart } from '../components/TransitionStart';
import SearchBar from '../elements/SearchBar';

export default function Entry() {
  return (
    <>
      <Head>
        <title> Incentive </title>
        <link rel="icon" href="/Ball.svg" />
        <meta name="description" content="Incentive Protocol" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </Head>

      <TransitionStart>
        <SearchBar />

        <div className="Flex Column Center" style={{ marginTop: '0.5rem', gap: '4rem' }}>
          <div className="Flex Column Center" style={{ gap: '1rem' }}>
            <img className="IconLogin" src="/Login.svg"></img>

            <p className="Thin Small">
              {' '}
              Already of us?
              <Link href="/Login" className="Link">
                <span className="Bold Action">
                  {' '}
                  <u>Login</u>
                </span>
              </Link>
            </p>
          </div>

          <div className="Flex Column Center" style={{ gap: '1rem' }}>
            <img className="IconRegister" src="/Register.svg"></img>

            <p className="Thin Small">
              {' '}
              New here?
              <Link href="/Register" className="Link">
                <span className="Bold Action">
                  {' '}
                  <u>Register</u>
                </span>
              </Link>
            </p>
          </div>
        </div>
      </TransitionStart>
    </>
  );
}

Entry.getLayout = function getLayout(page) {
  return <LayoutEntry>{page}</LayoutEntry>;
};
