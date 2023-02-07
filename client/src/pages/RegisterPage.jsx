import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);

    const { t } = useTranslation()
    const classNames = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'
    async function registerUser(ev) {
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            //alert('Registration successful. You can now log in.');
            setRedirect(true);
        } catch (err) {
            alert('Registration failed. Please try again.');
        }
    }

    if (redirect) {
        return <Navigate to="/login" />;
    }

    

    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">{t('register_header')}</h1>
                <form className="max-w-md mx-auto" onSubmit={registerUser}>
                    <h2>{t('register_name_input_placeholder')}</h2>
                    <input type="text" placeholder={t('register_name_input_placeholder')}
                        value={name}
                        onChange={ev => setName(ev.target.value)} />
                    <h2>{t('register_email_input_placeholder')}</h2>
                    <input type="email" placeholder="your@email.com"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                        <h2>{t('register_password_input_placeholder')}</h2>
                    <input type="password" placeholder={t('register_password_input_placeholder')}
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className={`${classNames} text-lg w-full`}>{t('register_submit_button_text')}</button>
                    <div className="text-center py-2">{t('register_already_registered_text')}<Link className="underline text-black" to='/login'>{t('register_to_login_text')}</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}