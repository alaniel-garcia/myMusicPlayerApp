import React, { useEffect, useRef } from 'react';
import useDeviceContext from '@hooks/useDeviceContext';

export default function PopElement({ triggerState, showingTime, showWhileInteracting, children }) {
    const {isTouch} = useDeviceContext();
    const popElement = useRef();
    let closePopElement = null;
    
    function closeTimeoutManager(flag){
        if(flag){
            closePopElement = setInterval(()=>{
                triggerState(false)
            },showingTime);
        }
        else{
            clearTimeout(closePopElement)
        }
    }

    function childrenRoute (parentElement, cachedChildren = []) {
        cachedChildren.push(parentElement)

        if(parentElement.children.length === 0){
            return 
        }

        for(let child of parentElement.children){
            childrenRoute(child, cachedChildren)
        }
    }

    function ChildrenValidationEvent(eventType = ''){
        popElement.current.addEventListener(eventType,(event)=> {
            const elementChildren = [];
            childrenRoute(popElement.current, elementChildren)
            const isAllowed = elementChildren.some((child) => {
                    if(child === event.target){
                        return true
                    }
                    else{
                        return false
                    }
                })
            if(isAllowed){
                closeTimeoutManager(false)
                closeTimeoutManager(true)
            }
        })
    }

    useEffect(() => {
        closeTimeoutManager(true)
        if(showWhileInteracting){
            if(isTouch){
                ChildrenValidationEvent('touchstart')
            }
            else{
                ChildrenValidationEvent('mousemove')
            }
        }
        return () => {
            closeTimeoutManager(false)
        };
    },[]);

    return <div ref={popElement} className='PopElement'>{children}</div>;
}
