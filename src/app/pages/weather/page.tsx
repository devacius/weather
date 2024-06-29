import React from 'react'
import Cityweather from "@/components/CityWeather";
type Props = {}

export default async function page({}: Props) {
  return (
    <div>
        <Cityweather/>
    </div>
  )
}