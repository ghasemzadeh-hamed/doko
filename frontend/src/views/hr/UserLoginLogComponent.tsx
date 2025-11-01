import React, { useState, useEffect } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import axios from 'axios'
import TableCollapsible from 'src/views/tables/TableCollapsible'


interface UserLoginLog {
  id: number
  user: string
  login_time: string
  logout_time: string
}

const UserLoginLogComponent: React.FC = () => {
  const [logs, setLogs] = useState<UserLoginLog[]>([])

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/UserLoginLog/')
      .then(response => {
        setLogs(response.data)
      })
      .catch(error => {
        console.error('There was an error retrieving the user login logs!', error)
      })
  }, [])

  return (
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell>User ID</TableCell>
            <TableCell align="right">Login Time</TableCell>
            <TableCell align="right">Logout Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {logs.map((log) => (
            <TableRow key={log.id}>
              <TableCell component="th" scope="row">
                {log.user}
              </TableCell>
              <TableCell align="right">{log.login_time}</TableCell>
              <TableCell align="right">{log.logout_time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default UserLoginLogComponent
