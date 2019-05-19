import React, { Component } from 'react'
import { Row, Col, Card, CardBody, CardFooter } from 'reactstrap'
import Input from '@material-ui/core/Input'
import PlotChart from './plot'

const whoBest = sum => {
  const max = Math.max(sum.a, sum.b, sum.c, sum.d)
  if (max === sum.a) return { name: 'a', sum: sum.a, color: 'green' }
  else if (max === sum.b) return { name: 'b', sum: sum.b, color: 'green' }
  else if (max === sum.c) return { name: 'c', sum: sum.c, color: 'green' }
  else if (max === sum.d) return { name: 'd', sum: sum.d, color: 'green' }
}
const whoWorst = sum => {
  const min = Math.min(sum.a, sum.b, sum.c, sum.d)
  if (min === sum.a) return { name: 'a', sum: sum.a, color: 'red' }
  else if (min === sum.b) return { name: 'b', sum: sum.b, color: 'red' }
  else if (min === sum.c) return { name: 'c', sum: sum.c, color: 'red' }
  else if (min === sum.d) return { name: 'd', sum: sum.d, color: 'red' }
}
export default class extends Component {
  state = {
    focus: null,
    name: {
      a: '',
      b: '',
      c: '',
      d: ''
    },
    sum: {
      a: 0,
      b: 0,
      c: 0,
      d: 0
    },
    table: [
      {
        a: 0,
        b: 0,
        c: 0,
        d: 0
      }
    ],
    best: { name: '', sum: '', color: '' },
    worst: { name: '', sum: '', color: '' }
  }
  changeName = (name, val) =>
    this.setState({
      name: { ...this.state.name, [name]: val },
      focus: `name-${name}`
    })

  addRow = () => {
    this.setState({
      table: this.state.table.concat([
        {
          a: 0,
          b: 0,
          c: 0,
          d: 0
        }
      ]),
      sum: {
        a: this.state.table
          .map(row => row.a)
          .filter(e => !isNaN(e))
          .reduce((a, b) => a + b),
        b: this.state.table
          .map(row => row.b)
          .filter(e => !isNaN(e))
          .reduce((a, b) => a + b),
        c: this.state.table
          .map(row => row.c)
          .filter(e => !isNaN(e))
          .reduce((a, b) => a + b),
        d: this.state.table
          .map(row => row.d)
          .filter(e => !isNaN(e))
          .reduce((a, b) => a + b)
      },
      focus: `a-${this.state.table.length}`
    })
  }
  changeIndex = (index, field, value) => {
    this.setState(
      {
        table: this.state.table.map((row, idx) => {
          if (idx === index)
            return {
              ...row,
              [field]: isNaN(parseFloat(value)) ? null : parseFloat(value)
            }
          return { ...row }
        }),
        focus: `${field}-${index}`
      },
      () => {
        this.setState(
          {
            sum: {
              a: this.state.table
                .map(row => row.a)
                .filter(e => !isNaN(e))
                .reduce((a, b) => a + b),
              b: this.state.table
                .map(row => row.b)
                .filter(e => !isNaN(e))
                .reduce((a, b) => a + b),
              c: this.state.table
                .map(row => row.c)
                .filter(e => !isNaN(e))
                .reduce((a, b) => a + b),
              d: this.state.table
                .map(row => row.d)
                .filter(e => !isNaN(e))
                .reduce((a, b) => a + b)
            }
          },
          () => {
            const best = whoBest(this.state.sum)
            const worst = whoWorst(this.state.sum)
            this.setState({
              best: best,
              worst: worst
            })
          }
        )
      }
    )
  }

