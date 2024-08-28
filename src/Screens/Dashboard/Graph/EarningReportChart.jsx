// import React from 'react'
import { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const EarningReportChart = ({ isDarkMode, chartSeries }) => {
  const textColor = isDarkMode ? '#b6bee3' : '#b6bee3'

  const [chartOptions] = useState({
    chart: {
      type: 'bar',
      // height: 260,
      // width: 690,
      toolbar: {
        show: false // Disable the toolbar, including download SVG button
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '40%',
        borderRadius: 2,
        endingShape: 'rounded',
        dataLabels: {
          position: 'top', // Display data labels at the top of each bar
          formatter(val) {
            return val // Return the value to be displayed
          }
        }
      }
    },
    colors: ['#8103ff'], // Custom colors for the series
    // dataLabels: {
    //   enabled: false
    // },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'Jul', 'Aug', 'Sep'],
      labels: {
        style: {
          colors: textColor // Change y-axis text color
        }
      }
    },
    yaxis: {
      min: 0,
      max: 50,
      tickAmount: 5,
      labels: {
        formatter(value) {
          return `${value}k` // Append 'k' to the value for thousands
        },
        style: {
          colors: textColor // Change y-axis text color
        }
      }
    },
    grid: {
      show: false // Hides the grid lines
    },
    fill: {
      opacity: 0.6
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

  return <ReactApexChart options={chartOptions} series={chartSeries} type="bar" height="100%" width="100%" />
}

export default EarningReportChart
