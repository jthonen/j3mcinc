import { useState, useEffect } from "react";
import API from "../../../../utils/api";

function useGetDataOnAllAdmins () {
    const [allAdmins, setAllAdmins] = useState([]);
    useEffect(() => {
        let fetchAllAdmins = async () => {
            let results = await API.getAllAdmins();
            return setAllAdmins(results.data);
        };
        fetchAllAdmins();
        // Passing an empty array as the second argument to useEffect makes it only run on mount and unmount, thus stopping any infinite loops.
    }, []);
    return allAdmins;
}

function useGetDataOnAllProgramCategories () {
    const [allProgramCategories, setAllProgramCategories] = useState([]);
    useEffect(() => {
        let fetchAllProgramCategories = async () => {
            let results = await API.getAllProgramCategories();
            return setAllProgramCategories(results.data);
        };
        fetchAllProgramCategories();
    }, []);
    return allProgramCategories;
}

function useGetDataOnAllProgramSubcategories () {
    const [allProgramSubcategories, setAllProgramSubcategories] = useState([]);
    useEffect(() => {
        let fetchAllProgramCategories = async () => {
            let results = await API.getAllProgramSubcategories();
            return setAllProgramSubcategories(results.data);
        };
        fetchAllProgramCategories();
    }, []);
    return allProgramSubcategories;
}


function useGetDataOnAllPrograms () {
    const [allPrograms, setAllPrograms] = useState([]);
    useEffect(() => {
        let fetchAllPrograms = async () => {
            let results = await API.getAllPrograms();
            return setAllPrograms(results.data);
        };
        fetchAllPrograms();
    }, []);
    return allPrograms;
}

export default {
    allAdmins: useGetDataOnAllAdmins,
    allProgramCategories: useGetDataOnAllProgramCategories,
    allProgramSubcategories: useGetDataOnAllProgramSubcategories,
    allPrograms: useGetDataOnAllPrograms
};