  render() {
    return (
      <Row className='mt-3 ml-3 mr-3'>
        <Col className='col-sm-7'>
          <Card>
            <CardBody>
              <Row>
                <Col className='text-center'>
                  <strong>Ceki Game</strong>
                </Col>
                <Col className='text-right col-sm-3'>
                  <span>
                    <small className='mr-3' style={{ color: 'green' }}>
                      Best
                    </small>
                    <small style={{ color: 'red ' }}>Worst</small>
                  </span>
                </Col>
              </Row>
              <br />
              <br />
              <Row className='mb-3'>
                <Col>
                  <div className='table-responsive'>
                    <table className='table table-borderless'>
                      <tbody>
                        {this.state.table.map((row, idx) => (
                          <tr key={Math.random()}>
                            <td>
                              <Input
                                style={{ color: 'white' }}
                                type='number'
                                onKeyPress={e =>
                                  e.key === 'Enter' && this.addRow()
                                }
                                autoFocus={this.state.focus === `a-${idx}`}
                                value={row.a}
                                onChange={e =>
                                  this.changeIndex(idx, 'a', e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                style={{ color: 'white' }}
                                type='number'
                                onKeyPress={e =>
                                  e.key === 'Enter' && this.addRow()
                                }
                                autoFocus={this.state.focus === `b-${idx}`}
                                value={row.b}
                                onChange={e =>
                                  this.changeIndex(idx, 'b', e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                style={{ color: 'white' }}
                                type='number'
                                onKeyPress={e =>
                                  e.key === 'Enter' && this.addRow()
                                }
                                value={row.c}
                                autoFocus={this.state.focus === `c-${idx}`}
                                onChange={e =>
                                  this.changeIndex(idx, 'c', e.target.value)
                                }
                              />
                            </td>
                            <td>
                              <Input
                                style={{ color: 'white' }}
                                type='number'
                                onKeyPress={e =>
                                  e.key === 'Enter' && this.addRow()
                                }
                                value={row.d}
                                autoFocus={this.state.focus === `d-${idx}`}
                                onChange={e =>
                                  this.changeIndex(idx, 'd', e.target.value)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                        <tr>
                          <td>
                            <label>
                              <small style={{ color: 'white' }}>Player</small>
                            </label>
                          </td>
                        </tr>
                        <tr className='mt-3'>
                          <td>
                            <Input
                              style={{ color: 'white' }}
                              placeholder='Player 1'
                              value={this.state.name.a}
                              autoFocus={this.state.name.a === 'name-a'}
                              onChange={e =>
                                this.changeName('a', e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <Input
                              style={{ color: 'white' }}
                              placeholder='Player 2'
                              value={this.state.name.b}
                              autoFocus={this.state.name.b === 'name-b'}
                              onChange={e =>
                                this.changeName('b', e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <Input
                              style={{ color: 'white' }}
                              placeholder='Player 3'
                              value={this.state.name.c}
                              autoFocus={this.state.name.c === 'name-c'}
                              onChange={e =>
                                this.changeName('c', e.target.value)
                              }
                            />
                          </td>
                          <td>
                            <Input
                              style={{ color: 'white' }}
                              placeholder='Player 4'
                              autoFocus={this.state.name.d === 'name-d'}
                              value={this.state.name.d}
                              onChange={e =>
                                this.changeName('d', e.target.value)
                              }
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label>
                              <small style={{ color: 'white' }}>
                                Sum Player
                              </small>
                            </label>
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <Input
                              style={{
                                color: colorGenerator(
                                  isNaN(this.state.sum.a)
                                    ? 0
                                    : this.state.sum.a,
                                  this.state.best.sum,
                                  this.state.worst.sum
                                )
                              }}
                              placeholder={`Sum ${
                                this.state.name.a === ''
                                  ? 'Player 1'
                                  : this.state.name.a
                              }`}
                              value={this.state.sum.a}
                              disabled
                            />
                          </td>
                          <td>
                            <Input
                              style={{
                                color: colorGenerator(
                                  isNaN(this.state.sum.b)
                                    ? 0
                                    : this.state.sum.b,
                                  this.state.best.sum,
                                  this.state.worst.sum
                                )
                              }}
                              placeholder={`Sum ${
                                this.state.name.b === ''
                                  ? 'Player 2'
                                  : this.state.name.b
                              }`}
                              value={this.state.sum.b}
                              disabled
                            />
                          </td>
                          <td>
                            <Input
                              style={{
                                color: colorGenerator(
                                  isNaN(this.state.sum.c)
                                    ? 0
                                    : this.state.sum.c,
                                  this.state.best.sum,
                                  this.state.worst.sum
                                )
                              }}
                              placeholder={`Sum ${
                                this.state.name.c === ''
                                  ? 'Player 3'
                                  : this.state.name.c
                              }`}
                              value={this.state.sum.c}
                              disabled
                            />
                          </td>
                          <td>
                            <Input
                              style={{
                                color: colorGenerator(
                                  isNaN(this.state.sum.d)
                                    ? 0
                                    : this.state.sum.d,
                                  this.state.best.sum,
                                  this.state.worst.sum
                                )
                              }}
                              placeholder={`Sum ${
                                this.state.name.d === ''
                                  ? 'Player 4'
                                  : this.state.name.d
                              }`}
                              value={this.state.sum.d}
                              disabled
                            />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Col>
              </Row>
            </CardBody>
            <CardFooter>
              <div className='text-right mr-2'>
                <small>Developer: Randika Alditia</small>
              </div>
            </CardFooter>
          </Card>
        </Col>
        <Col
          style={{
            position: 'fixed',
            top: '15px',
            right: '20px'
          }}
          className='col-sm-5'
        >
          <Card>
            <CardBody>
              <Row className='mb-3'>
                <Col>
                  <strong>Plot</strong>
                </Col>
                <Col
                  className='text-right'
                  style={{ backgroundColor: 'white' }}
                >
                  <span>
                    <small className='mr-2' style={{ color: '#429ef4' }}>
                      {this.state.name.a === '' ? 'P1' : this.state.name.a}
                    </small>
                    <small className='mr-2' style={{ color: '#d64267' }}>
                      {this.state.name.b === '' ? 'P2' : this.state.name.b}
                    </small>
                    <small className='mr-2' style={{ color: '#f4d142' }}>
                      {this.state.name.c === '' ? 'P3' : this.state.name.c}
                    </small>
                    <small className='mr-2' style={{ color: '#4db710' }}>
                      {this.state.name.d === '' ? 'P4' : this.state.name.d}
                    </small>
                  </span>
                </Col>
              </Row>
              <Row>
                <Col
                  className='text-center'
                  style={{ padding: 'auto', margin: 'auto' }}
                >
                  <PlotChart
                    data={{
                      a: plotGenerator(this.state.table.map(e => e.a)),
                      b: plotGenerator(this.state.table.map(e => e.b)),
                      c: plotGenerator(this.state.table.map(e => e.c)),
                      d: plotGenerator(this.state.table.map(e => e.d))
                    }}
                  />
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>
    )
  }
}
const colorGenerator = (val, bestVal, worstVal) => {
  if (val === bestVal) return 'green'
  else if (val === worstVal) return 'red'
  else return 'white'
}
const plotGenerator = arr => {
  return arr.map((item, index) => {
    return [index, item]
  })
}
