import './App.css'
import React, {useEffect} from 'react';
import PrinterList from "./pages/PrinterList.jsx";
import Overlay from "./Components/Overlay.jsx";
import {useState} from "react";
import { Outlet } from "react-router-dom";
import {fetchData} from "./services/fetchData.js";
import Notification from "./Components/Notification.jsx";

export const Datacontext = React.createContext();

function App() {
    const [open, setOpen] = useState(false);
    const [printerName, setPrinterName] = useState("");
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const getData = async () => {
            const result = await fetchData();
            setData(result || []);
            setLoading(false);
        };

        getData(); // récupérer les données immédiatement après le montage du composant
        const interval = setInterval(() => {
            getData(); // puis récupérer les données toutes les 10 secondes
        }, 10000); // 10000 ms = 10 s

        return () => clearInterval(interval); // nettoyer l'intervalle lors du démontage du composant
    }, []);

    return (
        <Datacontext.Provider value={{ data, setOpen, setShow }}>
            <div>
                <PrinterList setOpen={setOpen} setPrinterName={setPrinterName} data={data} loading={loading}/>
                <Overlay open={open} setOpen={setOpen} printerName={printerName}>
                    <Outlet />
                </Overlay>
                <div
                    aria-live="assertive"
                    className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                >
                    <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                        <Notification show={show} setShow={setShow}/>
                    </div>
                </div>
            </div>
        </Datacontext.Provider>
  )
}

export default App
