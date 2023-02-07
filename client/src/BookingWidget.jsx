import { useContext, useEffect, useState } from "react";
import { differenceInCalendarDays } from "date-fns";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./UserContext";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";

export default function BookingWidget({ place }) {
    const { t } = useTranslation();
    const classNames = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'

    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [redirect, setRedirect] = useState('');
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
        }
    }, [user]);

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    const alertLogin = t('place_booking_please_login')
    async function bookPlace() {
        if (!user) {
            return;
        }
        const response = await axios.post('bookings', {
            user, checkIn, checkOut, numberOfGuests, name, phone,
            place: place._id,
            price: numberOfNights * place.price
        });
        const bookingId = response.data._id; // _id because in backend api /bookings we respond with the whole object/doc --> res.json(doc)
        // after we have the id, we want to redirect to the specific booking
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) {
        return <Navigate to={redirect} />
    }

    return (
        <div className="bg-white shadow p-4 rounded-2xl">
            <div className="text-2xl text-center">
                {t('place_price')} {i18n.language === 'bg' ? Math.ceil(place.price * 2) : place.price}{t('place_per_night')}
            </div>
            <div className="border rounded-2xl mt-4">
                <div className="flex">
                    <div className="py-3 px-3">
                        <label>{t('place_booking_check_in_date')}</label>
                        <input type="date"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}></input>
                    </div>
                    <div className="py-3 px-3 border-l">
                        <label>{t('place_booking_check_out_date')}</label>
                        <input type="date"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}></input>
                    </div>
                </div>
                <div>
                    <div className="py-3 px-3 border-t">
                        <label>{t('place_booking_max_guest')}</label>
                        <input type="number"
                            value={numberOfGuests}
                            onChange={ev => setNumberOfGuests(ev.target.value)} ></input>
                    </div>
                </div>
                {numberOfNights > 0 && (
                    <div className="py-3 px-3 border-t">
                        <label className="text-lg">{t('place_booking_fullname')}</label>
                        <input type="text"
                            value={name}
                            onChange={ev => setName(ev.target.value)} ></input>
                        <label className="text-lg">{t('place_booking_phone')}</label>
                        <input type="tel"
                            value={phone}
                            placeholder={"123 456 789"}
                            onChange={ev => setPhone(ev.target.value)} ></input>
                    </div>
                )}
            </div>

            {numberOfNights > 0 && (
                <div className="flex">
                    <div className="mt-4 text-xl mx-auto">
                        {t('place_booking_total_price')}<span> {i18n.language === 'bg' ? numberOfNights * place.price * 2 : place.price} </span> {t('place_booking_currency')}
                    </div>
                    <button onClick={bookPlace} className={`${classNames} px-3 mx-auto flex max-w-[10rem] mt-4 mb-2 ${i18n.language === 'bg' ? ' max-w-[6rem] min-w-[4rem] px-4 font-semibold text-lg ' : ''}`}>
                        {t('place_booking_buy_button')}
                    </button>
                </div>
            )}

        </div>
    )
}