var myHeaders = new Headers();
myHeaders.append("x-access-token", "openuv-7gewjrlrluvafi0a-io");
myHeaders.append("Content-Type", "application/json");
type Params={
  coord:Array<string>;

}
export async function GET(request: Request, context: { params: Params }) {
  const city=context.params.coord;
  const lat=city[0];
  const lon=city[1];
    const res = await fetch(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${lon}&alt=100&dt=`, {
     headers: myHeaders, 
    })
    const data = await res.json()
   
    return Response.json({data})
  }
