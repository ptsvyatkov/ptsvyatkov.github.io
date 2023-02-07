import { useTranslation } from "react-i18next";
import i18n from "i18next";

export default function FeaturedPlaces(className) {
    const { t } = useTranslation()
    const classNames = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'
    
    return (
        <div className={`${classNames} mx-auto items-center px-10 py-2 mt-20 rounded-2xl max-w-[30rem]`}>

            <h1 className="text-center mx-1 text-3xl">{t('index_featured_places')}</h1>

        </div>
    )
}