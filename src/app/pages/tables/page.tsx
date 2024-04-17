import { Cities, columns } from "./column"
import { DataTable } from "./data-table"

async function getData(): Promise<Cities[]> {
  // Fetch data from your API here.
  const res = await fetch("http://127.0.0.1:3000/api/list_of_cities");
    const data = await res.json()
    return data.data.results;
}

export default async function DemoPage() {
  const data = await getData()
 //console.log({data})
  return (
    <div className="container mx-auto py-10 justify-center">
      <DataTable columns={columns} data={data} />
    </div>
  )
}
