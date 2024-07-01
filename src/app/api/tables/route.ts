export async function GET() {
    const res = await fetch(`https://data.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000@public/records?limit=100&refine=timezone%3A%22Asia%22&refine=cou_name_en%3A%22India%22`, {
      
    })
    const data = await res.json()
   
    return Response.json({data})
  }