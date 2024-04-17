import { Cities, columns } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Cities[]> {
  // Fetch data from your API here.
  const res = await fetch(`https://${process.env.VERCEL_URL}/api/list_of_cities1`);
    const data = await res.json()
    return data.data.results;
}

export default async function DemoPage() {
  const data = await getData()
 //console.log({data})
 if(data){
  return (
    <div className="container mx-auto py-10 justify-center">
      <DataTable columns={columns} data={data} />
    </div>
  )
}

}
