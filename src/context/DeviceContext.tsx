import { createContext, ReactNode, useState } from 'react';

const DeviceContext = createContext<DeviceCont | undefined>(undefined);
var isTouchDevice = 'ontouchstart' in document.documentElement;

interface Props {
    children: ReactNode
}

interface DeviceCont {
    isTouch: boolean
}

export function DeviceProvider({children}: Props){
    const [isTouch, setIsTouch] = useState(isTouchDevice);

    return(
        <DeviceContext.Provider value={{isTouch}}>
            {children}
        </DeviceContext.Provider>
    )
}

export default DeviceContext;