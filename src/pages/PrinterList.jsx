import { useNavigate } from 'react-router-dom';
import {DotSpinner} from "@uiball/loaders";

const statuses = { Disponible: 'text-green-400 bg-green-400/10', Erreur: 'text-rose-400 bg-rose-400/10', Running: 'text-blue-400 bg-blue-400/10', Finis: 'text-purple-400 bg-purple-400/10' }

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line react/prop-types
export default function PrinterList( {setOpen, setPrinterName, data, loading} ) {
    const navigate = useNavigate();
    const handleOpenOverlay = (name) => {
        setOpen(true);
        setPrinterName(name);
        navigate(`/status/${name}`);
    }

    return (
        <div className="h-screen w-screen bg-gray-900 py-10">
            {loading ? (
                <div className={"w-full h-full mt-6 flex items-center justify-center"}>
                    <DotSpinner size={100} color={"#FFFFFF"} />
                </div>
            ) : (
                <>
                <h2 className="px-4 text-base font-semibold leading-7 text-white sm:px-6 lg:px-8">Web app d'impression 3D</h2>
                <table className="mt-6 w-full whitespace-nowrap text-left">
                <colgroup>
                <col className="w-full sm:w-4/12" />
                <col className="lg:w-4/12" />
                <col className="lg:w-2/12" />
                <col className="lg:w-1/12" />
                <col className="lg:w-1/12" />
                </colgroup>
                <thead className="border-b border-white/10 text-sm leading-6 text-white">
                <tr>
                <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                Imprimantes
                </th>
                <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                Status
                </th>
                <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                En marche depuis
                </th>
                <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                Progression
                </th>
                <th scope="col" className="hidden py-2 pl-0 pr-4 text-right font-semibold sm:table-cell sm:pr-6 lg:pr-8">
                Température
                </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                {/* eslint-disable-next-line react/prop-types */}
                {data.map((item) => (
                    <tr key={item.name} onClick={() => handleOpenOverlay(item.name)} className={"cursor-pointer hover:bg-gray-800"}>
                        <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
                            <div className="flex items-center gap-x-4">
                                <div className="truncate text-sm font-medium leading-6 text-white">{item.name}</div>
                            </div>
                        </td>
                        <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
                            <div className="flex items-center justify-end gap-x-2 sm:justify-start">
                                <div className={classNames(statuses[item.status], 'flex-none rounded-full p-1')}>
                                    <div className="h-1.5 w-1.5 rounded-full bg-current" />
                                </div>
                                <div className="hidden text-white sm:block">{item.status}</div>
                            </div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-gray-400 md:table-cell lg:pr-20">
                            {item.duration}
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 sm:table-cell sm:pr-8">
                            <div className="font-mono text-sm leading-6 text-gray-400">{item.progression}%</div>
                        </td>
                        <td className="hidden py-4 pl-0 pr-4 text-right text-sm leading-6 text-gray-400 sm:table-cell sm:pr-6 lg:pr-8">
                            {item.buse}°C
                        </td>
                    </tr>
                ))}
                </tbody>
                </table>
            </>
            )}
    </div>
    )
}
