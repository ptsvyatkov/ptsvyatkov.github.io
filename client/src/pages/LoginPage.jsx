import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";

export default function LoginPage() {

    const classNames = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState(false);
    const { setUser } = useContext(UserContext);

    const { t } = useTranslation();

    async function submitLogin(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', { email, password }, { withCredentials: true });
            setUser(data);
            setRedirect(true);
        } catch (err) {
            alert('Invalid e-mail');
        }
    }

    if (redirect) {
        return <Navigate to="/account" />;
    }

    return (
        <div className="max-w-[20rem] m-auto grow flex items-center justify-around">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-4">{t('login_header')}</h1>
                <form className="max-w-md mx-auto" onSubmit={submitLogin}>
                    <label className="ml-1" htmlFor="email">{t('login_email_input_label')}</label>
                    <input type="email"
                        placeholder={"your@email.com"}
                        value={email}
                        onChange={ev => setEmail(ev.target.value)} />
                    <label className="ml-1 mt-1" htmlFor="password">{t('login_password_input_label')}</label>
                    <input className="" type="password"
                        placeholder={t('login_password_input_placeholder')}
                        value={password}
                        onChange={ev => setPassword(ev.target.value)} />
                    <button className={`${classNames} w-full p-2`}>{t('login_submit_button_label')}</button>
                    <div className="text-center py-2">{t('login_no_account_text')}<Link className="underline underline-offset-2 text-black" to="/register">{t('login_register_now_text')}</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}