import React, { Component } from "react";
import Chart from "react-google-charts";

const data = [
  ['day', 'a', 'b', 'c', 'd'],
  ['Mon', 20, 28, 38, 45],
  ['Tue', 31, 38, 55, 66],
  ['Wed', 50, 55, 77, 80],
  ['Thu', 77, 77, 66, 50],
  ['Fri', 68, 66, 22, 15],
];

class GoogleChart extends Component {
  
  constructor(props) {
    super(props)
  }

  render() {
      return (
          <div className="container mt-5">
              <h2 className="text-center">Demo page of Bull's Call Chart.</h2>

              <Chart
                width={'100%'}
                height={450}
                chartType="CandlestickChart"
                loader={<div>Loading Chart</div>}
                data={data}
                options={{
                  legend: 'none',
                }}
                rootProps={{ 'data-testid': '1' }}
              />             
          </div>                  
      )
  }
}

export default GoogleChart;