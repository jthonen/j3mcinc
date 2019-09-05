import { useEffect, useReducer } from "react";
import API from "../../../../utils/api";

export function useCheckAuthenticated (setAuthenticatedAdmin) {
    return useEffect(() => {
        // API.checkAuthenticated then setAuthenticatedAdmin state values to values returned from server
        API.checkAuthenticated()
            .then((results) => {
                if (results.data.authenticated) {
                    setAuthenticatedAdmin({ type: "authenticated", update: true });
                    setAuthenticatedAdmin({ type: "admin", update: results.data.admin });
                } else return window.location.replace(window.location.origin + "/admin");
            })
            .catch(err => {
                console.log("API.checkAuthenticated Request Error:");
                console.log("Error Location: /client/src/AdminPage/hooks/useCheckAuthenticated/index.js Line 12");
                console.log(err);
            });
        // This useEffect instance must contain the empty array brackets below or an API request will be made every time the component updates (on keypress or change)
    }, []);
}

export default function useAuthenticateAdmin () {
    // Initializing authenticated and setAuthenticated useReducer hook
    const [authenticatedAdmin, setAuthenticatedAdmin] = useReducer((state, action) => {
        switch (action.type) {
            case "authenticated": return { ...state, authenticated: action.update };
            case "admin": return { ...state, admin: action.update };
            default: throw new Error('Unexpected action');
        }
    }, { admin: {}, authenticated: false });
    // useCheckAuthenticated to make API request checking user is an authenticated admin.
    // if user is authenticated, authenticated account and authentication state are set to authenticatedAdministator state via setAuthenticatedAdministrator
    useCheckAuthenticated(setAuthenticatedAdmin);
    return { state: authenticatedAdmin, dispatch: setAuthenticatedAdmin };
}
