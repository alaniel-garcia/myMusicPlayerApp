
//Handle each state that when it changes, it does it to the opposite boolean

export default function useHandleBooleanState(setStateFunction = ()=>{}){
    setStateFunction((prevState) => {
        return !prevState
    })
}