import buttonsProps from '@utils/buttonsProps/buttonsProps';

function searchTarget(
    target: string,
    object: object
): [key: string, value: object] | undefined {
    const objectEntries = Object.entries(object);

    const result = objectEntries.filter((entry) => {
        if (entry[0] === target) {
            return entry[1];
        }
    })[0];

    return result;
}

function useButtonProps( targetProps: string, buttonFunctionality: () => any): object | undefined {

    if(typeof(buttonFunctionality) !== 'function'){
        throw new Error('Second argument must be a function');
    }

    const target = searchTarget(targetProps, buttonsProps);

    const props: object | undefined = target ? target[1] : undefined;

    if (!target) {
        throw new Error(`${targetProps} not found in buttonsProps`);
    } else if (props) {
        return {
            ...props,
            ['functionality']: buttonFunctionality,
        };
    }
}

export default useButtonProps;
