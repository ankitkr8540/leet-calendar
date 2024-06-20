export const transformData = (data, transformFn) => {
  if (typeof transformFn !== 'function') {
    return data
  }

  const transformedData = transformFn(data)

  if (!Array.isArray(transformedData)) {
    throw Error(`Passed function transformData must return a list of Activity objects.`)
  }

  if (transformedData.length > 0) {
    const testObj = transformedData[0]

    if (typeof testObj.count !== 'number' || testObj.count < 0) {
      throw Error(`Required property "count: number" missing or invalid. Got: ${testObj.count}`)
    }

    if (!/\d{4}-\d{2}-\d{2}/.test(testObj.date)) {
      throw Error(`Required property "date: YYYY-MM-DD" missing or invalid. Got: ${testObj.date}`)
    }

    if (typeof testObj.level !== 'number' || testObj.level < 0 || testObj.level > 4 || isNaN(testObj.level)) {
      throw Error(`Required property "level: 0 | 1 | 2 | 3 | 4" missing or invalid. Got: ${testObj.level}.`)
    }
  }

  return transformedData
}

export const parseSubmissionCalendar = (submissionCalendarString) => {
  const submissionCalendar = JSON.parse(submissionCalendarString)

  const contributions = Object.entries(submissionCalendar).map(([timestamp, count]) => {
    const date = new Date(parseInt(timestamp, 10) * 1000).toISOString().split('T')[0]
    const level = Math.min(Math.floor(count / 2), 4)

    return {
      date,
      count: count,
      level,
    }
  })

  const totalContributions = contributions.reduce((acc, activity) => acc + activity.count, 0)

  return {
    total: {
      lastYear: totalContributions,
    },
    contributions,
  }
}

export const fillMissingDates = (data) => {
  const today = new Date()
  const pastYearDate = new Date()
  pastYearDate.setFullYear(today.getFullYear() - 1)
  pastYearDate.setDate(pastYearDate.getDate() + 1)

  const dateSet = new Set(data.contributions.map((item) => item.date))
  const filledContributions = []

  for (let d = pastYearDate; d <= today; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0]
    if (!dateSet.has(dateStr)) {
      filledContributions.push({ date: dateStr, count: 0, level: 0 })
    }
  }

  filledContributions.push(...data.contributions)

  return {
    total: data.total,
    contributions: filledContributions.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()),
  }
}
