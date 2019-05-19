import React, { Component } from 'react'
import { Chart } from 'react-charts'

export default class extends Component {
  render() {
    const { a, b, c, d } = this.props.data
    return (
      <div
        style={{
          width: '35vw',
          height: '400px',
          margin: 'auto'
        }}
      >
        <Chart
          data={[
            {
              label: 'Series 1',
              data: a
            },
            {
              label: 'Series 2',
              data: b
            },
            {
              label: 'Series 2',
              data: c
            },
            {
              label: 'Series 2',
              data: d
            }
          ]}
          axes={[
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
          ]}
        />
      </div>
    )
  }
}
