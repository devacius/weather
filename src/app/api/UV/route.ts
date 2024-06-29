var myHeaders = new Headers();
myHeaders.append("x-access-token", "openuv-7gewjrlrluvafi0a-io");
myHeaders.append("Content-Type", "application/json");

export async function GET() {
    const res = await fetch(`https://api.openuv.io/api/v1/uv?lat=51.5&lng=-0.11&alt=100&dt=`, {
     headers: myHeaders, 
    })
    const data = await res.json()
   
    return Response.json({data})
  }
