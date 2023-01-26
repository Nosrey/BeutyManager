export default function CortinaBlancaVentas({gatillo, setGatillo}) {
    return (
        <div className={
            (gatillo) ? 'w-full h-full fixed bg-slate-50 z-10 opacity-70 top-0 left-0 ' : 'hidden'
        }>
            <button className="absolute  right-2  top-1" onClick={() => setGatillo(false)}>X</button>
        </div>
    )
}