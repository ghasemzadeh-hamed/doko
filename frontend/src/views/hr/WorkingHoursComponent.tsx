import React, { useCallback, useEffect, useMemo, useState } from 'react'
import axios from 'axios'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableFooter,
  TableHead,
  TableRow,
  TextField,
  Typography
} from '@mui/material'
import moment from 'moment'

type DateFilterKey = 'startDate' | 'endDate'
import React, { useState, useEffect } from 'react';
import apiClient from 'src/services/apiClient';

import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import moment from 'moment';

interface WorkingHoursData {
  id: number
  user: number
  user_full_name?: string | null
  user_email?: string | null
  login_time: string
  logout_time: string | null
  duration?: string | null
  duration_hours?: number | null
  overtime_hours?: number | null
  work_date?: string | null
  work_day?: string | null
  hourly_rate?: string | number | null
  fixed_salary?: string | number | null
  overtime_rate?: string | number | null
  regular_hours?: number | null
  regular_cost?: number | null
  overtime_cost?: number | null
  total_compensation?: number | null
}

interface WorkingHoursSummaryRow {
  user: number
  user_name: string
  user_email: string | null
  workdays: number
  total_hours: number
  expected_hours: number
  overtime_hours: number
  regular_hours: number
  fixed_salary: number
  regular_cost: number
  overtime_cost: number
  total_compensation: number
}

interface WorkingHoursSummaryResponse {
  results: WorkingHoursSummaryRow[]
  totals: {
    total_hours: number
    expected_hours: number
    overtime_hours: number
    regular_hours: number
    fixed_salary: number
    regular_cost: number
    overtime_cost: number
    total_compensation: number
    workdays: number
    unique_users: number
  }
  meta: {
    start_date: string | null
    end_date: string | null
    standard_daily_hours: number
  }
}

interface ApiErrorResponse {
  detail?: string
}

const initialFilters = { startDate: '', endDate: '' }

