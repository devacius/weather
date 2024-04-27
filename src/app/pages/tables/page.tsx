import { Cities, columns } from "./column"
import { DataTable } from "./data-table"
import axios from 'axios'

async function getData(): Promise<Cities[]> {
  // Fetch data from your API here.
    const res = await axios.get(`/api/tables`);
  
  
    return res.data.results;
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
