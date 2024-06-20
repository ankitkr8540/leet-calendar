// index.js

import React, { useCallback, useEffect, useState } from 'react'
import Calendar, { Skeleton } from 'react-activity-calendar'
import { API_URL, DEFAULT_THEME } from './constant'
import { parseSubmissionCalendar, fillMissingDates, transformData } from './utils'

async function fetchCalendarData(username) {
  const response = await fetch(`${API_URL}${username}/calendar`)
  const data = await response.json()
  if (!response.ok) {
    throw new Error(`Fetching GitHub contribution data for "${username}" failed: ${data.error}`)
  }

  if ('submissionCalendar' in data) {
    const parsedData = parseSubmissionCalendar(data.submissionCalendar)
    return parsedData
  } else {
    throw new Error(`The response data does not contain 'submissionCalendar' field`)
  }
}

function LeetCodeCalendar({
  username,
  year = 'last',
  labels,
  transformData: transformFn,
  transformTotalCount = true,
  throwOnError = false,
  errorMessage = `Error – Fetching GitHub contribution data for "${username}" failed.`,
  ...props
}) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchData = useCallback(() => {
    setLoading(true)
    setError(null)
    fetchCalendarData(username)
      .then((data) => setData(fillMissingDates(data)))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [username])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (error) {
    if (throwOnError) {
      throw error
    } else {
      return <div>{errorMessage}</div>
    }
  }

  if (loading || !data) {
    return <Skeleton {...props} loading />
  }

  const theme = props.theme ?? DEFAULT_THEME

  const defaultLabels = {
    totalCount: `{{count}} contributions in ${year === 'last' ? 'the last year' : '{{year}}'}`,
  }

  const totalCount = year === 'last' ? data.total['lastYear'] : data.total[year]

  return (
    <Calendar
      data={transformData(data.contributions, transformFn)}
      theme={theme}
      labels={Object.assign({}, defaultLabels, labels)}
      totalCount={transformFn && transformTotalCount ? undefined : totalCount}
      {...props}
      loading={Boolean(props.loading) || loading}
      maxLevel={4}
    />
  )
}

export default LeetCodeCalendar
