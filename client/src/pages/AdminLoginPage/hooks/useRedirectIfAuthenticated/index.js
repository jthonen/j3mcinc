import { useEffect } from "react";
import API from "../../../../utils/api";

export default function useRedirectIfAuthenticated () {
    return useEffect(() => {
        // API.checkAuthenticated then setAuthenticatedAdmin state values to values returned from server
        API.checkAuthenticated()
            .then((results) => {
                if (results.data.authenticated) {
                    return window.location.replace(window.location.origin + "/admin/dashboard");
                } else return;
            })
            .catch(err => {
                console.log("API.checkAuthenticated Request Error:");
                console.log("Error Location: /client/src/AdminPage/hooks/useCheckAuthenticated/index.js Line 12");
                console.log(err);
            });
        // This useEffect instance must contain the empty array brackets below or an API request will be made every time the component updates (on keypress or change)
    }, []);
}
