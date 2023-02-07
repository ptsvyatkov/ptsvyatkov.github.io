import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import PlaceImg from "../PlaceImg";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";

// Displays the link to add new place and list of all places
export default function PlacesPage() {
    const { t } = useTranslation()
    const classNames = i18n.language === 'en' ? 'style-en-no-padding' : i18n.language === 'bg' ? 'style-bg-no-padding' : 'style-de-no-padding'
    const [places, setPlaces] = useState([]);

    // Gets all places from the database
    // {data} is a list of our places
    useEffect(() => {
        axios.get('/user-places').then(({ data }) => {
            setPlaces(data);
        });
    }, []); // empty array means no dependencies
    return (
        <div>
            <AccountNavigation />

            <div className="mt-18">
                <div className="text-center">
                    <Link className={`${classNames} inline-flex gap-1 font-semibold py-2 px-4 rounded-full mt-2`} to={'/account/places/new'}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                        {t('places_add_new_place_button_text')}
                    </Link>
                </div>
                {places.length > 0 && places.map((place, index) => (

                    <Link to={'/account/places/' + place._id} key={index} className=" flex my-6 max-w-[54rem] mx-auto cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl">
                        <div className="flex w-32 h-32 bg-gray-300 grow-1 shrink-0 rounded-2xl overflow-hidden">
                            <PlaceImg place={place} />
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">
                                {place.title}
                            </h2>
                            <p className="text-sm mt-2">{place.description}</p>
                        </div>

                    </Link>
                ))}
                {places.length === 0 &&
                    <div>
                        <div className="text-center text-2xl font-semibold mt-12" >
                            <h1 className="leading-10"> {t('places_no_places_text')} </h1>
                            <h2 className="leading-10">{t('places_add_first_place_text')}</h2>
                        </div>

                    </div>
                }

            </div>
        </div>
    );
}