// import { Html5QrcodeScanner } from "html5-qrcode";
// import { useEffect, useState } from "react";
// import Navbar from "./Navbar";
// import { Link } from "react-router-dom";

// function Scanner(){
//     const [scanResult, setScanResult] = useState(null)

//     let scanner = null;

//     useEffect(() =>{
//         scanner = new Html5QrcodeScanner('reader', {
//             fps: 10,
//             qrbox: {
//                 width: 250, height: 250},
//             disableFlip: true,
//             rememberLastUsedCamera: true,
//         });
        
//         scanner.render(success, error);

//         function success(result) {
//             scanner.clear();
//             setScanResult(result);
//         }

//         function error(err){
//             console.warn(err);
//         }

//         return () => {
//             scanner.clear();
//             if (scanner._currentScanRegion && scanner._currentScanRegion.cameraScanType === Html5QrcodeScanner.SCAN_TYPE_CAMERA) {
//                 scanner._currentScanRegion.stop();
//             }
//         };
//     }, []);

//     const handleGoBack = () => {
//         scanner.clear();
//         scanner._currentScanRegion.stop()
//     };

//     return (
//         <div style={{ backgroundColor: '#E3E9EE' }}>
//             <header>
//                 <Navbar />
//             </header>
//             <main className='max-w-screen-md w-full items-center justify-between mx-auto p-4'>
//             <div className="flex flex-col">
//             <Link to="/" onClick={handleGoBack}>
//                 <a className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
//                     <img src="/left-arrow.svg" className="h-6" alt="Logo" />
//                     Regresar
//                 </a>
//             </Link>
//             <strong>Escanea el código</strong>
//             </div>
//             {
//                 scanResult
//                 ? <div>Success: <a href={scanResult}> {scanResult} </a> </div>
//                 : <div id="reader" ></div>
//             }
//             </main>
//         </div>
//     );
// }

// export default Scanner;

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Scanner(){
    const [scanResult, setScanResult] = useState(null)

    let scanner = null;

    useEffect(() =>{
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 250,
                height: 250,
            },
            fps: 5,
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

        activateCamera();

        return () => {
            scanner.clear();
            if (scanner._currentScanRegion && scanner._currentScanRegion.cameraScanType === Html5QrcodeScanner.SCAN_TYPE_CAMERA) {
                scanner._currentScanRegion.stop();
            }
        };
    }, []);

    const activateCamera = () => {
        navigator.mediaDevices.enumerateDevices()
            .then(devices => {
                const videoDevices = devices.filter(device => device.kind === 'videoinput');
                const rearCamera = videoDevices.find(device => device.label.includes('back') || device.label.includes('rear'));
                if (rearCamera) {
                    return navigator.mediaDevices.getUserMedia({ video: { deviceId: rearCamera.deviceId } });
                } else {
                    throw new Error('No se encontró una cámara trasera.');
                }
            })
            .then(stream => {
                const video = document.getElementById('reader');
                video.srcObject = stream;
            })
            .catch(error => {
                console.error('Error al acceder a la cámara:', error);
            });
    };

    const handleGoBack = () => {
        scanner.clear();
        scanner._currentScanRegion.stop()
    };

    return (
        <div style={{ backgroundColor: '#E3E9EE' }}>
            <header>
                <Navbar />
            </header>
            <main className='max-w-screen-lg w-full items-center justify-between mx-auto p-4'>
                <div className="flex flex-col pb-4">
                    <Link to="/" onClick={handleGoBack}>
                        <a className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <img src="/left-arrow.svg" className="h-8" alt="Logo" />
                            Regresar
                        </a>
                    </Link>
                    <strong>Escanea el código</strong>
                </div>
                {
                    scanResult
                    ? <div>Éxito: <a href={scanResult}>{scanResult}</a></div>
                    : <video id="reader" autoPlay style={{ width: '100%', maxWidth: '400px' }}></video> 
                }
            </main>
        </div>
    );
}

export default Scanner;
