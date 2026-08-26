export function normalizeDate(value) {
  const match = typeof value === 'string' && value.match(/^\d{4}-\d{2}-\d{2}/)
  return match ? match[0] : ''
}

export function normalizeRange(start, end) {
  const first = normalizeDate(start)
  const last = normalizeDate(end) || first
  return first <= last ? [first, last] : [last, first]
}

export function getRangeCellState(date, start, end) {
  const isStart = Boolean(date && date === start)
  const isEnd = Boolean(end && date === end)
  return {
    start: isStart,
    end: isEnd,
    fill: Boolean(end && date >= start && date <= end),
    label: isStart ? '开始' : isEnd ? '结束' : ''
  }
}

export function normalizeTime(value) {
  const text = Array.isArray(value) ? value.map((item) => String(item).padStart(2, '0')).join(':') : value
  const match = typeof text === 'string' && text.match(/(?:^|[ T])(\d{1,2}):(\d{1,2})(?::(\d{1,2}))?$/)
  if (!match) return '00:00:00'
  const values = match.slice(1).map((item) => Number(item || 0))
  if (values[0] > 23 || values[1] > 59 || values[2] > 59) return '00:00:00'
  return values.map((item) => String(item).padStart(2, '0')).join(':')
}

export function formatDateTime(date, time) {
  const normalizedDate = normalizeDate(date)
  return normalizedDate ? `${normalizedDate} ${normalizeTime(time)}` : ''
}

export function clampTime(date, time, start, end) {
  const selected = formatDateTime(date, time)
  const boundary = (value, fallback) => {
    const boundaryDate = normalizeDate(value)
    if (!boundaryDate) return ''
    const hasTime = typeof value === 'string' && /[ T]\d{1,2}:\d{1,2}/.test(value)
    return `${boundaryDate} ${hasTime ? normalizeTime(value) : fallback}`
  }
  const min = boundary(start, '00:00:00')
  const max = boundary(end, '23:59:59')
  const result = min && selected < min ? min : max && selected > max ? max : selected
  return normalizeTime(result).split(':').map(Number)
}

export function getTimePickerOptions(date, time, start, end) {
  const hasTime = (value) => typeof value === 'string' && /[ T]\d{1,2}:\d{1,2}/.test(value)
  const parts = (value) => normalizeTime(value).split(':').map(Number)
  const values = (first, last) => Array.from({ length: last - first + 1 }, (_, index) => String(first + index).padStart(2, '0'))
  const min = date === normalizeDate(start) && hasTime(start) ? parts(start) : [0, 0, 0]
  const max = date === normalizeDate(end) && hasTime(end) ? parts(end) : [23, 59, 59]
  const selected = clampTime(date, time, start, end)
  const hour = Math.min(max[0], Math.max(min[0], selected[0]))
  const minuteMin = hour === min[0] ? min[1] : 0
  const minuteMax = hour === max[0] ? max[1] : 59
  const minute = Math.min(minuteMax, Math.max(minuteMin, selected[1]))
  const secondMin = hour === min[0] && minute === min[1] ? min[2] : 0
  const secondMax = hour === max[0] && minute === max[1] ? max[2] : 59
  const second = Math.min(secondMax, Math.max(secondMin, selected[2]))
  return {
    hours: values(min[0], max[0]),
    minutes: values(minuteMin, minuteMax),
    seconds: values(secondMin, secondMax),
    value: [hour - min[0], minute - minuteMin, second - secondMin]
  }
}
