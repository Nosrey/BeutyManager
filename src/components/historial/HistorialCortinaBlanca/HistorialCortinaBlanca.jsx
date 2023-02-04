export default function HistorialCortinaBlanca({gatillo, setGatillo}) {
    return (
        <div className={
            (gatillo) ? 'w-full h-full fixed bg-slate-50 z-10 opacity-70 top-0 left-0 ' : 'hidden'
        } onClick={() => setGatillo(false)}>
        </div>
    )
}