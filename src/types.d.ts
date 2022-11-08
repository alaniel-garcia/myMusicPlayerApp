//Buttons call logic

export interface ButtonProps {
    icon: string;
    alt: string;
}

export interface ButtonPropsContainer {
    name: string
    props: ButtonProps
}

export interface Icon {
    icon: string
    alt: string
    functionality?: Function
}