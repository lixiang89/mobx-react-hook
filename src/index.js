import { isObservable, toJS, reaction } from "mobx"
import { useState, useEffect } from "react"

/**
 * 
 * @param {function|object} args mobx reaction function or mobx observable object
 */
function useObserver(args){
    let state
    let func
    if(typeof args==="function"){
        func=args
        state=args()
    }else if(isObservable(args)){
        state=args
        func=()=>toJS(state)
    }else{
        console.warn('args is not a mobx object or a reaction function')
        return args
    }
    const [res,setRes]=useState(toJS(state));
    const dispose=reaction(func,s=>{setRes(s)})
    useEffect(()=>()=>{dispose()},[])
    return res
}

export {
    useObserver
}