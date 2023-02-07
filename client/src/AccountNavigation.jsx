import { Link, useLocation } from "react-router-dom";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
export default function AccountNavigation() {
    const classNames = i18n.language === 'en' ? 'style-en-no-padding' : i18n.language === 'bg' ? 'style-bg-no-padding' : 'style-de-no-padding'
    //we can use this hook to get e.g /places from /account/places link
    const { pathname } = useLocation();
    const { t } = useTranslation()
    function linkClasses(type = null) {
        // will be empty for /account
        // will have a result for /account/places
        let subpage = pathname.split("/")?.[2];

        // when we are on /account page, subpage is undefined and we can
        // give it the value 'profile' so the classes are linked to that Link type
        if (subpage === undefined) {
            subpage = 'profile';
        }
        
        let classes = 'inline-flex gap-1 py-2 px-6 rounded-full';
        if (type === subpage) {
            classes = classes + ' font-semibold ' + classNames ;
        } else {
            classes += ' bg-gray-200';
        }
        return classes;
    }

    
    
    return (
        <nav className="w-full flex justify-center mt-8 gap-2 mb-8">
            <Link className={linkClasses('profile')} to={'/account'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                </svg>
                {t('profile_my_profile')}
            </Link>
            <Link className={linkClasses('bookings')} to={'/account/bookings'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
                {t('profile_my_bookings')}
            </Link>
            <Link className={linkClasses('places')} to={'/account/places'}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
                </svg>
                {t('profile_my_places')}
            </Link>
        </nav>
    );
}