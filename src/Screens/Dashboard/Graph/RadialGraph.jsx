import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const RadialGraph = () => {
  const [chartOptions] = useState({
    chart: {
      // height: 340,
      type: 'radar',
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      },
      toolbar: {
        show: false // Disable the toolbar, including the download SVG button
      }
    },
    title: {
      text: undefined
    },
    stroke: {
      width: 2
    },
    fill: {
      type: 'solid', // Set fill type to 'solid' for solid color
      colors: ['#3b5998', '#00E396'], // Custom colors for the series
      opacity: 0.7 // Set opacity to 0.9 for high opacity
    },
    markers: {
      size: 0
    },
    yaxis: {
      stepSize: 10,
      labels: {
        formatter: (value) => {
          // Custom formatter to hide specific scale values
          if (value % 10 === 0) {
            return '' // Return empty string to hide the scale value
          }
          return value // Return the original value for other scale values
        }
      }
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June']
    },
    legend: {
      show: true,
      labels: {
        colors: ['#b6bee3', '#b6bee3'], // Custom colors for the series legend labels
        useSeriesColors: false // Disable using series colors for the legend labels
      }
    }
  })

  const [chartSeries] = useState([
    {
      name: 'sales',
      data: [42, 38, 36, 40, 32, 36]
    },
    {
      name: 'visit',
      data: [35, 46, 28, 26, 28, 30]
    }
  ])

  return (
    <ReactApexChart options={chartOptions} series={chartSeries} type="radar" height="100%" width="100%" />
  )
}

export default RadialGraph
