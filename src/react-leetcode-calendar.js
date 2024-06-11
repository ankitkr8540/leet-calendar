import moment from 'moment'
import './style.css'
import axios from 'axios'
import React, { useState, useEffect } from 'react'

const DayNames = {
  1: 'Mon',
  3: 'Wed',
  5: 'Fri',
}

async function fetchUserInfo(username) {
  try {
    const { data } = await axios.get(
      `https://leet-brag-ai-backend-c7a640063d67.herokuapp.com/${username.username}/calendar`
    )
    console.log(data)
    return data
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message
    console.log(message)
    throw error
  }
}

function Cell({ color }) {
  let style = {
    backgroundColor: color,
  }

  return (
    <div className="timeline-cells-cell" style={style}>
      {' '}
    </div>
  )
}

function Month({ startDate, index }) {
  let date = moment(startDate).add(index * 7, 'day')
  let monthName = date.format('MMM')

  return <div className={`timeline-months-month ${monthName}`}>{monthName}</div>
}

function WeekDay({ index }) {
  return <div className="timeline-weekdays-weekday">{DayNames[index]}</div>
}

function Timeline({ range, data, colorFunc }) {
  let days = Math.abs(range[0].diff(range[1], 'days'))
  let cells = Array.from(new Array(days))
  let weekDays = Array.from(new Array(7))
  let months = Array.from(new Array(Math.floor(days / 7)))

  let min = Math.min(0, ...data.map((d) => d.value))
  let max = Math.max(...data.map((d) => d.value))

  let colorMultiplier = 1 / (max - min)

  let startDate = range[0]
  const DayFormat = 'DDMMYYYY'

  return (
    <div className="timeline">
      <div className="timeline-months">
        {months.map((_, index) => (
          <Month key={index} index={index} startDate={startDate} />
        ))}
      </div>

      <div className="timeline-body">
        <div className="timeline-weekdays">
          {weekDays.map((_, index) => (
            <WeekDay key={index} index={index} />
          ))}
        </div>

        <div className="timeline-cells">
          {cells.map((_, index) => {
            let date = moment(startDate).add(index, 'day')
            let dataPoint = data.find((d) => moment(date).format(DayFormat) === moment(d.date).format(DayFormat))

            if (dataPoint) {
              let alpha = colorMultiplier * dataPoint.value
              let color = colorFunc({ alpha })

              return <Cell key={index} color={color} />
            } else {
              return <Cell key={index} color="#FFFFFF" />
            }
          })}
        </div>
      </div>
    </div>
  )
}

function LeetCodeCalendar(username) {
  const [data, setData] = useState(null)

  useEffect(() => {
    async function fetchData() {
      try {
        const backendData = await fetchUserInfo(username)
        if (!backendData || !backendData.submissionCalendar) {
          console.error('Data is undefined, cannot parse')
          return
        }

        const submissionCalendar = JSON.parse(backendData.submissionCalendar)
        const parsedData = Object.keys(submissionCalendar).map((timestamp) => {
          return {
            date: moment.unix(timestamp),
            value: submissionCalendar[timestamp],
          }
        })

        setData(parsedData)
      } catch (error) {
        console.error('Error fetching data', error)
      }
    }

    fetchData()
  }, [username])

  if (!data) {
    return <div>Loading...</div>
  }

  const startDate = moment().add(-365, 'days')
  const dateRange = [startDate, moment()]

  return (
    <>
      <Timeline range={dateRange} data={data} colorFunc={({ alpha }) => `rgba(3, 160, 3, ${alpha})`} />
    </>
  )
}

export default LeetCodeCalendar
