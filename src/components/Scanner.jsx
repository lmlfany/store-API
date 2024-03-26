import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Scanner(){
    const [scanResult, setScanResult] = useState(null)

    useEffect(() =>{
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,

        });
        
        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err){
            console.warn(err);
        }
    }, []);

    return (
        <div style={{ backgroundColor: '#E3E9EE' }}>
            <header>
                <Navbar />
            </header>
            <main className='max-w-screen-xl w-full items-center justify-between mx-auto p-4'>
            <div className="flex flex-col">
            <Link to="/">
                <a className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                <img src="/left-arrow.svg" className="h-8" alt="Logo" />
                Regresar
                </a>
            </Link>
            <strong>Escanea el código</strong>
            </div>
            {
                scanResult
                ? <div>Success: <a href={scanResult}> {scanResult} </a> </div>
                : <div id="reader" ></div>
            }
            </main>

        </div>
    );
}

export default Scanner;