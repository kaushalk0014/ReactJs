 const redux=require('redux')
 const createStore=redux.createStore
 const combineReducers = redux.combineReducers

 const BUY_CAKE='BUY_CAKE'
 const BUY_ICECREAMS='BUY_ICECREAMS'

 function buyCake() {
     return{
         type:BUY_CAKE,
         info:"First redux action"
     }
 }
 function buyIceCreams() {
    return{
        type:BUY_ICECREAMS,
        info:"First redux action"
    }
}

 //(previousState, action)=>newState
// const initialState={
//      numOfCakes:10,
//      numOfIceCream:20
// }
// const reducer=(state=initialState,action)=>{
//     switch(action.type){
//         case BUY_CAKE: return{
//             ...state,
//             numOfCakes:state.numOfCakes-1
//         }
//         case BUY_ICECREAMS: return{
//             ...state,
//             numOfIceCream:state.numOfIceCream-1
//         }
//         default: return state
//     }
// }

const initialStateCake={
    numOfCake:10
}

const initialStateIceCream={
    numOfIceCream:20
}

const cakeReducer=(state=initialStateCake,action)=>{
    switch(action.type){
        case BUY_CAKE:return{
            ...state,
            numOfCake:state.numOfCake-1
        }
        default: return state
    }
}

const iceCreamReducer=(state=initialStateIceCream,action)=>{
    switch(action.type){
        case BUY_ICECREAMS:return{
            ...state,
            numOfIceCream:state.numOfIceCream-1
        }
        default: return state
    }
}

const rootReducer=combineReducers({
    cake:cakeReducer,
    iceCream:iceCreamReducer
})
const store=createStore(rootReducer)
console.log("Initial state",store.getState())
store.subscribe(()=>console.log("Updated state", store.getState()))
store.dispatch(buyCake())
store.dispatch(buyCake())
store.dispatch(buyCake())

store.dispatch(buyIceCreams())
store.dispatch(buyIceCreams())
unsubscribe()