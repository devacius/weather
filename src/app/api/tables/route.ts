export async function GET() {
    const res = await fetch(`https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100`, {
      
    })
    const data = await res.json()
   
    return Response.json({ data })
  }