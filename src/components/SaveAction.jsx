import { Check, Save } from '@mui/icons-material'
import { Box, CircularProgress, Fab, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../assets/theme'
import { useState } from 'react'
import { useEffect } from 'react'
import { request } from '../api/request'
import { useMutation } from '@tanstack/react-query'


const SaveAction = ({ params , rowId , setRowId , name , valuesShouldUpdate , updateAPI , setMessage , setMessageType , refetch , setOpen}) => {
    const [loading , setLoading] = useState(false)
    const [success , setSuccess] = useState(false)
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const updateInformationInServer = (values) => {
        return request({
            url : `${updateAPI}/${params.id}`,
            method : name !== 'childrens' ? 'PATCH' : 'Post' ,
            data : values
        })
    }

    const updateInformationMutation = useMutation({
        mutationKey : [`update-${name.slice(-1,1)}-in-server`],
        mutationFn : updateInformationInServer,
        onSuccess : () => {
            setSuccess(true)
            setRowId(null)
            setLoading(false)
            refetch()
            setMessage('one row updated successfully')
            setMessageType('info')
            setOpen(true)
        },
        onError : (error) => {
            if (error.response){
              switch(error.response.status){
                case 401 : {
                    setMessage('you are not authorize to make this request')
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                case 422 : {
                    setMessage('problems with data you are entered')
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                case 500 : {
                    setMessage('we have a problem in our server , come later')
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                case 404 : {
                    setMessage("we out of space , we can't find your destenation")
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                default : {
                    setMessage("unkown error accoure : request falid with status code" + error.response.status)
                  setMessageType('error')
                  setOpen(true)
                  break
                }
              }
            }else if(error.request){
                setMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
              setMessageType('error')
              setOpen(true)
            }else {
                setMessage('unknow error : ' + error.message)
              setMessageType('error')
              setOpen(true)
            }
          }
    })

    const saveUpdateHandler = () => {
        setLoading(true)
        // // update old row in database with new rowdata
        let dataForUpdate = {} ;
        valuesShouldUpdate.map(attribute => {
            dataForUpdate[attribute] = params.row[attribute]
        })
        console.log(dataForUpdate)
        updateInformationMutation.mutate(dataForUpdate)
    }
    useEffect(() => {
        if(rowId === params.id && success) setSuccess(false)
    } , [rowId])
  return (
    <Box
                        sx={{
                            position : 'relative',
                            m : 1
                        }}
                    >
                        {
                            success ? (
                                <Fab
                                    color='primary'
                                    sx={{
                                        width : '40px',
                                        height : '40px',
                                        backgroundColor : colors.greenBlueAccent[500],
                                        transition : '0.3s',
                                        "&:hover" : {
                                            backgroundColor : colors.greenBlueAccent[600],
                                        }
                                    }}
                                >
                                    <Check />
                                </Fab>
                            )
                            : (
                                <Fab
                                    color='primary'
                                    sx={{
                                        width : '40px',
                                        height : '40px',
                                    }}
                                    disabled={params.id !== rowId || loading}
                                    onClick={saveUpdateHandler}
                                >
                                    <Save />
                                </Fab>
                            )
                        }
                        {
                            loading && (
                                <CircularProgress 
                                    size={52}
                                    sx={{
                                        color : colors.greenBlueAccent[500],
                                        position : 'absolute',
                                        top : '-6px',
                                        left : '-6px',
                                        zIndex : '1'
                                    }}
                                />
                            )
                        }
                    </Box>
  )
}

export default SaveAction