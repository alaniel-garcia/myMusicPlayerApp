import { useRef } from 'react';
import './Button.scss';

interface Props {
    icon: string
    className?:string
    alt: string
    functionality?: Function
    activeMode?: boolean
}

export default function Button({
    icon, 
    className,
    alt,
    functionality,
    activeMode = true,
    } : Props)
{

    const button = useRef<HTMLDivElement>(null);

    const inactiveStyle = {
        filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(247deg) brightness(96%) contrast(94%)',
        opacity: '0.6'
    }

    function clickEffect() {
        button.current?.classList.add('click-wave');
        setTimeout(()=>{
            button.current?.classList.remove('click-wave')
        },300);
    }

    return(
        <div
            ref={button}
            className={`Button ` + `${className ? className : ''}`} 
            onClick={(event) => {
                event.stopPropagation()
                clickEffect()
                if(functionality){
                    functionality()
                }
            }}
        >
            <img className='Button-icon' src={icon} alt={alt} style={!activeMode ? inactiveStyle : {}}/>
        </div>
    )

}