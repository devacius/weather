import { NextApiRequest, NextApiResponse } from "next";
type Params={
    coord:Array<string>;

}
const apiKey=process.env.WEATHER_API;
export async function GET(request: Request, context: { params: Params }){
   
    const City=context.params.coord;
    const lat=City[0]
    const lon=City[1]
    console.log(lat,lon);
    const response= await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`);
    const data = await response.json();
    return Response.json({data});
}



