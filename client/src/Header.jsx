import i18next from 'i18next'
import { useContext, useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import cookies from 'js-cookie';
import i18n from "i18next";
const supportedLanguages = [
  {
    code: 'en',
    name: 'English',
    country_code: 'GB'
  },
  {
    code: 'de',
    name: 'Deutsch',
    country_code: 'DE'
  },
  {
    code: 'bg',
    name: 'Български',
    country_code: 'BG'
  }
];

export default function Header() {
  const classNames2 = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'
  const { user } = useContext(UserContext);
  const currentLanguageCode = cookies.get('i18next') || 'en';
  const currentLanguage = supportedLanguages.find(l => l.code === currentLanguageCode);

  const { t } = useTranslation()
  const classNames = i18n.language === 'en' ? 'style-en-text' : i18n.language === 'bg' ? 'style-bg-text' : 'style-de-text'
  return (
    <div>
    <header className="flex justify-between items-center mb-4 mt-2 mx-8">
      <Link to={'/'} className="flex items-center gap-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503 3.498l4.875-2.437c.381-.19.622-.58.622-1.006V4.82c0-.836-.88-1.38-1.628-1.006l-3.869 1.934c-.317.159-.69.159-1.006 0L9.503 3.252a1.125 1.125 0 00-1.006 0L3.622 5.689C3.24 5.88 3 6.27 3 6.695V19.18c0 .836.88 1.38 1.628 1.006l3.869-1.934c.317-.159.69-.159 1.006 0l4.994 2.497c.317.158.69.158 1.006 0z" />
        </svg>
        <div className={`font-bold text-2xl ${classNames}`}>Tourjourney</div>
      </Link>
      {/* <div className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 font-medium">
          <div>{t('search_location')}</div>
          <div className="border-l border-gray-300"></div>
          <div>{t('choose_date')}</div>
          <div className="border-l border-gray-300"></div>
          <div>{t('occupancy')}</div>
          <button className="bg-bg text-white p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </button>
        </div> */}
      <div className='flex items-center'>
        <button className="for-globe btn-link mx-3" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
          </svg>
        </button>
        <ul className="dropdown-menu">
          <span className="dropdown-item-text border-b-2">{t('language')} </span>
          {supportedLanguages.map(({ code, name, country_code }) => (
            <li key={country_code}>
              <button className="dropdown-item"
                onClick={() => i18next.changeLanguage(code)}
                disabled={code === currentLanguageCode}>
                <span className={``}
                  style={{ opacity: code === i18next.language ? 0.5 : 1 }}></span>
                {name}
              </button>
            </li>
          ))}
        </ul>
        <Link to={user ? '/account' : '/login'} className="mx-auto flex items-center gap-2 rounded-full py-2 px-2">
          {!user && <span className="font-semibold text-lg">{t('index_login')}</span>}
          <div className={`${classNames2} overflow-hidden items-center`}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 relative top-1">
              <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
            </svg>
          </div>
          {!!user && (
            <div className='mx-auto flex items-center gap-2 rounded-full py-2 '>
              <span className='text-md font-medium'>{user.name}</span>

            </div>
          )}
        </Link>
      </div>
    </header>
    </div>
  );
}