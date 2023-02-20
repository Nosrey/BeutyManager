import loadingIcon from '../../../images/loadingIcon.png'

export default function HistorialPantallaCarga({ gatillo }) {
    return (
        <div className={
            (gatillo) ? 'items-center justify-center w-screen h-screen fixed  z-40 opacity-70' : 'hidden'}>
            <div className='fixed w-[40%] right-[30%] md:w-[20%] md:right-[40%]'>
                <img className='animate-spin  w-[100%] h-[100%] ' src={loadingIcon} alt='loading' />

            </div>
        </div>
    )
}