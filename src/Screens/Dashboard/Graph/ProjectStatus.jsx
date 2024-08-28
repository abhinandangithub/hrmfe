import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const ProjectStatus = () => {
  const [chartOptions] = useState({
    chart: {
      // height: 78,
      type: 'area',
      toolbar: {
        show: false // Disable the toolbar, including download SVG button
      }
    },
    dataLabels: {
      enabled: false
    },
    colors: ['#ffc123'],
    stroke: {
      curve: 'stepline',
      width: 1 // Adjust the width as needed (e.g., set it to 1 for a thinner line)
    },
    xaxis: {
      categories: ['10', '20', '30', '40', '50', '60', '70', '80', '90', '100'],
      axisBorder: {
        show: false // Hides the x-axis line
      },
      axisTicks: {
        show: false // Hides the x-axis ticks
      },
      labels: {
        show: false // Hides the x-axis scale values
      }
    },
    yaxis: {
      min: 0,
      max: 1000,
      show: false
    },
    grid: {
      show: false // Hides the grid lines
    },
    tooltip: {
      x: {
        format: 'dd/MM/yy HH:mm'
      },
      enabled: false
    }
  })

  const [chartSeries] = useState([
    {
      name: 'sales',
      data: [400, 300, 200, 400, 600, 600, 900, 700, 600, 500]
    }
  ])

  return <ReactApexChart options={chartOptions} series={chartSeries} type="area" height="100%" width="100%" />
}

export default ProjectStatus
