import React, { useState } from "react";
import Chart from 'react-apexcharts';

const AdminDashboard = () => {
  const [series, setSeries] = useState([
    {
      data: [21, 22, 10, 28, 16, 21, 13, 30],
    },
  ]);

  const colors = ["#3182CE", "#E53E3E", "#38A169", "#6B46C1", "#F6AD55"];



  const [options, setOptions] = useState({
    chart: {
      height: 350,
      type: 'bar',
      events: {
        click: function (chart, w, e) {
          // console.log(chart, w, e)
        },
      },
    },
    colors: colors,
    plotOptions: {
      bar: {
        columnWidth: '45%',
        distributed: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    xaxis: {
      categories: [
        ['John', 'Doe'],
        ['Joe', 'Smith'],
        ['Jake', 'Williams'],
        'Amber',
        ['Peter', 'Brown'],
        ['Mary', 'Evans'],
        ['David', 'Wilson'],
        ['Lily', 'Roberts'],
      ],
      labels: {
        style: {
          colors: colors,
          fontSize: '12px',
        },
      },
    },
  });

  return (
    <div id="chart" className="mt-5 w-full" >
    <h1 className="font-serif text-2xl text-start underline">Appointment graph</h1>
      <Chart options={options} series={series} type="bar" height={350}  className="w-3/4"/>
    </div>
  );
};

export default AdminDashboard;
