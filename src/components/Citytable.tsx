"use client";
import { DataTable } from "@/app/pages/tables/data-table";
import { Cities,columns } from "@/app/pages/tables/column"; // Import the 'Cities' value from the appropriate file
import { useEffect,useState } from "react";

export default function CityTable() {
    const[cityData, setCityData] = useState<Cities[]>([]);
    useEffect(() => {
    async function getData() {
        const response = await fetch("/api/tables");
        const data = await response.json();
        setCityData(data.data.results);
        
    }
    getData();
}
    , []);
    
    const data =  cityData;
    console.log({data})
    if (data) {
        return (DataTable({ data: data, columns: columns }));
    }
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
}