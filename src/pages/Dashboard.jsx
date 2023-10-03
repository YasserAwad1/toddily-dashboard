import { Alert, Box, Button, List, ListItem, ListItemIcon, ListItemText, Snackbar, Typography } from '@mui/material'
import React, { useState } from 'react'
import StatsticsCards from '../layouts/StatsticsCards'
import ReadableCards from '../layouts/ReadableCards'
import { useQuery } from '@tanstack/react-query'
import { request } from '../api/request'
import { useNavigate } from 'react-router'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import NetworkError from './Errors/NetworkError'
import { InfoOutlined } from '@mui/icons-material'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'

const getStatsticsFromServer = () => {
  return request({
    url : '/statistics',
    method : 'get'
  })
}

const Dashboard = () => {
  const [openSnackbar , setOpenSnackbar] = useState(false)
    const [message , setMessage] = useState("")
    const [messageType , setMessageType] = useState("")

    const handelAlterClose = () => {
      setOpenSnackbar(false)
    }
  const {data , isLoading , isError , error , refetch} = useQuery({
    queryKey : ['get-statstics-from*server'],
    queryFn : getStatsticsFromServer
  })

  if(isLoading){
    return <CubeLoader />
  }

  if(isError){
    return <GetErrorHandler error={error} refetch={refetch} />
  }
  return (
    <>
      <Box
        sx={{
          padding : '20px 0'
        }}
      >
        <StatsticsCards statstics={data?.data} />
        <ReadableCards setMessage={setMessage} setMessageType={setMessageType} setaAlterOpen={setOpenSnackbar} />
      </Box>
      <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handelAlterClose}>
        <Alert onClose={handelAlterClose} severity={messageType} sx={{ width: '100%' }}>
            {message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default Dashboard