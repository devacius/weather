"use client"
import { Button } from "@/components/ui/button"
import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Citites = {
  geoname_id: string
  name: string
  cou_name_en:string 
  population:number
  timezone:string
  coordinates:{
    lat:number
    lon:number
  
  }
}

export const columns: ColumnDef<Citites>[] = [
  {
    accessorKey: "geoname_id",
    header: "ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "cou_name_en",
    header: "Country",
  },
  {
    accessorKey: "population",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Population
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
  },
  {
    accessorKey: "timezone",
    header: "Timezone",
  },
  {
    accessorKey: "coordinates.lat",
    header: "Latitude",
  },
  {
    accessorKey: "coordinates.lon",
    header: "Longitude",
  }
]
