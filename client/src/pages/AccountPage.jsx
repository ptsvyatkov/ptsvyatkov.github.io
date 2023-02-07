import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import { UserContext } from "../UserContext";
import PlacesPage from "./PlacesPage";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";

export default function ProfilePage() {
    const [redirect, setRedirect] = useState(null);
    const { ready, user, setUser } = useContext(UserContext);
    let { subpage } = useParams();
    
    const { t } = useTranslation();
    const classNames = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setRedirect('/');
        setUser(null);
    }

    if (!ready) {
        return 'Loading...';
    }

    if (ready && !user && !redirect) {
        return <Navigate to={'/login'} />;
    }

    if (redirect) {
        return <Navigate to={redirect} />;
    }

    
    return (
        <div>
            <AccountNavigation/>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto text-lg font-medium">
                    {t('profile_logged_in_as')} {user.name} ({user.email})<br />
                    <button onClick={logout} className={`${classNames}  w-full p-2 max-w-[8rem] sm:max-w-[8rem] md:max-w-[10rem] lg:max-w-[12rem] mt-2 font-semibold`}>{t('profile_logout_button_text')}</button>
                </div>
            )}
            {subpage === 'places' && (
                <PlacesPage />
            )}
        </div>
    );
}