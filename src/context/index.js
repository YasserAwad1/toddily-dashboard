import { createContext, useContext, useEffect, useMemo, useReducer } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";
import { request } from "../api/request";
import { useQuery } from "@tanstack/react-query";
import CubeLoader from "../components/CubeLoader/CubeLoader";

const JawadAuth = createContext(null);

JawadAuth.displayName = "JawadAuthContext";


function reducer(state, action) {
    switch (action.type) {
      case 'login' : {
        Cookies.set('_toddily_admin_token' , action.value.token)
        Cookies.set('_isAuth' , true)
        return {
            isAuth : true,
            user : action.value.user,
            token : Cookies.get('_toddily_admin_token')
        }
      }
      case 'logout' : {
        Cookies.remove('_toddily_admin_token')
        Cookies.remove('_profile')
        Cookies.remove('_isAuth')
        return {
            ...state,
            isAuth : false,
            user : '',
            token : ''
        }
      }
      case 'SET_OPEN_SIDEBAR' : {
        return {
          ...state,
          openSidebar : action.value
      }
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`);
      }
    }
  }


function JawadAuthControllerProvider({ children }) {
    const initialState = {
      user : Cookies.get('_profile'),
      isAuth : Cookies.get('_isAuth'),
      token : Cookies.get('_toddily_admin_token'),
      openSidebar : false
    };
  
    const [controller, dispatch] = useReducer(reducer, initialState);
  
    const value = useMemo(() => [controller, dispatch], [controller, dispatch]);
  
    return <JawadAuth.Provider value={value}> {children} </JawadAuth.Provider>;
  }



  function useJawadAuthController() {
    const context = useContext(JawadAuth);
  
    if (!context) {
      throw new Error("useSoftUIController should be used inside the SoftUIControllerProvider.");
    }
  
    return context;
  }

  const login = (dispatch , value) => {
    dispatch({
        type : 'login',
        value : value
    })
  }

  const logout = (dispatch , value) => {
    dispatch({type : 'logout'})
  }

  const setOpenSidebar = (dispatch, value) => dispatch({ type: "SET_OPEN_SIDEBAR", value });

  const RequireAuth = ({children}) => {
    const [controller , dispatch] = useContext(JawadAuth);
    const { isAuth } = controller
    const navigate = useNavigate()

    const {isLoading , isError , error} = useQuery({
      queryKey : ['test-token-in-server'],
      queryFn : () => {
        return request({
          url : '/testtestToken',
          method : 'get'
        })
      },
      retry : false
    })

    if(isLoading){
      return <CubeLoader />
    }
    if(isError){
      if(error.response.status === 401){
        return navigate('/auth/signin')
      }
    }

    return children
}

  export {
    JawadAuthControllerProvider,
    useJawadAuthController,
    setOpenSidebar,
    login,
    logout,
    RequireAuth
  }