import addBtn2 from "../../images/addBtn2.png"

export default function CrearGrupo({ gatilloGrupo, setGatilloGrupo, grupoTemporal, setGrupoTemporal, grupoSeleccionado, setGrupoSeleccionado }) {
    const cerrar = () => {
        setGrupoSeleccionado(grupoTemporal)
        setGatilloGrupo(false)
    }
    return (
        <div className={(gatilloGrupo) ? "flex flex-col items-center justify-center text-xl w-[50%] md:top-[20%] md:w-[30%] md:left-[35%] left-[25%] xl:w-[20%] fixed top-[30%] xl:top-[25%] xl:left-[40%] z-30 bg-white border shadow text-center rounded-lg p-2 py-4 xl:p-3 opacity-100 " : 'hidden'}>
            <label className="text-2xl italic mb-2">Crear grupo</label>
            <input type={'text'} value={grupoTemporal} onChange={(e) => setGrupoTemporal(e.target.value)} className='w-[80%] border-2 rounded-lg my-2 p-1' />
            <button className='font-serif bg-red-600 text-white absolute top-1 rounded-sm right-1 px-1 font-black hover:bg-red-300 text-base' onClick={cerrar}>X</button>
            <button onClick={cerrar}>
                <img src={addBtn2} alt='addBtn2' className="w-[25%] md:w-[20%] mx-auto mt-2"/>
            </button>
        </div>
    )
}