import axios from "axios";
import { createContext, useEffect, useState } from "react";
import  cookies from 'js-cookie';
import { Navigate } from "react-router-dom";
export const UserContext = createContext({});
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
export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    let [language, setLanguage] = useState("");
    const [redirect, setRedirect] = useState('');

    useEffect(() => {
        const currentLanguageCode = cookies.get('i18next') || 'en';
        const currentLanguage = supportedLanguages.find(l => l.code === currentLanguageCode);
        language = currentLanguage? currentLanguage.code : 'en';
        document.querySelector('html').setAttribute('lang', language);
        setLanguage(language);
    }, [language])

    

    useEffect(() => {
        if (!user) {
            axios.get('/profile').then(({ data }) => {
                setUser(data);
                setReady(true);
            });
        }
    }, []);

    return (
        <UserContext.Provider value={{ user, setUser, ready, language,setLanguage }}>
            {children}
        </UserContext.Provider>
    );
}