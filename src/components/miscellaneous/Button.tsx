import { useRef } from 'react';
import './Button.scss';

interface Props {
    icon: string
    className?:string
    alt: string
    functionality?: Function
    activeMode?: boolean
    selectedMode?: boolean
    selectedState?: boolean
}

export default function Button({
    icon, 
    className,
    alt,
    functionality,
    activeMode = true,
    selectedMode = false,
    selectedState = false
    } : Props)
{

    const button = useRef<HTMLDivElement>(null);

    const inactiveStyle = {
        filter: 'invert(40%) sepia(0%) saturate(0%) hue-rotate(247deg) brightness(96%) contrast(94%)',
        opacity: '0.85'
    }

    const selectedStyle = {
        display: 'none'
    }

    function handleExtraModes(): object{
        if(!activeMode){
            return inactiveStyle
        }
        else if(selectedMode){
            if(selectedState){
                return {}
            }
            else {
                return selectedStyle
            }
        }
        else{
            return {}
        }
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
            style={selectedMode ? {border: '2px solid white'} : {}}
            onClick={(event) => {
                event.stopPropagation()
                clickEffect()
                if(functionality){
                    functionality()
                }
            }}
        >
            <img className='Button-icon' src={icon} alt={alt} style={handleExtraModes()}/>
        </div>
    )

}