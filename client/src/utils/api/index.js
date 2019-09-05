import axios from "axios";

export default {
    checkAuthenticated: function () {
        return axios.get("/api/admin/check-authenticated");
    },
    logOut: function () {
        return axios.get("/api/admin/logout");
    },
    getAllAdmins: function () {
        return axios.get("/api/admin/get-all");
    },
    addNewAdmin: function (registering) {
        return axios.post("/api/admin/add-new", registering);
    },
    deleteAdmin: function (adminId) {
        return axios.delete("/api/admin/delete/_id/" + adminId);
    },
    transferOwnership: function (adminId) {
        return axios.put("/api/admin/transfer-ownership/_id/" + adminId);
    },
    resetPassword: function (data) {
        return axios.post("/api/admin/reset-password", data);
    },
    addNewProgramCategory: function (categoryData) {
        return axios.post("/api/programs/add-new-category", categoryData);
    },
    getAllProgramCategories: function () {
        return axios.get("/api/programs/get-all-categories");
    },
    addNewProgramSubcategory: function (subcategoryData) {
        return axios.post("/api/programs/add-new-subcategory", subcategoryData);
    },
    getAllProgramSubcategories: function () {
        return axios.get("/api/programs/get-all-subcategories");
    },
    addNewProgram: function (programData) {
        return axios.post("/api/programs/add-new-program", programData);
    },
    getAllPrograms: function () {
        return axios.get("/api/programs/get-all-programs");
    }
};
