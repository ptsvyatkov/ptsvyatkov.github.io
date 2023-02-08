import axios from "axios";
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom";
import MailList from "../MailList";
import Footer from "../Footer";
import FeaturedPlaces from "../FeaturedPlaces";
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
import WhyChooseUs from "../WhyChooseUs";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filteredData, setFilteredData] = useState([]);

    const { t } = useTranslation();

    useEffect(() => {
        axios.get('/places').then(response => {
            setPlaces(response.data);
        });
    }, []);

    useEffect(() => {
        setLoading(true);
        const fetchPlaces = async () => {
            const res = await axios.get(`/addresses/?q=${query}`);
            setData(res.data);
        };
        setLoading(false);
        if (query.length === 0 || query.length > 2) fetchPlaces();
    }, [query]);

    // useEffect(() => {
    //     setFilteredData(places.filter(place => place.price < 50));
    // }, [places, query])

    const buttonFetchPlaces = async (e) => {
        const res = await axios.get(`/addresses/?q=${query}`);
        setData(res.data);
    }

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            buttonFetchPlaces();
        }
    }

    const inputRef = useRef(null);
    const resetSearchInput = () => {
        inputRef.current.value = "";
        setQuery('');
    }

    const classNames = i18n.language === 'en' ? 'style-en' : i18n.language === 'bg' ? 'style-bg' : 'style-de'
    const classNames2 = i18n.language === 'en' ? 'style-en-search' : i18n.language === 'bg' ? 'style-bg-search' : 'style-de-search'

    return (

        <div>
            <div className="leading-4 text-left text-sm font-serif -mt-1 px-16 position-relative bottom-6">
                <div>{t('website_description1')}</div><div>{t('website_description2')}</div>
            </div>
            <div className={`${classNames2} -mt-5 flex max-w-[17rem] md:max-w-[20rem] lg:max-w-[24rem] outline-0 mx-auto gap-2  rounded-full py-2 px-4 text-center hover:shadow-lg shadow-gray-400 font-medium`}>
                <button onClick={buttonFetchPlaces} type="submit" className={classNames}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
                <input className="outline-0 grow"
                    placeholder={t('search_location_placeholder')}
                    ref={inputRef}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={handleKeyDown}>

                </input>
                <button hidden={query.length === 0} onClick={resetSearchInput} className="flex bg-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </div>
            <div className="ml-6 mt-10 mb-10 grid gap-x-5 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {data.length > 0 && data.map((place, index) => (

                    <Link to={'/place/' + place._id} key={index}>
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover aspect-square" src={'http://localhost:3000/uploads/' + place.photos?.[0]} alt={place.title} />
                            )}
                        </div>
                        <h2 className="font-bold ml-1 mb-0.5">{place.address}</h2>
                        <h3 className="text-sm ml-1 leading-4 text-gray-600 mb-0.5"> {place.title}</h3>
                        <div className="">
                            <span className="font-medium text-lg ml-1">{i18n.language === 'bg' ? Math.ceil(place.price * 2) : place.price}</span> {t('index_price_per_night')}
                        </div>
                    </Link>
                ))}
            </div>
            {(data.length === 0 &&
                <div className="text-2xl max-w-[60rem] min-w-[15rem] m-auto text-center">
                    <h1>Sorry, there are no places available at that location yet.</h1>
                    <button className="mt-2 mb-96 flex bg-white font-bold text-3xl items-center mx-auto"
                        hidden={query.length < 3 && data.length > 0}
                        onClick={resetSearchInput}>
                        <span className="flex font-semibold text-4xl">&larr;</span> Back to view all available places
                    </button>

                </div>

            )}
            {query.length === 0 && (
                <FeaturedPlaces />
            )}
            <div className="mx-12 mb-40 mt-6 grid gap-x-5 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3" >

                {query.length === 0 && data.length > 0 && data.slice(0, 3).map((place, index) => (

                    <Link to={'/place/' + place._id} key={index}>
                        <div className="bg-gray-500 mb-2 rounded-2xl flex">
                            {place.photos?.[0] && (
                                <img className="h-[22rem] grow rounded-2xl object-cover aspect-square" src={'http://localhost:3000/uploads/' + place.photos?.[0]} alt={place.title} />
                            )}
                        </div>
                        <h2 className="font-bold">{place.address}</h2>
                        <h3 className="text-sm leading-4 text-gray-500"> {place.title}</h3>
                        <div className="mt-0.5">
                            <span className="font-bold">{i18n.language === 'bg' ? Math.ceil(place.price * 2) : place.price}</span> {t('index_price_per_night')}
                        </div>
                    </Link>
                ))}
            </div>

            {i18n.language === 'de' && (
                <div>
                    <WhyChooseUs />
                    <div className="h-[22rem] mt-10 mb-10 grid gap-x-2 mx-2 gap-y-8 grid-cols-2">
                        <div className="bg-gray-500 mb-2 overflow-hidden flex">
                            <img className="object-cover grow" src="/assets/images/photo-idv1.avif" />
                        </div>
                        <div className="bg-gray-500 mb-2 overflow-hidden flex">
                            <img className="grow object-cover" src="/assets/images/photo-idv2.avif" />
                        </div>
                    </div>
                    <MailList />
                </div>
            )}
            {i18n.language === 'bg' && (
                <div>
                    <div className="h-[22rem] mt-80 mb-4 grid gap-x-2 mx-2 gap-y-8 grid-cols-2">
                        <div className="bg-gray-500 mb-2 overflow-hidden flex">
                            <img className="object-cover grow" src="/assets/images/photo-nonidv1.avif" />
                        </div>
                        <div className="bg-gray-500 mb-2 overflow-hidden flex">
                            <img className="grow object-cover" src="/assets/images/photo-nonidv2.jpg" />
                        </div>
                    </div>
                    <MailList />
                </div>
            )}
            {i18n.language === 'en' && (
                <MailList />
            )}
            <Footer />
        </div>
    )
}