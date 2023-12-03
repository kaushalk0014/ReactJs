const redux=require('redux')
const createStore=redux.createStore
const applyMiddleware=redux.applyMiddleware
const thunkMiddleware=require('redux-thunk').default
const axios=require('axios')

const initialState={
    loading:false,
    users:[],
    error:''
}

const FETCH_USERS_REQUEST='FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS='FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE='FETCH_USERS_FAILURE'

const  fetchUserRequest=()=>{
    return{
        type:FETCH_USERS_REQUEST
    }
}

const fetchUsersSuccess=users=>{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}

const fetchUsersFailure=error=>{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}

const reducer=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_USERS_REQUEST:
            return{
                ...state,
                loading:true
            }
        case FETCH_USERS_SUCCESS:
            return{
                loading:false,
                users:action.payload,
                error:''
            }
        case FETCH_USERS_FAILURE:
            return{
                loading:false,
                users:[],
                error:action.payload
            }
    }
}

const fetchUsers=()=>{
    return function(dispatch){
        dispatch(fetchUserRequest())
        axios.get('http://localhost:8086/mockittest/bank/getAll')
        .then(response=>{
            //response.data is arrays of data
            const users=response.data.map(user=>user.bankId);
            dispatch(fetchUsersSuccess(users))
        }).catch(error=>{
            //error message is the error description
            dispatch(fetchUsersFailure())
        })
    }
}

const store=createStore(reducer,applyMiddleware(thunkMiddleware))
store.subscribe(()=>{
    console.log(store.getState())
})
store.dispatch(fetchUsers())