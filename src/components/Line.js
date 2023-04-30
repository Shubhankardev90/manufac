import axios from 'axios'
import EChartsReact from 'echarts-for-react'
import React, { useEffect, useState } from 'react'

const Line = () => {
  const [data, setData] = useState([])

  const fetchData  = async() =>{
    try{
      const resData = await axios.get('Wine-Data.json')
      setData(resData.data);
    }catch(e){
      console.log(e);
    }
  }



  const options = {
    grid: { top: 50, right: 80, bottom: 50, left: 50 },
    xAxis: {
      type: "category",
      name:"Flavanoids",
      data: data.map(d => d.Flavanoids)
    },
    yAxis: {
      type: "value",
      name:"Ash"
    },
    series: [
      {
        data: data.map(d => d.Ash),
        type: "line",
        smooth: true,
      }
    ],
    tooltip: {
      trigger: "axis"
    }
  }

  useEffect(()=>{
    fetchData()
  },[])

  return (
    <EChartsReact
      option={options}
      style={{ width: "100%", height: "400px" }}
    ></EChartsReact>
  )
}

export default Line