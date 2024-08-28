// import React from 'react'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const RevenueGrowth = ({ isDarkMode }) => {
  const textColor = isDarkMode ? '#b6bee3' : '#b6bee3'

  const [chartOptions] = useState({
    chart: {
      type: 'bar',
      // height: 170,
      // width: 157,
      toolbar: {
        show: false // Disable the toolbar, including download SVG button
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '45%',
        borderRadius: 5,
        endingShape: 'rounded'
      }
    },
    colors: ['#00c365'], // Custom colors for the series
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
      axisBorder: {
        show: false // Hides the x-axis line
      },
      axisTicks: {
        show: false // Hides the x-axis ticks
      },
      labels: {
        style: {
          colors: textColor // Change x-axis text color
        }
      }
    },
    yaxis: {
      min: 0,
      max: 60,
      title: {
        text: '$ (thousands)'
      },
      show: false
    },
    grid: {
      show: false // Hides the grid lines
    },
    fill: {
      opacity: 0.7
    },
    tooltip: {
      y: {
        formatter(val) {
          return `$ ${val} thousands`
        }
      },
      enabled: false
    }
  })

  const [chartSeries] = useState([
    {
      name: 'Net Profit',
      data: [10, 20, 30, 40, 50, 40, 30]
    }
  ])

  return <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height="100%" width="100%" />
}

export default RevenueGrowth
