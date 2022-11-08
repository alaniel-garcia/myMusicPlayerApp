import buttonsProps from '@utils/buttonsProps';
import { ButtonProps, ButtonPropsContainer, Icon } from "src/types";

function searchTarget (
    target: string,
    array: Array<ButtonPropsContainer>
): ButtonPropsContainer | undefined{
    let result;
    array.forEach((btnProps)=>{
        if(btnProps.name === target){
            result = btnProps
        }
    })

    return result
}

function useButtonProps( targetProps: string, buttonFunctionality: Function | boolean): Icon {

    if(typeof(buttonFunctionality) === 'boolean'){
        if(buttonFunctionality !== false){
            throw new Error('Only false value is accepted for boolean');
        } 
    }
    else if(typeof(buttonFunctionality) !== 'function'){
        throw new Error('Second argument must be a function');
    }

    const target = searchTarget(targetProps, buttonsProps);

    if (!target) {
        throw new Error(`${targetProps} not found in buttonsProps`);
    } 

    const props: ButtonProps = target.props;

    return {
        icon: props.icon,
        alt: props.alt,
        functionality: buttonFunctionality ? buttonFunctionality : undefined,
    };
}

export default useButtonProps;