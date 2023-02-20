import React, { useEffect, useState } from "react";
// importo la ip
import { ip } from '../../home/Home.jsx'
import HistorialCortinaBlanca from '../HistorialCortinaBlanca/HistorialCortinaBlanca.jsx'
import HistorialElementoARevisar from "../HistorialElementoARevisar/HistorialElementoARevisar.jsx";
import HistorialPaginado from "../HistorialPaginado/HistorialPaginado.jsx";

export default function HistorialLista({ cargando, setCargando }) {
    // creo un estado para la lista de elementos del historial
    const [historial, setHistorial] = useState([]);
    const [gatilloHistorial, setGatilloHistorial] = useState(false);
    const [historialARevisar, setHistorialARevisar] = useState({ productos: [], id: 0 });
    const [fecha, setFecha] = useState('');
    const [pagina, setPagina] = useState(0);
    const [pagInicio, setPagInicio] = useState(0);
    const elementosPorPagina = 20
    const [pagFin, setPagFin] = useState(elementosPorPagina);

    // creo un useState que guarda unicamente al iniciar en historial lo que recibe de ip + '/histories'
    useEffect(() => {
        fetch(ip + '/histories')
            .then(response => response.json())
            .then(data => setHistorial(data.reverse()))
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
            suma += Number(element.price) * Number(element.numberOfProducts);
        });
        return suma;
    }

    function verHistorialElemento(products) {
        setGatilloHistorial(true);
        setHistorialARevisar(products);
    }

    // creare una funcion que se llama invertidor donde invierte la id, por ejemplo si un elemento es el penultimo de 50 (es decir 48) lo convierte en el segundo de 50 (es decir 2)
    function invertidor(id) {
        return historial.length - id - 1;
    }

    useEffect(() => {
        // si pagina cambia entonces se cambia pagInicio y pagFin para que se muestren los elementos de la pagina correspondiente sin pasarse de la longitud de historial y sin retroceder mas de 0
        setPagInicio(pagina * elementosPorPagina);
        setPagFin((pagina + 1) * elementosPorPagina);
        // eslint-disable-next-line
    }, [pagina])


    return (
        <div>
            <HistorialElementoARevisar elementos={historialARevisar.productos} id={historialARevisar.id} gatillo={gatilloHistorial} setGatillo={setGatilloHistorial} fecha={formatDate(fecha)} cargando={cargando} setCargando={setCargando} setHistorial={setHistorial} index={invertidor(historialARevisar.index)} historial={historial} />
            <HistorialCortinaBlanca gatillo={gatilloHistorial} setGatillo={setGatilloHistorial} />
            {historial.length ? (
                <HistorialPaginado pagina={pagina} setPagina={setPagina} historial={historial} elementosPorPagina={elementosPorPagina} />
            ) : null}
            <ul className="w-[95%] xl:w-[90%] mx-auto border flex flex-col justify-center items-center cursor-pointer">
                {historial.length ? (historial?.slice(pagInicio, pagFin).map((element, index) => {
                    return (
                        <li key={index} className={'border-2 shadow-md last:shadow-sm first:shadow-sm rounded rounded-t-none font-serif flex flex-row items-center justify-center text-center py-3 odd:bg-white even:bg-slate-100 last:border-b-4 border-b-0 w-full relative font-bold text-lg xl:text-2xl md:text-2xl' + (element.status === 'complete' ? '' : ' odd:bg-red-400 even:bg-red-300')} onClick={() => {
                            verHistorialElemento({ productos: element.products, id: element.id, index: index });
                            setFecha(element.date);
                        }}>
                            <p className="w-[10%]">#{(index + 1) + (elementosPorPagina * pagina)}</p>
                            <p className="w-[45%]">Fecha: {formatDate(element.date)}</p>
                            <p className="w-[45%]">Total: ${sacarSuma(element.products)}</p>
                        </li>
                    )
                })) : <li className='w-full flex flex-col items-center justify-center xl:mt-6 italic'>
                    <h1 className='font-serif text-2xl xl:text-4xl mx-auto font-bold font-serif block mt-0'>No hay Historial reciente</h1>
                    <img className="w-3/4 xl:w-1/2 bottom-1" src="https://chryslergroup.navigation.com/static/WFS/Shop-Site/-/Shop/en_US/Product%20Not%20Found.png" alt="notFound" />
                </li>}
            </ul>
            {historial.length ? (
                <HistorialPaginado pagina={pagina} setPagina={setPagina} historial={historial} elementosPorPagina={elementosPorPagina} />
            ) : null}
        </div >
    );
}