const WorkingHoursComponent: React.FC = () => {
  const [workingHours, setWorkingHours] = useState<WorkingHoursData[]>([])
  const [filters, setFilters] = useState(initialFilters)
  const [activeFilters, setActiveFilters] = useState(initialFilters)
  const [summary, setSummary] = useState<WorkingHoursSummaryResponse | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    apiClient.get('/WorkingHours/')
      .then(response => {
        setWorkingHours(response.data);
      })
      .catch(error => {
        console.error('There was an error retrieving the working hours!', error);
      });
  }, []);

    if (Number.isNaN(numericValue)) {
      return '-'
    }

    return numericValue.toFixed(2)
  }

  const getDuration = (data: WorkingHoursData) => {
    if (data.duration_hours !== undefined && data.duration_hours !== null) {
      return formatHours(data.duration_hours)
    }

    if (data.login_time && data.logout_time) {
      const loginMoment = moment(data.login_time)
      const logoutMoment = moment(data.logout_time)
      const hours = logoutMoment.diff(loginMoment, 'hours', true)
      return formatHours(hours)
    }

    return '-'
  }

  const getOvertime = (data: WorkingHoursData) => {
    if (data.overtime_hours !== undefined && data.overtime_hours !== null) {
      return formatHours(data.overtime_hours)
    }

    return '-'
  }

  const fetchData = useCallback(async () => {
    setIsLoading(true)
    const params: Record<string, string> = {}

    if (activeFilters.startDate) {
      params.start_date = activeFilters.startDate
    }

    if (activeFilters.endDate) {
      params.end_date = activeFilters.endDate
    }

    try {
      const [hoursResponse, summaryResponse] = await Promise.all([
        axios.get(`${apiBaseUrl}/WorkingHours/`, { params }),
        axios.get(`${apiBaseUrl}/WorkingHours/summary/`, { params })
      ])

      const hoursData = Array.isArray(hoursResponse.data) ? hoursResponse.data : hoursResponse.data?.results ?? []
      setWorkingHours(hoursData)

      setSummary(summaryResponse.data)
      setError(null)
    } catch (requestError: unknown) {
      if (axios.isAxiosError<ApiErrorResponse>(requestError)) {
        const apiError = requestError.response?.data?.detail
        setError(apiError ?? 'خطایی در دریافت اطلاعات ساعات کاری رخ داد.')
      } else {
        setError('خطایی در دریافت اطلاعات ساعات کاری رخ داد.')
      }
    } finally {
      setIsLoading(false)
    }
  }, [activeFilters, apiBaseUrl])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  const activeRangeLabel = useMemo(() => {
    if (!summary) {
      return 'همه سوابق'
    }

    const { start_date: startDate, end_date: endDate } = summary.meta

    if (startDate && endDate) {
      return `${formatDate(startDate)} تا ${formatDate(endDate)}`
    }

    if (startDate) {
      return `از ${formatDate(startDate)}`
    }

    if (endDate) {
      return `تا ${formatDate(endDate)}`
    }

    return 'همه سوابق'
  }, [summary])

  return (
    <Box display='flex' flexDirection='column' gap={6}>
      <Paper elevation={1} sx={{ p: 4 }}>
        <Typography variant='h6' gutterBottom>
          فیلترهای ساعات کاری
        </Typography>
        <Grid container spacing={3} alignItems='flex-end'>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label='تاریخ شروع'
              type='date'
              value={filters.startDate}
              onChange={handleFilterChange('startDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              label='تاریخ پایان'
              type='date'
              value={filters.endDate}
              onChange={handleFilterChange('endDate')}
              InputLabelProps={{ shrink: true }}
            />
          </Grid>
          <Grid item xs={12} md={6} display='flex' gap={2} justifyContent='flex-start'>
            <Button variant='contained' color='primary' onClick={handleApplyFilters}>
              اعمال فیلتر
            </Button>
            <Button variant='outlined' color='secondary' onClick={handleResetFilters}>
              بازنشانی
            </Button>
          </Grid>
        </Grid>
        {error && (
          <Box mt={3}>
            <Alert severity='error'>{error}</Alert>
          </Box>
        )}
      </Paper>

      <Paper elevation={1} sx={{ p: 4 }}>
        <Box display='flex' justifyContent='space-between' flexWrap='wrap' gap={2} mb={3}>
          <Box>
            <Typography variant='h6'>خلاصه عملکرد</Typography>
            <Typography variant='body2' color='text.secondary'>
              بازه نمایش داده شده: {activeRangeLabel}
            </Typography>
          </Box>
          {summary && (
            <Typography variant='body2' color='text.secondary' alignSelf='center'>
              ساعت کاری استاندارد روزانه: {summary.meta.standard_daily_hours.toFixed(2)}
            </Typography>
          )}
        </Box>

        {isLoading && (
          <Box display='flex' justifyContent='center' my={4}>
            <CircularProgress />
          </Box>
        )}

        {summary && summary.results.length > 0 ? (
          <TableContainer component={Paper} variant='outlined'>
            <Table size='small'>
              <TableHead>
                <TableRow>
                  <TableCell>کارمند</TableCell>
                  <TableCell>ایمیل</TableCell>
                  <TableCell align='right'>روزهای کاری</TableCell>
                  <TableCell align='right'>ساعت مورد انتظار</TableCell>
                  <TableCell align='right'>مجموع ساعات</TableCell>
                  <TableCell align='right'>ساعت عادی</TableCell>
                  <TableCell align='right'>اضافه‌کاری (ساعت)</TableCell>
                  <TableCell align='right'>حقوق ثابت</TableCell>
                  <TableCell align='right'>هزینه ساعات عادی</TableCell>
                  <TableCell align='right'>هزینه اضافه‌کار</TableCell>
                  <TableCell align='right'>جمع پرداخت</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {summary.results.map(row => (
                  <TableRow key={row.user}>
                    <TableCell>{row.user_name}</TableCell>
                    <TableCell>{row.user_email ?? '-'}</TableCell>
                    <TableCell align='right'>{row.workdays}</TableCell>
                    <TableCell align='right'>{formatHours(row.expected_hours)}</TableCell>
                    <TableCell align='right'>{formatHours(row.total_hours)}</TableCell>
                    <TableCell align='right'>{formatHours(row.regular_hours)}</TableCell>
                    <TableCell align='right'>{formatHours(row.overtime_hours)}</TableCell>
                    <TableCell align='right'>{formatCurrency(row.fixed_salary)}</TableCell>
                    <TableCell align='right'>{formatCurrency(row.regular_cost)}</TableCell>
                    <TableCell align='right'>{formatCurrency(row.overtime_cost)}</TableCell>
                    <TableCell align='right'>{formatCurrency(row.total_compensation)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <TableFooter>
                <TableRow>
                  <TableCell component='th' scope='row'>جمع کل ({summary.totals.unique_users} نفر)</TableCell>
                  <TableCell />
                  <TableCell align='right'>{summary.totals.workdays}</TableCell>
                  <TableCell align='right'>{formatHours(summary.totals.expected_hours)}</TableCell>
                  <TableCell align='right'>{formatHours(summary.totals.total_hours)}</TableCell>
                  <TableCell align='right'>{formatHours(summary.totals.regular_hours)}</TableCell>
                  <TableCell align='right'>{formatHours(summary.totals.overtime_hours)}</TableCell>
                  <TableCell align='right'>{formatCurrency(summary.totals.fixed_salary)}</TableCell>
                  <TableCell align='right'>{formatCurrency(summary.totals.regular_cost)}</TableCell>
                  <TableCell align='right'>{formatCurrency(summary.totals.overtime_cost)}</TableCell>
                  <TableCell align='right'>{formatCurrency(summary.totals.total_compensation)}</TableCell>
                </TableRow>
              </TableFooter>
            </Table>
          </TableContainer>
        ) : (
          !isLoading && (
            <Typography variant='body2' color='text.secondary'>
              داده‌ای برای نمایش خلاصه یافت نشد.
            </Typography>
          )
        )}
      </Paper>

      <TableContainer component={Paper} elevation={1}>
        <Table aria-label='working hours table'>
          <TableHead>
            <TableRow>
              <TableCell>شناسه رکورد</TableCell>
              <TableCell>نام کاربر</TableCell>
              <TableCell>ایمیل</TableCell>
              <TableCell align='right'>شناسه کاربر</TableCell>
              <TableCell align='right'>تاریخ کاری</TableCell>
              <TableCell align='right'>زمان ورود</TableCell>
              <TableCell align='right'>زمان خروج</TableCell>
              <TableCell align='right'>مدت (ساعت)</TableCell>
              <TableCell align='right'>ساعت عادی</TableCell>
              <TableCell align='right'>اضافه‌کاری (ساعت)</TableCell>
              <TableCell align='right'>نرخ ساعتی</TableCell>
              <TableCell align='right'>حقوق ثابت</TableCell>
              <TableCell align='right'>هزینه ساعات عادی</TableCell>
              <TableCell align='right'>نرخ اضافه‌کار</TableCell>
              <TableCell align='right'>هزینه اضافه‌کار</TableCell>
              <TableCell align='right'>جمع پرداخت</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isLoading && (
              <TableRow>
                <TableCell colSpan={16} align='center'>
                  <CircularProgress size={24} />
                </TableCell>
              </TableRow>
            )}
            {!isLoading && workingHours.length === 0 && (
              <TableRow>
                <TableCell colSpan={16} align='center'>
                  سابقه‌ای برای بازه انتخاب‌شده یافت نشد.
                </TableCell>
              </TableRow>
            )}
            {!isLoading &&
              workingHours.map(hours => (
                <TableRow key={hours.id}>
                  <TableCell component='th' scope='row'>
                    {hours.id}
                  </TableCell>
                  <TableCell>{hours.user_full_name ?? '-'}</TableCell>
                  <TableCell>{hours.user_email ?? '-'}</TableCell>
                  <TableCell align='right'>{hours.user}</TableCell>
                  <TableCell align='right'>{formatDate(hours.work_date ?? hours.work_day)}</TableCell>
                  <TableCell align='right'>{formatDateTime(hours.login_time)}</TableCell>
                  <TableCell align='right'>{formatDateTime(hours.logout_time)}</TableCell>
                  <TableCell align='right'>{getDuration(hours)}</TableCell>
                  <TableCell align='right'>{formatHours(hours.regular_hours ?? null)}</TableCell>
                  <TableCell align='right'>{getOvertime(hours)}</TableCell>
                  <TableCell align='right'>{formatCurrency(hours.hourly_rate)}</TableCell>
                  <TableCell align='right'>{formatCurrency(hours.fixed_salary)}</TableCell>
                  <TableCell align='right'>{formatCurrency(hours.regular_cost)}</TableCell>
                  <TableCell align='right'>{formatCurrency(hours.overtime_rate)}</TableCell>
                  <TableCell align='right'>{formatCurrency(hours.overtime_cost)}</TableCell>
                  <TableCell align='right'>{formatCurrency(hours.total_compensation)}</TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  )
}

export default WorkingHoursComponent
