import { useRef } from 'react';
import './Button.scss';

export default function Button({
    icon, 
    className,
    alt,
    functionality,
    activeMode = true,
     ...props})
{

    const button = useRef();

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
                functionality()
            }}
        >
            <img className='Button-icon' src={icon} alt={alt} style={!activeMode ? inactiveStyle : null}/>
        </div>
    )

}