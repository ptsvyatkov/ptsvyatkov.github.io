import axios from "axios";
import { format } from "date-fns";
import { enGB, de, bg } from 'date-fns/locale'
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";
import { useTranslation } from 'react-i18next'


export default function PlacePage() {
    const { t } = useTranslation();
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    

    //id is the dependency, meaning when the id changes we want to run the useEffect hook again
    useEffect(() => {
        if (!id) {
            return;
        }
        axios.get(`/places/${id}`).then(response => {
            setPlace(response.data);
        });
    }, [id]);

    if (!place) return '';

    

    return (
        <div className="max-w-[78rem] mx-auto mt-10 bg-gray-100 -mx-8 px-8 pt-8 rounded-2xl">
            <h1 className="text-3xl">{place.title}</h1>
            <AddressLink>{place.address}</AddressLink>
            <PlaceGallery place={place}/>
            <div className="mt-8 mb-8 gap-8 grid grid-cols-1 md:grid-cols-[2fr_1fr]">
                <div className="font-bold">
                    <div className="my-3 font-normal">
                        <h2 className="font-semibold text-2xl">{t('place_description')}</h2>
                        {place.description}
                    </div>
                    {t('place_desc_check_in_date')} {format(new Date(place.checkIn), 'dd-MM-yyyy', {locale: bg})}<br />
                    {t('place_desc_check_out_date')} {format(new Date(place.checkOut), 'dd-MM-yyyy', {locale:bg})}<br />
                    {t('place_desc_max_guest')} {place.maxGuests}

                </div>
                <div>
                    <BookingWidget place={place} />
                </div>
            </div>
            <div className="bg-white -mx-8 px-8 py-8 border-t">
                <div>
                    <h2 className="font-semibold text-2xl">{t('place_extra_info_header')}</h2>
                </div>
                <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">
                    {place.extraInfo}
                </div>
            </div>
            <div>
                
            </div>
        </div>
    )
}