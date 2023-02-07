import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import Perks from "../Perks";
import PhotosUploader from "../PhotosUploader";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";


export default function PlacesFormPage() {
    const { t } = useTranslation();
    const classNames = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [addedPhotos, setAddedPhotos] = useState([]);
    const [description, setDescription] = useState("");
    const [perks, setPerks] = useState([]);
    const [extraInfo, setExtraInfo] = useState("");
    const [checkIn, setCheckIn] = useState("");
    const [checkOut, setCheckOut] = useState("");
    const [maxGuests, setMaxGuests] = useState(1);
    const [price, setPrice] = useState(0);
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        if (!id) {
            return;
        }
        // the response has all the data about the place so we can pack it and use it in our state
        axios.get('/places/' + id)
            .then(response => {
                const { data } = response;
                setTitle(data.title);
                setAddress(data.address);
                setAddedPhotos(data.photos);
                setDescription(data.description);
                setPerks(data.perks);
                setExtraInfo(data.extraInfo);
                setCheckIn(data.checkIn);
                setCheckOut(data.checkOut);
                setMaxGuests(data.maxGuests);
                setPrice(data.price);
            });
    }, [id]); // only dependency is the id from the params

    // function inputHeader(text) {
    //     return (
    //         <h2 className="text-2xl font-semibold mt-4">{text}</h2>
    //     );
    // }

    // function inputDescription(text) {
    //     return (
    //         <p className="text-gray-500 text-md">{text}</p>
    //     )
    // }

    // function preInput(header, description) {
    //     return (
    //         <>
    //             {inputHeader(header)}
    //             {inputDescription(description)}
    //         </>
    //     );
    // }

    // To add new features to a place, include the state above and 
    // add the new feature to the model in api/models/Place
    async function savePlace(ev) {
        ev.preventDefault();
        const placeData = {
            title, address, addedPhotos,
            description, perks, extraInfo,
            checkIn, checkOut, maxGuests, price
        };
        if (id) {
            // update a place matching the id
            await axios.put('/places', {
                id, ...placeData
            });
            setRedirect(true);
        } else {
            // sends a request to the backend to create a new place in the database
            await axios.post('/places', placeData);
            setRedirect(true);
        }
    }

    if (redirect) {
        return <Navigate to={'/account/places'} />
    }

    return (
        <div className="sm:max-w[12rem] lg:max-w-[60%] m-auto">
            <AccountNavigation />
            <form onSubmit={savePlace}>

                <h2 className="text-2xl font-semibold mt-4">{t('form_place_title')}</h2>
                <p className="text-gray-500 text-md">{t('form_place_title_description')}</p>
                <input type="text" value={title} onChange={ev => setTitle(ev.target.value)} placeholder={t('form_place_title_placeholder')} />

                <h2 className="text-2xl font-semibold mt-4">{t('form_place_location')}</h2>
                <p className="text-gray-500 text-md">{t('form_place_location_description')}</p>
                <input type="text" value={address} onChange={ev => setAddress(ev.target.value)} placeholder={t('form_place_location_placeholder')} />

                <h2 className="text-2xl font-semibold mt-4">{t('form_place_pictures')}</h2>
                <p className="text-gray-500 text-md">{t('form_place_pictures_description')}</p>
                <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

                <h2 className="text-2xl font-semibold mt-4">{t('form_place_description_heading')}</h2>
                <p className="text-gray-500 text-md">{t('form_place_description_description')}</p>
                <textarea placeholder={t('form_place_description_placeholder')} value={description} onChange={ev => setDescription(ev.target.value)} />

                <h2 className="text-2xl font-semibold mt-4">{t('form_place_features')}</h2>
                <p className="text-gray-500 text-md">{t('form_place_features_description')}</p>
                <div className="grid grid-cols1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-2">
                    <Perks selected={perks} onChange={setPerks} />
                </div>

                <h2 className="text-2xl font-semibold mt-4">{t('form_place_extra_info')}</h2>
                <p className="text-gray-500 text-md">{t('form_place_extra_info_description')}</p>
                <textarea placeholder={t('form_place_extra_info_placeholder')} value={extraInfo} onChange={ev => setExtraInfo(ev.target.value)} />

                <h2 className="text-2xl font-semibold mt-4">{t('form_place_check_in_out_guests_price')}</h2>
                <p className="text-gray-500 text-md">{t('form_place_check_in_out_guests_price_description')}</p>
                <div className="grid gap-2 grid-cols-2 md:grid-cols-4">
                    <div className="">
                        <h3 className="mt-2">{t('form_place_check_in_available_from')}</h3>
                        <input type="date"
                            className="outline outline-1 outline-gray-300 rounded-2xl outline-offset-4 mt-2.5"
                            value={checkIn}
                            onChange={ev => setCheckIn(ev.target.value)}
                        />
                    </div>
                    <div>
                        <h3 className="mt-2">{t('form_place_check_in_available_until')}</h3>
                        <input type="date"
                            className="outline outline-1 outline-gray-300 rounded-2xl outline-offset-4 mt-2.5"
                            value={checkOut}
                            onChange={ev => setCheckOut(ev.target.value)}
                            placeholder="11" />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 ">{t('form_place_max_guest')}</h3>
                        <input type="number"
                            value={maxGuests}
                            onChange={ev => setMaxGuests(ev.target.value)} />
                    </div>
                    <div>
                        <h3 className="mt-2 -mb-1 ">{t('form_place_price_per_night')}{t('form_place_currency')}</h3>
                        <input type="number" currency="EUR" prefix="$"
                            value={price}

                            onChange={ev => setPrice(ev.target.value)} />
                    </div>
                </div>
                <button className={`${classNames} mt-3 mb-10 min-w-[28rem] flex items-center mx-auto justify-center  float-center text-lg`}>
                    {!id && (
                            t('form_place_save_button_text')
                        )} {id && t('form_place_edit_button_text')}
                </button>
            </form>
        </div>
    );

}