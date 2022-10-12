import './Button.scss';

export default function Button({
    icon, 
    className,
    alt,
    functionality,
     ...props})
{


    return(
        <div className={`Button ${className}`} onClick={() => functionality()}>
            <img src={icon} alt={alt} />
        </div>
    )

}