import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import AddressLink from "../AddressLink";
import BookingDates from "../BookingDates";
import PlaceGallery from "../PlaceGallery";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
import { differenceInCalendarDays } from "date-fns";

export default function BookingPage() {
    const { t } = useTranslation();
    const classNames = i18n.language === 'en' ? 'style-en-no-bradius' : i18n.language === 'bg' ? 'style-bg-no-bradius' : 'style-de-no-bradius'
    useEffect(() => {
        // 👇️ scroll to top on page load
        window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
      }, []);

    //we can grab the id from the url and use it as a parameter
    const { id } = useParams();
    const [booking, setBooking] = useState(null);



    useEffect(() => {
        if (id) {
            // grabbing all bookings for the user
            axios.get('/bookings').then(response => {
                // find only the one that we need (_id matches param id in link)
                const foundBooking = response.data.find(({ _id }) => _id === id);
                if (foundBooking) {
                    setBooking(foundBooking);
                }
            });
        }
    }, [id])

    if (!booking) {
        return '';
    }

    const nights = differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn));

    return (
        
        <div className="my-8 max-w-[74rem] mx-auto">
            <h1 className="text-3xl mt-4">{booking.place.title}</h1>
            <AddressLink className="my-2 block">{booking.place.address}</AddressLink>
            <div className="bg-gray-200 p-4 my-6 rounded-2xl flex items-center justify-between">
                <div>
                    <h2 className="text-2xl mb-3 font-semibold">{t('booking_information_header')}</h2>
                    <BookingDates className="text-lg font-medium" booking={booking} />
                </div>
                <div className={`${classNames} p-4 rounded-2xl ${i18n.language === 'de' ? 'bg-[#ffd140] ' : ''}`}>
                    <div className="text-2xl font-medium text-center">{i18n.language === 'bg' ? booking.place.price * 2 * nights : nights * booking.place.price}<span> {t('place_booking_currency')}</span></div>
                    <div className="text-xl font-medium text-center mt-2">{t('booking_information_total_price')}</div>
                </div>
            </div>
            <PlaceGallery place={booking.place} />
            {/* <div className="list-none">
                {booking.place.perks.map((value, index) => {
                    return <li key={index}>
                        {value}
                    </li>
                })}
            </div> */}
        </div>
    )
}