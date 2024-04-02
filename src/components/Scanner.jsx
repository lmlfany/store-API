import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";
import { Html5QrcodeScanner } from "html5-qrcode";

function Scanner() {
    const [scanResult, setScanResult] = useState(null);
    const [scannerActive, setScannerActive] = useState(false);
    let scanner = null;

    useEffect(() => {
        if (scannerActive) {
            scanner = new Html5QrcodeScanner('reader', {
                fps: 10,
                qrbox: {
                    width: 200, height: 200
                },
                disableFlip: true,
                rememberLastUsedCamera: true,

            });

            scanner.render(success, error, { facingMode: "environment" });
        }

        function success(result) {
            scanner.clear();
            setScanResult(result);
        }

        function error(err) {
            console.warn(err);
        }

        return () => {
            if (scanner) {
                scanner.clear();
                if (scanner._currentScanRegion && scanner._currentScanRegion.cameraScanType === Html5QrcodeScanner.SCAN_TYPE_CAMERA) {
                    scanner._currentScanRegion.stop();
                }
            }
        };
    }, [scannerActive]);

    useEffect(() => {
        if (scanResult) {
            window.location.href = scanResult;
        }
    }, [scanResult]);

    const handleGoBack = () => {
        if (scanner) {
            scanner.clear();
            if (scanner._currentScanRegion && scanner._currentScanRegion.cameraScanType === Html5QrcodeScanner.SCAN_TYPE_CAMERA) {
                scanner._currentScanRegion.stop();
            }
        }
    };

    useEffect(() => {
        setScannerActive(true); 
        return () => {
            setScannerActive(false); 
        };
    }, []);

    return (
        <div style={{ backgroundColor: '#E3E9EE' }}>
            <header>
                <Navbar />
            </header>
            <main className="max-w-screen-md w-full h-screen-sm items-center text-[20px] mx-auto p-4">
                <div className="flex flex-col">
                    <Link to="/" onClick={handleGoBack}>
                        <div className=" inline-flex items-center font-medium  text-blue-600 dark:text-blue-500 hover:underline">
                            <img src="/left-arrow.svg" className="h-[35px] me-1" alt="Logo" />
                            Regresar
                        </div>
                    </Link>
                    <strong>Escanea el código</strong>
                </div>
                <div className="pt-3 ">
                    {
                        scanResult
                        ? 
                            <div className="max-w-screen-md flex flex-wrap items-center justify-between mx-auto p-4 text-smtext-green-800 border border-green-300 rounded-lg bg-green-50 " role="alert">
                                <svg className="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"/>
                                </svg>
                                <span className="sr-only">Info</span>
                                <div>
                                    <span className="font-medium">Cargando: {scanResult}</span> 
                                </div>
                            </div>
                        : <div id="reader" >  </div>
                    }
                </div>
            </main>
        </div>
    );
}

export default Scanner;