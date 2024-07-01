
type Params={
  coord:Array<string>;

}
export async function GET(request: Request, context: { params: Params }) {
  const city=context.params.coord;
  const lat=city[0];
  const lon=city[1];
    const res = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${lat}&longitude=${lon}`, {
    
    })
    const data = await res.json()
   
    return Response.json({data})
  }
