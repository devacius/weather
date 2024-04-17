export async function GET(request: Request) {
    const {searchParams}= new URL (request.url)
    const lat=searchParams.get('lat');
    const lon=searchParams.get('lon');
    const res = await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.WEATHER_API}`);
    const data = await res.json()
   
    return Response.json({ data })
  }