import { CheckOutlined, DeleteOutlined, EditOutlined, LinkOutlined, SaveOutlined } from '@mui/icons-material'
import { Alert, Box, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Fab, IconButton, MenuItem, Select, Snackbar, useTheme } from '@mui/material'
import { useMutation, useQuery } from '@tanstack/react-query'
import React, { useState } from 'react'
import { request } from '../api/request'
import { tokens } from '../assets/theme'
import CubeLoader from './CubeLoader/CubeLoader'
import { Link, useNavigate } from 'react-router-dom'

const StatusCard2 = ({data , ageSections , setOpen , setMessage , setMessageType , refetch}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [isEditMode , setIsEditMode] = useState(false)
    const [value , setValue] = useState({
        name : data.name,
        ageSection_id : data.ageSection_id
    })
    const [deleteDialogOpen , setDeleteDialogOpen] = useState(false)


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const deleteEventHandling = () => {
        console.log('Event Card Page : request for delete this event')
    }

    const deleteEventDialogOpen = () => {
        setDeleteDialogOpen(true)
    }

    const deleteEventDialogClose = () => {
        setDeleteDialogOpen(false)
        console.log('Event Card Page : delete event rejected by click on cancle button')
    }

    

    const UpdateStatusInServer = (values) => {
        return request({
            url : `/status/${data.id}`,
            method : 'PATCH',
            data : values
        })
    }

    const deleteFromServer = () => {
        return request({
            url : `/status/${data.id}`,
            method : 'DELETE',
        })
    }

    const deleteFromServerMutation = useMutation({
        mutationKey : [`delete-status-from-server`],
        mutationFn : deleteFromServer,
        onSuccess : () => {
            refetch()
            setMessage('one status deleted succesffully')
            setMessageType('warning')
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

    const deleteDialogConfirm = () => {
        deleteFromServerMutation.mutate()
        setDeleteDialogOpen(false)
    }

    const {mutate , isLoading , isSuccess} = useMutation({
        mutationKey : ['update-status-in-server'],
        mutationFn : UpdateStatusInServer,
        onSuccess : (data) => {
            refetch()
            setMessage('one status updated succesffully')
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

    const saveHandler = () => {
        mutate({name : value.name , ageSection_id : value.ageSection_id})
        setIsEditMode(false)
    }


    if(deleteFromServerMutation.isLoading){
        return <CubeLoader />
    }

  return (
      <>
      <Box
      sx={{
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'space-evenly',
            boxShadow : '1px 1px 10px -4px green',
            padding : '20px',
            gap : '5px',
            borderRadius : '50px 0px 50px 0',
            transition : '0.3s',
        }}
    >
        <Box
            sx={{
                display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            flexDirection : 'column',
            gap : '8px'
            }}
        >
            <input 
                value={value.name}
                disabled={!isEditMode}
                style={{
                    backgroundColor : 'transparent',
                    color : colors.grey[100],
                    outline : 'none',
                    border : isEditMode ? `1px solid ${colors.grey[200]}` : `none`,
                    borderRadius : '6px',
                    textAlign : 'center',
                    padding : '8px 10px',
                    width : '100%'
                }}
                onChange={(e) => setValue({...value , name :e.target.value})}
            />

            <Select
                value={value.ageSection_id}
                onChange={(e) => setValue({...value , ageSection_id :e.target.value})}
                autoWidth
                label="Age Section"
                name={'ageSection_id'}
                disabled={!isEditMode}
            >
                {
                    ageSections.map(ageSection => (
                        <MenuItem key={ageSection.id} value={ageSection.id}>From {ageSection.from} To {ageSection.to} Year</MenuItem>
                    ))
                }
            </Select>
        </Box>

        <Box
            sx={{
                flexBasis : '60px',
                display : 'flex',
                flexDirection : 'column',
                position : 'relative',
                gap : '5px'
            }}
        >
            <Fab
                sx={{
                    backgroundColor : 'transparent',
                    borderTopLeftRadius : '0',
                    borderBottomLeftRadius : '0',
                    "&:hover" : {
                        backgroundColor : 'transparent',
                    }
                }}
                disabled={isLoading || isEditMode}
                component={Link}
                to={`/status/${data?.id}`}
            >
                <LinkOutlined color='info' />
            </Fab>
            {
                isEditMode
                ? (
                    <Fab
                        sx={{
                            backgroundColor : 'transparent',
                            "&:hover" : {
                                backgroundColor : 'transparent',
                            }
                        }}
                        onClick={saveHandler}
                    >
                        <SaveOutlined color='success'/>
                    </Fab>
                )
                : undefined
            }
            {
                !isEditMode
                ? (
                    <Fab
                        sx={{
                            backgroundColor : 'transparent',
                            "&:hover" : {
                                backgroundColor : 'transparent',
                            }
                        }}
                        onClick={() => setIsEditMode(true)}
                    >
                        <EditOutlined color='warning'/>
                    </Fab>
                )
                : undefined
            }
            {
                isLoading
                ? (
                    <CircularProgress
                        size={58}
                        sx={{
                            color : 'green',
                            position : 'absolute',
                            top : '60px',
                            left : '-1px',
                            zIndex : '1'
                        }}
                    />
                )
                : undefined
            }
            <Fab
                sx={{
                    backgroundColor : 'transparent',
                    borderTopLeftRadius : '0',
                    borderBottomLeftRadius : '0',
                    "&:hover" : {
                        backgroundColor : 'transparent',
                    }
                }}
                disabled={isLoading || isEditMode}
                onClick={deleteEventDialogOpen}
            >
                <DeleteOutlined color='error'/>
            </Fab>
        </Box>
    </Box>
    <Dialog
            open={deleteDialogOpen}
            maxWidth={'xs'}
        >
        <DialogTitle
            sx={{
                color : colors.yellowAccent[500] ,
                textAlign : 'center',
                textTransform : 'capitalize'
            }}
        >
            delete status alter
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
                textAlign : 'center',
                marginBottom : '10px'
            }}
          >
            are you sure you want to delete this status , all sub status realted to it wil be deleted , this action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={deleteDialogConfirm} color="success">
                confirm
            </Button>
            <Button onClick={deleteEventDialogClose} color="error">
                Cancel
            </Button>
        </DialogActions>
        </Dialog>
    </>
  )
}

export default StatusCard2