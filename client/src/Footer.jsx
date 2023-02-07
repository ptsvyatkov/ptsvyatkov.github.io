import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import ModalHeader from 'react-bootstrap/esm/ModalHeader';
import DataProtectionModal from './modals/DataProtectionModal';
import ImprintModal from './modals/ImprintModal';
import AboutUsModal from './modals/AboutUsModal';


export default function Footer() {
    const [modalShow, setModalShow] = useState(false);
    const [modalShow2, setModalShow2] = useState(false);
    const [modalShow3, setModalShow3] = useState(false);


    return (
        <div>
            <div className="footer pt-20 mb-4 text-center">
                <div className="mb-4 items-end">
                    <ul className="flex gap-10 items-end">
                        <div>
                        </div>
                        <div>
                            <button onClick={() => setModalShow(true)} className="bg-white underline">Imprint</button>
                            <ImprintModal
                                show={modalShow}
                                onHide={() => setModalShow(false)}
                            />
                        </div>
                        <div>
                            <button onClick={() => setModalShow2(true)} className="bg-white underline">Data protection</button>
                            <DataProtectionModal
                                show={modalShow2}
                                onHide={() => setModalShow2(false)}
                            />
                        </div>
                        <li className="fListItem">Cookies</li>
                        <div>
                            <button onClick={() => setModalShow3(true)} className="bg-white underline">About Us</button>
                            <AboutUsModal
                                show={modalShow3}
                                onHide={() => setModalShow3(false)}
                            />
                        </div>
                    </ul>
                </div>
                <div className="fText">Copyright 2023</div>
            </div>
        </div>
    )
}