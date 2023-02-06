import React, { useEffect, useState } from "react";
// importo la ip
import { ip } from '../../home/Home.jsx'
import HistorialCortinaBlanca from '../HistorialCortinaBlanca/HistorialCortinaBlanca.jsx'
import HistorialElementoARevisar from "../HistorialElementoARevisar/HistorialElementoARevisar.jsx";

export default function HistorialLista() {
    // creo un estado para la lista de elementos del historial
    const [historial, setHistorial] = useState([]);
    const [gatilloHistorial, setGatilloHistorial] = useState(false);
    const [historialARevisar, setHistorialARevisar] = useState([]);
    const [fecha, setFecha] = useState('');

    // creo un useState que guarda unicamente al iniciar en historial lo que recibe de ip + '/histories'
    useEffect(() => {
        fetch(ip + '/histories')
            .then(response => response.json())
            .then(data => setHistorial(data))
    }, []);

    // creo una funcion que recibe una date con formato ISO-8601 y la presenta de una manera simple, ejemplo "24-dic-2020"

    function formatDate(date) {
        let fecha = new Date(date);
        let dia = fecha.getDate();
        let mes = fecha.getMonth() + 1;
        // hago que dependiendo de mes se cambie a su equivalente en palabra, por ejemplo 12 = diciembre
        switch (mes) {
            case 1:
                mes = "Ene";
                break;
            case 2:
                mes = "Feb";
                break;
            case 3:
                mes = "Mar";
                break;
            case 4:
                mes = "Abr";
                break;
            case 5:
                mes = "May";
                break;
            case 6:
                mes = "Jun";
                break;
            case 7:
                mes = "Jul";
                break;
            case 8:
                mes = "Ago";
                break;
            case 9:
                mes = "Sep";
                break;
            case 10:
                mes = "Oct";
                break;
            case 11:
                mes = "Nov";
                break;
            case 12:
                mes = "Dic";
                break;
            default:
                mes = "??";
                break;
        }

        let anio = fecha.getFullYear();
        return dia + "-" + mes + "-" + anio;
    }

    function sacarSuma(array) {
        let suma = 0;
        array.forEach(element => {
            suma += element.price;
        });
        return suma;
    }

    function verHistorialElemento(products) {
        setGatilloHistorial(true);
        setHistorialARevisar(products);
    }


    return (
        <div>
            <HistorialElementoARevisar elementos={historialARevisar} gatillo={gatilloHistorial}  setGatillo={setGatilloHistorial} fecha={formatDate(fecha)} />
            <HistorialCortinaBlanca gatillo={gatilloHistorial} setGatillo={setGatilloHistorial} />
            <ul className="w-[95%] mx-auto border flex flex-col justify-center items-center cursor-pointer">
                {historial?.slice().reverse().map((element, index) => {
                    return (
                        <li key={index} className='text-center flex flex-row w-full' onClick={() => {
                            verHistorialElemento(element.products);
                            setFecha(element.date);
                        }}>
                            <p className="w-[10%]">#: {index + 1}</p>
                            <p className="w-[45%]">Fecha: { formatDate(element.date)}</p>
                            <p className="w-[45%]">Total: ${sacarSuma(element.products)}</p>
                        </li>
                    )
                })}
            </ul>
        </div >
    );
}