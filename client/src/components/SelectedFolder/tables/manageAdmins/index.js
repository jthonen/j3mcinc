// Importing API utils
import API from "../../../../utils/api";

export default function manageAdminsTable (getDataOn, dashboard, currentUser) {
    return {
        tableId: "admin-manager",
        data: getDataOn.allAdmins(),
        condition: () => {
            return { true: false, condition: null };
        },
        thCols: [{
            key: "name-display-col-head",
            id: "name-display-col-head",
            className: "admin-manager-head-col",
            contents: "Admin Name"
        },
        {
            key: "username-display-col-head",
            id: "username-display-col-head",
            className: "admin-manager-head-col",
            contents: "Admin Username"
        },
        {
            key: "authorization-display-col-head",
            id: "authorization-display-col-head",
            className: "admin-manager-head-col",
            contents: "Authorization Level"
        },
        {
            key: "options-display-col-head",
            id: "options-display-col-head",
            className: "admin-manager-head-col",
            contents: "Admin Options"
        }],
        tdCols: (admin) => {
            return [{
                key: admin.username + "-name-display-span",
                className: "name-display-col admin-manager-data-col",
                contents: admin.firstName + " " + admin.lastName,
                onClick: null
            },
            {
                key: admin.username + "-username-display-span",
                className: "username-display-col admin-manager-data-col",
                contents: admin.username,
                onClick: null
            },
            {
                key: admin.username + "-authorization-display-span",
                className: "authorization-display-col admin-manager-data-col",
                contents: admin.authorization,
                onClick: null
            },
            {
                key: admin.username + "-set-inactive-span",
                className: "set-inactive-col admin-manager-data-col",
                contents: "",
                onClick: () => {
                    // ---- "setInactive":
                    // ---- ---- The "setInactive" click handler is used in one column of each row in the "DataTable" component contained in the "AdminManager" component.
                    // ---- ---- More specifically, the "setInactive" click handler is used in one of the table data column objects in the "manageAdminsTableData" variable.
                    // ---- ---- On clicking a "DataTable" row column using the "setInactive" click handler, the corresponding admin detailed in that row is set as inactive.
                    // ---- ---- In other words, clicking "setInactive" deactivates the selected admin's access to the admin dashboard.
                    // ---- ---- The "setInactive" function uses the "API.setInactive" utils.
                    console.log("Clicked set inactive");
                }
            },
            {
                key: admin.username + "-transfer-ownership-span",
                className: "transfer-ownership-col admin-manager-data-col",
                contents: "",
                onClick: async (admin) => {
                    // ---- "transferOwnership":
                    // ---- ---- The "transferOwnership" click handler is used in one column of each row in the "DataTable" component contained in the "AdminManager" component.
                    // ---- ---- More specifically, the "transferOwnership" click handler is used in one of the table data column objects in the "manageAdminsTableData" variable.
                    // ---- ---- On clicking a "DataTable" row column using the "transferOwnership" click handler, 'ownership' of the NCRC web application dashboard is transfered to corresponding admin detailed in that row.
                    // ---- ---- In other words, clicking "transferOwnership" transfers authorization to use the AdminManager component & its click handlers to the selected admin.
                    // ---- ---- The "transferOwnership" function uses the "API.transferOwnership" & the "API.logout" utils
                    // ---- ---- The "transferOwnership" function also uses the useView hook
                    dashboard.loading.dispatch(true);
                    let data = await API.transferOwnership(admin._id);
                    if (data) {
                        console.log(data);
                        dashboard.loading.dispatch(false);
                        return API.logOut().then(() => {
                            return window.location.replace(window.location.origin + "/admin");
                        });
                    }
                }
            },
            {
                key: admin.username + "-delete-admin-span",
                className: "delete-admin-col admin-manager-data-col",
                contents: "",
                onClick: () => {
                    // "deleteAdmin":
                    // ---- The "deleteAdmin" click handler is used in one column of each row in the "DataTable" component contained in the "AdminManager" component.
                    // ---- More specifically, the "deleteAdmin" click handler is used in one of the table data column objects in the "manageAdminsTableData" variable.
                    // ---- On clicking a "DataTable" row column using the "deleteAdmin" click handler, the corresponding admin detailed in that row is deleted.
                    // ---- In other words, clicking "deleteAdmin" deletes the selected admin's from the NCRC dashboard system (the database)
                    // ---- The "deleteAdmin" function uses the "useAuthenticateAdmin"/"currentUser" hook to determine if the selected admin has admin level authorization or owner level authorization.
                    // ---- ---- If the "currentUser" has admin level authorization, they cannot delete other admins.
                    // ---- ---- If the "currentUser" have owner level authorization, they can delete other admins.
                    // ---- The "deleteAdmin" function uses the "API.deleteAdmin" utils
                    // ---- The "deleteAdmin" function also uses the useView hook
                    if ((currentUser.admin.authorization === "Owner") && (admin.authorization === "Admin")) {
                        dashboard.loading.dispatch(true);
                        API.deleteAdmin(admin._id).then((data) => {
                            console.log(data);
                            dashboard.loading.dispatch(false);
                        });
                        return;
                    } else {
                        // eslint-disable-next-line max-len
                        console.log("Cannot Delete Owner", "To transfer ownership, return to the previous menu and select 'Transfer Ownership'");
                        return;
                    }
                }
            }];
        }
    };
}
