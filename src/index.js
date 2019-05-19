import React, { Component } from 'react'
import dom from 'react-dom'
import App from './app'
import './all.css'
class Index extends Component {
  render() {
    return <App />
  }
}
dom.render(<Index />, document.getElementById('root'))
