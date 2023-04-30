import axios from 'axios'
import React, { useEffect, useState } from 'react'
import EChartsReact from 'echarts-for-react'

const Bar = () => {
  const [data, setData] = useState([])
  const [alcoholCategories, setAlcoholCategories] = useState({})

  const fetchData = async () => {
    try {
      const resData = await axios.get('Wine-Data.json')
      setData(resData.data)
      const minMagnesiumByCategory = resData.data.reduce((acc, wine) => {
        if (!acc[wine.Alcohol] || wine.Magnesium < acc[wine.Alcohol]) {
          acc[wine.Alcohol] = wine.Magnesium;
        }
        return acc;
      }, {});
      setAlcoholCategories(minMagnesiumByCategory)
    } catch (e) {
      console.log(e);
    }
  }

  const options = {
    grid: { top: 50, right: 80, bottom: 50, left: 50 },
    xAxis: {
      type: "category",
      name:"Alcohol",
      data: Object.keys(alcoholCategories).map(k => k)
    },
    yAxis: {
      type: "value",
      name:"Magnesium"
    },
    series: [
      {
        data: Object.values(alcoholCategories),
        type: "bar",
        smooth: true,
      }
    ],
    tooltip: {
      trigger: "axis"
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <EChartsReact
      option={options}
      style={{ width: "100%", height: "400px" }}
    ></EChartsReact>
    
  )
}

export default Bar