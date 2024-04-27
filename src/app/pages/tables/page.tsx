import { Cities, columns } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Cities[]> {
  // Fetch data from your API here.
    const res = await fetch('https://public.opendatasoft.com/api/explore/v2.1/catalog/datasets/geonames-all-cities-with-a-population-1000/records?limit=100');
  
    const data = await res.json()
    return data.results;
}

export default async function DemoPage() {
  const data = await getData()
 //console.log({data})
 if(data){
  return (
    <div className="container mx-auto py-10 justify-center">
      shit
      <DataTable columns={columns} data={data} />
    </div>
  )
}

}
