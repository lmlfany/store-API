import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Scanner(){
    const [scanResult, setScanResult] = useState(null)
    
    useEffect(() =>{
        const scanner = new Html5QrcodeScanner('reader', {
            qrbox: {
                width: 150,
                height: 150,
            },
            fps: 20,
            aspectRatio: 1.3
            
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
        };
    }, []);

    const activateCamera = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                const video = document.getElementById('reader');
                video.srcObject = stream;
            })
            .catch(error => {
                console.error('Error al acceder a la cámara:', error);
            });
    };

    return (
        <div style={{ backgroundColor: '#E3E9EE' }}>
            <header>
                <Navbar />
            </header>
            <main className='max-w-screen-lg w-full items-center justify-between mx-auto p-4'>
                <div className="flex flex-col pb-4">
                    <Link to="/" onClick={() => { setStream(null); }}>
                        <a className="inline-flex items-center font-medium text-blue-600 dark:text-blue-500 hover:underline">
                            <img src="/left-arrow.svg" className="h-6" alt="Logo" />
                            Regresar
                        </a>
                    </Link>
                    <strong>Escanea el código</strong>
                </div>
                {
                    scanResult
                    ? <div>Éxito: <a href={scanResult}>{scanResult}</a></div>
                    : <video id="reader" autoPlay style={{ width: '100%', height: '500px' }}></video>
                }
            </main>
        </div>
    );
}

export default Scanner;