import { useRef } from 'react';
import './Button.scss';

export default function Button({
    icon, 
    className,
    alt,
    functionality,
     ...props})
{

    const button = useRef();

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
            <img src={icon} alt={alt} />
        </div>
    )

}