import { createContext, ReactNode, useState } from 'react';
import { OptionsContent } from 'src/types';

interface OptsContext {
    isOptionsOpen: boolean 
    content: OptionsContent 
    openOptions: Function
    closeOptions: Function
    loadContent: Function
    optionCalled: string
    inputValue: any
    callOption: Function
    setValueForInput: Function
}


interface Props {
    children: ReactNode
}

const OptionsContext = createContext<OptsContext | undefined>(undefined);

export function OptionsProvider ({children}: Props) {
    const [isOptionsOpen, setIsOptionsOpen] = useState(false);
    const [content, setContent] = useState<OptionsContent>({
        contentType: '',
    });
    const [optionCalled, setOptionCalled] = useState<string>('');
    const [inputValue, setInputValue] = useState();// not using it yet

    function openOptions(){
        setIsOptionsOpen(true);
    }

    function closeOptions(){
        setIsOptionsOpen(false);
    }

    function loadContent (newContent: OptionsContent, ) {
        setContent(newContent);
    }

    function callOption(option: string){
        setOptionCalled(option);
    }

    function setValueForInput(value: any){
        setInputValue(value)
    }

    return (
        <OptionsContext.Provider value={{isOptionsOpen,openOptions,closeOptions, content, loadContent, optionCalled, inputValue, callOption, setValueForInput}}>
            {children}
        </OptionsContext.Provider>
    )
}

export default OptionsContext;