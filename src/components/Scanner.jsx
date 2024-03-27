import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Scanner(){
    const [scanResult, setScanResult] = useState(null)

    let scanner = null;

    useEffect(() =>{
        scanner = new Html5QrcodeScanner('reader', {
            fps: 10,
            qrbox: {
                width: 20, height: 200},
            disableFlip: true,
            rememberLastUsedCamera: true,
        });
        
        scanner.render(success, error);

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err){
            console.warn(err);
        }

        return () => {
            scanner.clear();
            if (scanner._currentScanRegion && scanner._currentScanRegion.cameraScanType === Html5QrcodeScanner.SCAN_TYPE_CAMERA) {
                scanner._currentScanRegion.stop();
            }
        };
    }, []);

    const handleGoBack = () => {
        scanner.clear();
        scanner._currentScanRegion.stop()
    };

    return (
        <div style={{ backgroundColor: '#E3E9EE' }}>
            <header>
                <Navbar />
            </header>
            <main className='max-w-screen-md w-full h-screen-sm items-center justify-between mx-auto p-4'>
            <div className="flex flex-col">
            <Link to="/" onClick={handleGoBack}>
                <a className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    <img src="/left-arrow.svg" className="h-6" alt="Logo" />
                    Regresar
                </a>
            </Link>
            <strong>Escanea el código</strong>
            </div>
            <div className="pt-3">
                {
                    scanResult
                    ? <div>Success: <a href={scanResult}> {scanResult} </a> </div>
                    : <div id="reader"></div>
                }
            </div>
            </main>
        </div>
    );
}

export default Scanner;


