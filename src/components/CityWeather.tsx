"use client";

import { useEffect,useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card";


interface CityData {
      main: {
          temp: number;
          feels_like: number;
          temp_min: number;
          temp_max: number;
          pressure: number;
          humidity: number;
          sea_level: number;
      };
      coord: {
          lon: number;
          lat: number;
      };
      weather: {
          id: number;
          main: string;
          description: string;
          icon: string;
      };
      visibility: number;
      wind: {
          speed: number;
          deg: number;
          gust: number;
      };
      name:string;
      
    // Add other properties as needed
  }
  interface CityUV {
    result: {
        uv: number;
        uv_time: string;
        uv_max: number;
        uv_max_time: string;
        ozone: number;
        safe_exposure_time: {
            st1: string;
            st2: string;
            st3: string;
            st4: string;
            st5: string;
        };
        sun_info: {
            sun_times: {
                solarNoon: string;
                nadir: string;
                sunrise: string;
                sunset: string;
                sunrise_end: string;
                sunset_start: string;
                dawn: string;
                dusk: string;
            };
            sun_position: {
                azimuth: number;
                altitude: number;
            };
        };
    };
    result_time: string;
    uv_max: number;
    uv_max_time: string;
    uv: number;
    uv_time: string;
    safe_exposure_time: {
        st1: string;
        st2: string;
        st3: string;
        st4: string;
        st5: string;
    };
    sun_info: {
        sun_times: {
            solarNoon: string;
            nadir: string;
            sunrise: string;
            sunset: string;
            sunrise_end: string;
            sunset_start: string;
            dawn: string;
            dusk: string;
        };
        sun_position: {
            azimuth: number;
            altitude: number;
        };
    };
    sun_position: {
        azimuth: number;
        altitude: number;
    };
    ozone: number;
    lat: number;
    lon: number;
    date: string;
    time_offset: number;
    location: string;
}
interface CityTime{
         year: number;
        month: number;
        day: number;
        hour: number;
        minute: number;
        seconds: number;
        milliSeconds: number;
        dateTime: string;
        date: string;
        time: string;
        timeZone: string;
        dayOfWeek: string;
        dstActive: boolean;
    
}
  
export default function CityTable() {
    
    
    const [cityData, setCityData] = useState<CityData[] | null>(null);
    const [main,setMain ] = useState<CityData['main']| null >(null);
    const [coord,setCoord] = useState<CityData['coord']| null >(null);
    const [weather,setWeather] = useState<CityData['weather']|null >(null);
    const [wind,setWind] = useState<CityData['wind']|null>(null);
    const [lat, setLat] = useState<number>();
    const [lon, setLon] = useState<number>();
    const [name, setName] = useState<string>();
    const[visibility, setVisibility] = useState<number>();
    const [cityuv,setCityuv] = useState<CityUV|null >(null);
    const [time,setTime]=useState<CityTime | null>(null);
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
        const uvresponse = await fetch(`/api/UV/${lat}/${lon}`);
        const timeResponse = await fetch(`/api/time/${lat}/${lon}`);
        
        if (!response.ok||!uvresponse.ok||!timeResponse.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error('Failed to fetch data')
        }
        const uvdata = await uvresponse.json();
        const data = await response.json();
        const timedata = await timeResponse.json();
        console.log({data});
        console.log({uvdata});
        setTime(timedata.data)
        setCityuv(uvdata.data);
        setCityData(data.data);
        setMain(data.data.main);
        setCoord(data.data.coord);
        setWeather(data.data.weather[0]);
        setWind(data.data.wind);
        setName(data.data.name);
        setVisibility(data.data.visibility);
       
    }
        
        
    }
    getData();
}
    , []);
    
    const data =  cityData;
    const uvdata=cityuv;
    const timedata=time;
    type timedata={dayOfWeek:string,date:string,time:string};
    if (data&&main&&coord&&weather&&wind&&uvdata) {
        return (
            <div className="flex flex-col  w-auto h-auto min-h-screen min-w-screen">
                <div className="flex flex-row  p-4 space-x-3  max-h-2/3 w-full">
                    <div className="flex max-h-96 min-w-1/3  mr-10">
                       <Card>
                            <CardHeader>
                                <CardTitle>{name}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-row items-center space-x-8">
                                    
                                    <div>{timedata?.dayOfWeek}</div><div>{timedata?.date}</div>
                                </div>
                                <div>{timedata?.time}</div>
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
                       <div className="flex max-h-74 max-w-64">
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
                       <div className="flex max-h-74 max-w-64">
                       <Card>
                            <CardHeader>
                                 <CardTitle>Visibility</CardTitle>
                            </CardHeader>
                            <CardContent>
                               
                                <div className="py-5">
                                    <p className="text-5xl font-bold"> {visibility}</p>
                                   
                                </div>
                                
                            </CardContent>
                       </Card>
                       </div>
                       <div className="flex max-h-74 max-w-64">
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
                       <div className="flex max-h-74 max-w-64">
                       <Card>
                            <CardHeader>
                                 <CardTitle>UV Index</CardTitle>
                            </CardHeader>
                            <CardContent>
                               
                                <div className="py-5">
                                    <p className="text-4xl font-bold"> {uvdata.result.uv}</p>
                                   
                                </div>
                                <div>
                                    <p className="text-sm">{(main.pressure<=2)?"You can safely enjoy being outside!":(main.pressure>7)?"Avoid being outside during midday hours! ":"Seek shade during midday hours! slop on sunscreen and slap on hat!"}</p>
                                </div>
                                <div className="flex flex-col">
                                    <p><b> Max UV Index:</b>{uvdata.result.uv_max}</p>
                                    <p><b>Max UV Time:</b>{uvdata.result.uv_max_time}</p>
                                    <p><b>Ozone Value:</b>{uvdata.result.ozone}</p>
                                </div>
                                
                            </CardContent>
                       </Card>
                       </div>
                    </div>
                </div>
              <div className="">
                      
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