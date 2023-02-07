import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import BookingDates from "../BookingDates";
import PlaceImg from "../PlaceImg";
import { useTranslation } from 'react-i18next'
export default function BookingsPage() {
    const { t } = useTranslation()
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        // inside the response we will have bookings
        axios.get('/bookings').then(response => {
            setBookings(response.data);
        });
    }, []);

    return (
        <div>
            <AccountNavigation />

            <div className="max-w-[64rem] mx-auto">
                {bookings?.length > 0 && bookings.map((booking,index) => (
                    <Link to={`/account/bookings/${booking._id}`} key={index} className="flex gap-4 mt-2 bg-gray-200 rounded-2xl overflow-hidden">
                        <div className="w-60">
                            <PlaceImg place={booking?.place} />
                        </div>
                        <div className="py-2 pr-3 grow">
                            <h2 className="text-xl font-semibold">{booking?.place?.title}</h2>
                            <div className="text-xl">
                                <BookingDates booking={booking} className="mb-2 mt-3 text-gray-600" />
                                <div className="flex gap-1 text-2xl">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                    <div>{t('booking_information_total')} {booking?.price} {t('place_booking_currency')}</div>
                                </div>
                            </div>
                        </div>
                    </Link >
                ))}
                {bookings?.length === 0 && (
                    <div className="text-center text-2xl font-semibold mt-12" >
                        <h1 className="leading-10"> {t('bookings_no_bookings_text')} <br /> </h1>
                        <h2 className="leading-10">{t('bookings_proceed_to_homepage_1')} <Link to={'/'} className="underline underline-offset-8" >{t('bookings_proceed_to_homepage_homepage')}</Link>{t('bookings_proceed_to_homepage_2')}</h2>
                    </div>
                )}
            </div>
        </div>
    )
}