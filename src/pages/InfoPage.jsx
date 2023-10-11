import {useContext, useState} from 'react';
import { useParams } from "react-router-dom";
import {Link} from "react-router-dom";
const statuses = { Disponible: 'text-green-400 bg-green-400/10', Erreur: 'text-rose-400 bg-rose-400/10', Running: 'text-blue-400 bg-blue-400/10', Finis: 'text-purple-400 bg-purple-400/10' }
import {Datacontext} from "../App.jsx";
import {pausePrinting, stopPrinting} from "../services/changeStatus.js";
import {plateauTemp, buseTemp} from "../services/changeTemp.js";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line react/prop-types
export function InfoPage() {
    const { data, setOpen } = useContext(Datacontext);
    const { nom } = useParams();
    const dataPrinter = data.find((item) => item.name === nom);

    const [isAccordionOpen, setAccordionOpen] = useState(false);
    const [buseValue, setBuseValue] = useState(dataPrinter.buse);
    const [plateauValue, setPlateauValue] = useState(dataPrinter.plateau);

    const toggleAccordion = () => {
        setAccordionOpen(!isAccordionOpen);
    };

    const handleBuseChange = (event) => {
        const newValue = Math.min(Math.max(parseInt(event.target.value), 80), 220); // Limite la valeur entre 80 et 220
        setBuseValue(newValue);
    };

    const handlePlateauChange = (event) => {
        const newValue = Math.min(Math.max(parseInt(event.target.value), 0), 110); // Limite la valeur entre 0 et 110
        setPlateauValue(newValue);
    };

    const handlePauseButton = () => {
        const res = pausePrinting();
        console.log(res);
    }

    const handleStopButton = () => {
        const res = stopPrinting();
        console.log(res);
    }

    const handleUpdateTemp = () => {
        if (dataPrinter.plateau !== plateauValue) {
            const res = plateauTemp(plateauValue);
            console.log(res);
        }
        if (dataPrinter.buse !== buseValue) {
            const res = buseTemp(buseValue);
            console.log(res);
        }
        setOpen(false);
    }

    return (
        <div className={"h-full w-full flex flex-col items-center"}>
            <div className={"h-full w-full"}>
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-4">
                        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                            <div className={classNames(statuses[dataPrinter.status], 'flex-none rounded-full p-1')}>
                                <div className="h-1.5 w-1.5 rounded-full bg-current" />
                            </div>
                            <div className="text-gray-600 block">{dataPrinter.status}</div>
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                                Température Buse
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={dataPrinter.buse+'°C'}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-3">
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                                Température Plateau
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={dataPrinter.plateau+'°C'}
                                disabled={true}
                            />
                        </div>
                    </div>

                    <div className="sm:col-span-6">
                        <div className="rounded-md mb-6 h-5 w-full bg-gray-200">
                            <div
                                className="rounded-md h-5 bg-blue-400"
                                style={{ width: `${dataPrinter.progression}%` }}
                            ></div>
                        </div>
                    </div>

                    <div className={"sm:col-start-3 sm:col-end-5"}>
                        <div className="relative">
                            <label
                                htmlFor="name"
                                className="absolute -top-2 left-2 inline-block bg-white px-1 text-xs font-medium text-gray-900"
                            >
                                En impression depuis
                            </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                placeholder={dataPrinter.duration}
                                disabled={true}
                            />
                        </div>
                    </div>

                </div>

                {dataPrinter.status === 'Disponible' && (<div className="border-b border-t border-gray-900/10 pb-2 pt-2 mt-5 w-full">
                    <button
                        type="button"
                        onClick={toggleAccordion}
                        className={`text-base font-semibold leading-7 text-gray-900 flex items-center justify-between w-full focus:outline-none transition-opacity duration-200 ${
                            isAccordionOpen ? 'opacity-100' : 'opacity-50'
                        }`}
                    >
                        Configurations manuelles
                        <svg
                            className={`h-5 w-5 transition-transform duration-200 ${
                                isAccordionOpen ? 'transform rotate-0' : 'transform rotate-[0deg]'
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d={isAccordionOpen ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
                            />
                        </svg>
                    </button>
                    {isAccordionOpen && (
                        <>
                            <p className="mt-1 text-sm leading-6 text-gray-600">Panel de configuration des températures de l'appareil (peut servir à préchauffé).</p>

                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="customRange2"
                                        className="mb-2 inline-block text-gray-700"
                                    >Buse</label
                                    >
                                    <input
                                        type="range"
                                        className="transparent rounded-md h-3 w-full cursor-pointer appearance-none border-transparent bg-gray-300 accent-blue-400 custom-thumb"
                                        id="customRange2"
                                        min="80"
                                        max="220"
                                        step="1"
                                        value={buseValue}
                                        onChange={handleBuseChange} />
                                    <div className="text-gray-600 mt-2">
                                        Température: {buseValue}°C
                                    </div>
                                </div>


                                <div className="sm:col-start-4 sm:col-end-6">
                                    <label
                                        htmlFor="customRange1"
                                        className="mb-2 inline-block text-gray-700"
                                    >Plateau</label
                                    >
                                    <input
                                        type="range"
                                        className="transparent rounded-md h-3 w-full cursor-pointer appearance-none border-transparent bg-gray-300 accent-blue-400 custom-thumb"
                                        id="customRange1"
                                        min="0"
                                        max="110"
                                        step="1"
                                        value={plateauValue}
                                        onChange={handlePlateauChange} />
                                    <div className="text-gray-600 mt-2">
                                        Température: {plateauValue}°C
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>)}
                {isAccordionOpen && (
                    <div className="mt-3 flex items-center justify-end gap-x-6">
                        <Link
                            onClick={handleUpdateTemp}
                            to={'/'}
                            className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Mettre à jour
                        </Link>
                    </div>
                )}
                {
                    dataPrinter.status === 'Disponible' && (
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <Link
                                to={`/new/${dataPrinter.name}`}
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Nouvelle Impression
                            </Link>
                        </div>
                    )
                }
                {
                    dataPrinter.status === 'Running' && (
                        <div className="mt-6 flex items-center justify-center gap-x-6">
                            <button
                                onClick={handlePauseButton}
                                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Pause
                            </button>
                            <button
                                onClick={handleStopButton}
                                className="rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            >
                                Stop
                            </button>
                        </div>
                    )
                }
            </div>
        </div>
    )
}