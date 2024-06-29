"use client";

import { useEffect,useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  
export default function CityTable() {
    const[cityData, setCityData] = useState<[]>([]);
    const [main,setMain ] = useState<[]>([]);
    const [coord,setCoord] = useState<[]>([]);
    const [weather,setWeather] = useState<[]>([]);
    const [wind,setWind] = useState<[]>([]);
    const [lat, setLat] = useState<number>();
    const [lon, setLon] = useState<number>();
    useEffect(() => {
    async function getData() {
            const storedLat = localStorage.getItem("lat");
            const storedLon = localStorage.getItem("lon");
            if (storedLat && storedLon) {
                const lat = parseFloat(storedLat);
                const lon = parseFloat(storedLon);
                setLat(lat);
                setLon(lon);
            console.log(lat,lon);
        const response = await fetch(`/api/weather/${lat}/${lon}`);
        
        if (!response.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }
        const data = await response.json();
        console.log({data});
        setCityData(data.data);
        setMain(data.data.main);
        setCoord(data.data.coord);
        setWeather(data.data.weather[0]);
        setWind(data.data.wind);
        
       
    }
        
        
    }
    getData();
}
    , []);
    
    const data =  cityData;
    if (data&&main&&coord&&weather&&wind) {
        return (
            <div className="flex flex-col  w-auto h-auto min-h-screen min-w-screen">
                <div className="flex flex-row  p-4 space-x-3  max-h-2/3 w-full">
                    <div className="flex max-h-96 min-w-1/3  mr-10">
                       <Card>
                            <CardHeader>
                                 <CardTitle>{data.name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-row items-center">
                                    <div>day</div><div>date</div>
                                </div>
                                <div className="py-10">
                                    <p className="text-5xl font-bold"> {main.temp}°</p>
                                   
                                </div>
                                <div className="flex flex-col">
                                    <p>Humidity:{main.humidity}</p>
                                    <p>Sea Level:{main.sea_level}</p>
                                </div>
                            </CardContent>
                       </Card>
                    </div>
                    <div className="flex flex-row  h-full w-full p-2 space-x-8">
                       <div className="flex max-h-64 max-w-64">
                       <Card>
                            <CardHeader>
                                 <CardTitle>Description</CardTitle>
                            </CardHeader>
                            <CardContent>
                            
                                <div className="py-5">
                                    <p className="text-5xl font-bold"> {weather.main}</p>
                                   
                                </div>
                                <div className="flex flex-col">
                                    <p>{weather.description}</p>
                                    <p>{main.feels_like}°</p>
                                   
                                </div>
                            </CardContent>
                       </Card>
                       </div>
                       <div className="flex max-h-64 max-w-64">
                       <Card>
                            <CardHeader>
                                 <CardTitle>Visibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                               
                                <div className="py-5">
                                    <p className="text-5xl font-bold"> {data.visibility}</p>
                                   
                                </div>
                                
                            </CardContent>
                       </Card>
                       </div>
                       <div className="flex max-h-64 max-w-64">
                       <Card>
                            <CardHeader>
                                 <CardTitle>Pressure</CardTitle>
                            </CardHeader>
                            <CardContent>
                               
                                <div className="py-5">
                                    <p className="text-4xl font-bold"> {main.pressure}hPa</p>
                                   
                                </div>
                                <div>
                                    <p>{(main.pressure<1000)?"Low Air Pressure":(main.pressure>1020)?"High Air Pressure":"Medium Air Pressure"}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p> Wind Speed:{wind.speed}</p>
                                    <p>Wind Degree:{wind.deg}</p>
                                    <p>Wind Gust:{wind.gust}</p>
                                </div>
                                
                            </CardContent>
                       </Card>
                       </div>
                    </div>
                </div>
              <div className="">
                        big
                        {lat},{lon}
              </div>
            </div>
        );
    }
    return (
        <div>
            <h1>Loading...</h1>
        </div>
    );
}