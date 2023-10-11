import { DocumentArrowDownIcon } from '@heroicons/react/24/solid';
import {Fragment, useContext, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import {fetchFiles} from "../services/fetchFiles.js";
import {startPrinting} from "../services/printing.js";
import {Datacontext} from "../App.jsx";

// eslint-disable-next-line react/prop-types
export default function LaunchPage() {
    const { nom } = useParams();
    const { setOpen, setShow } = useContext(Datacontext);
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchFiles();
            setData(result || []);
            if (result && result.length > 0) {
                setSelected(result[0]);
            }
        };
        getData();
    }, []);

    const [selectedOption, setSelectedOption] = useState('carte-sd');

    const navigate = useNavigate();

    function handleFileOptionChange(event) {
        setSelectedOption(event.target.value);
    }

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const handleFormSubmit = async () => {
        if (selectedOption) {
            try {
                const response = await startPrinting(selected, nom);
                console.log('Printing started successfully:', response);
                setOpen(false);
                setTimeout(() => {
                    setShow(true);
                    navigate("/");
                }, 1000);

            } catch (error) {
                console.error('There was an error submitting the form:', error);
            }
        } else {
            console.error('No option selected!');
        }
    };

    return (
        <div className={"h-full w-full flex flex-col items-center"}>
            <form>
                <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12">
                        <h2 className="text-base font-semibold leading-7 text-gray-900">Configuration de l'impression</h2>
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                           Cette page sert à configurer votre impression.
                        </p>

                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-4">
                                <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                    Nom imprimante
                                </label>
                                <div className="mt-2">
                                    <div className="flex rounded-md bg-white/5 ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
                                        <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">{nom}</span>
                                        <input
                                            type="text"
                                            name="username"
                                            id="username"
                                            autoComplete="username"
                                            className="flex-1 border-0 bg-transparent py-1.5 pl-1 focus:ring-0 sm:text-sm sm:leading-6"
                                            disabled={true}
                                        />
                                    </div>
                                </div>
                            </div>

                            <fieldset className={"sm:col-span-4"}>
                                <legend className="text-sm font-semibold leading-6 text-gray-900">Types de fichier</legend>
                                <p className="mt-1 text-sm leading-6 text-gray-600">Vous pouvez soit utiliser un fichier de la carte SD, soit le fournir.</p>
                                <div className="mt-6 space-y-6">
                                    <div className="flex items-center gap-x-3">
                                        <input
                                            id="file-sd"
                                            name="file-send"
                                            type="radio"
                                            value="carte-sd"
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                            checked={selectedOption === 'carte-sd'}
                                            onChange={handleFileOptionChange}
                                        />
                                        <label htmlFor="file-sd" className="block text-sm font-medium leading-6 text-gray-900">
                                            Carte SD
                                        </label>
                                        {/*<input
                                            id="file-other"
                                            name="file-send"
                                            type="radio"
                                            value="fichier-personnel"
                                            className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-600"
                                            checked={selectedOption === 'fichier-personnel'}
                                            onChange={handleFileOptionChange}
                                        />
                                            <label htmlFor="file-other" className="block text-sm font-medium leading-6 text-gray-900">
                                            Fichier personnel
                                            </label>*/}
                                    </div>
                                </div>
                            </fieldset>

                            {selectedOption === 'carte-sd' && (
                                <div className="sm:col-span-3">
                                    <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                                <Listbox.Label className="block text-sm font-medium leading-6 text-gray-900">Nom du fichier sur la carte SD</Listbox.Label>
                                                <div className="relative mt-2">
                                                    <Listbox.Button className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6">
                                                        <span className="block truncate">{selected}</span>
                                                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                                            <ChevronUpDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                        </span>
                                                    </Listbox.Button>

                                                    <Transition
                                                        show={open}
                                                        as={Fragment}
                                                        leave="transition ease-in duration-100"
                                                        leaveFrom="opacity-100"
                                                        leaveTo="opacity-0"
                                                    >
                                                        <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                            {data.map((filename) => (
                                                                <Listbox.Option
                                                                    key={filename}
                                                                    className={({ active }) =>
                                                                        classNames(
                                                                            active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                                                                            'relative cursor-default select-none py-2 pl-8 pr-4'
                                                                        )
                                                                    }
                                                                    value={filename}
                                                                >
                                                                    {({ selected, active }) => (
                                                                        <>
                                                                            <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'block truncate')}>
                                                                              {filename}
                                                                            </span>

                                                                            {selected ? (
                                                                                <span
                                                                                    className={classNames(
                                                                                        active ? 'text-white' : 'text-indigo-600',
                                                                                        'absolute inset-y-0 left-0 flex items-center pl-1.5'
                                                                                    )}
                                                                                >
                                                                                    <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                                                  </span>
                                                                            ) : null}
                                                                        </>
                                                                    )}
                                                                </Listbox.Option>
                                                            ))}
                                                        </Listbox.Options>
                                                    </Transition>
                                                </div>
                                            </>
                                        )}
                                    </Listbox>
                                </div>

                            )}

                                {selectedOption === 'fichier-personnel' && (
                                    <div className="col-span-full">
                                        <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-gray-900">
                                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                                            Fichier d'impression
                                        </label>
                                        <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                            <div className="text-center">
                                                <DocumentArrowDownIcon className="mx-auto h-12 w-12 text-gray-300" aria-hidden="true" />
                                                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                                    <label
                                                        htmlFor="file-upload"
                                                        className="relative cursor-pointer rounded-md bg-white font-semibold text-blue-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-blue-600 focus-within:ring-offset-2 hover:text-blue-500"
                                                    >
                                                        <span>Télécharger un fichier</span>
                                                        <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                                                    </label>
                                                    <p className="pl-1">ou déposer le directement ici</p>
                                                </div>
                                                <p className="text-xs leading-5 text-gray-600">STL, GCODE jusqu'à 10 Mo</p>
                                            </div>
                                        </div>
                                    </div>
                                )}
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <div onClick={() => navigate(-1)} className="text-sm font-semibold leading-6 text-gray-900 cursor-pointer">
                        Annuler
                    </div>
                    <div
                        onClick={handleFormSubmit}
                        className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer"
                    >
                        Lancer
                    </div>
                </div>
            </form>
        </div>
    )
}