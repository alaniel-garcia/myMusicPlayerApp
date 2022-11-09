
//Handle each state that when it changes, it does it to the opposite boolean

export default function useHandleBooleanState(setStateFunction : Function){
    setStateFunction((prevState : boolean) => {
        return !prevState
    })
}