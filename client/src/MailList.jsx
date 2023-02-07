import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function MailList() {
    const classNames = i18n.language === 'en' ? 'style-en-mail' : i18n.language === 'bg' ? 'style-bg-mail' : 'style-de-mail'
    const classNames2 = i18n.language === 'en' ? 'text-white' : i18n.language === 'bg' ? 'text-white' : 'text-black'
    const { t } = useTranslation()

    return (
        <div className={`${classNames} mail py-20 mb-10 ${i18n.language === 'bg' ? 'mt-0 ' : ' mt-30 '} `}>
            <h1 className={`${classNames2} mailTitle text-3xl `}>{t('mail_list_header')}</h1>
            <span className={`${classNames2} mailDesc text-xl `}>{t('mail_list_text')}</span>
            <div className="mailInputContainer">
                <input className={`${classNames2}`} type="text" placeholder="email@example.com" />
                <Link className={`${classNames2} text-xl  underline underline-offset-4`} to={'/login'}>{t('mail_list_subscribe')}</Link>
            </div>
        </div>
    )
}