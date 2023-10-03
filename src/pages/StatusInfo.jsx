import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Snackbar, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router'
import AddButton from '../components/AddButton'
import GridBox from '../components/GridBox'
import GridItem from '../components/GridItem'
import StatusCard from '../components/StatusCard'
import { tokens } from '../assets/theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { request } from '../api/request'
import { useMutation, useQuery } from '@tanstack/react-query'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'
import { CloudUpload } from '@mui/icons-material'
import { VisuallyHiddenInput } from '../components/VisuallyHiddenInput'

const addNewSubStatusInServer = (values) => {
    return request({
        url : '/substatus',
        method : 'post',
        headers : {
            "Content-Type" : 'multipart/form-data',
        },
        data : values
    })
}


const StatusInfo = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [deleteFAQDialogOpen , setDeleteFAQDialogOpen] = useState(false)
    const {statusID} = useParams()
    const [open , setOpen] = useState(false)
    const [message , setMessage] = useState("")
    const [messageType , setMessageType] = useState("success")
    const [imagePreview, setImagePreview] = useState(null);
    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        
        setImagePreview(URL.createObjectURL(file))
      }

    const handleClickOpen = () => {
      setOpen(true);
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const handleFormSubmit = (values) => {
        let data = {
            image : values.imageFile,
            name : values.name,
            status_id : statusID
        }
        addNewSubStatusMutation.mutate(data)
    }

    const addNewSubStatusMutation = useMutation({
        mutationKey : ['add-new-subb-status-mutation'],
        mutationFn : addNewSubStatusInServer,
        onSuccess : () => {
            c.refetch()
            setMessage('added successfully for system')
            setMessageType('success')
            setOpen(true)
            setDeleteFAQDialogOpen(false)
        },
        onError : (error) => {
            if (error.response){
              switch(error.response.status){
                case 401 : {
                    setMessage('you are not authorize to get in our system')
                  setMessageType('error')
                  setOpen(true)
                  break
                }
                case 422 : {
                    setMessage('wrong entered data')
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
    const onDeleteFAQDialogOpen = () => {
        setDeleteFAQDialogOpen(true)
      }
      const onDeleteFAQDialogClose = () => {
        setDeleteFAQDialogOpen(false)
      }
      const onDeleteFAQDialogConfirm = () => {
        onDeleteFAQDialogClose()
      }
      const getStatusFromServer = () => {
        return request({
            url : `/status/${statusID}`,
        })
    }

    const c = useQuery({
        queryKey : [`get-substatus-${statusID}-from-se`],
        queryFn : getStatusFromServer
    })
    if(c.isLoading || addNewSubStatusMutation.isLoading){
        return <CubeLoader />
    }

    if(c.isError){
        return <GetErrorHandler error={c.error} refetch={c.refetch} />
      }


    const substatus = c.data.data.status.substatus

        return (
            <>
            <Box>
                <AddButton color={colors.indigoAccent[500]} reactionFunction={onDeleteFAQDialogOpen} />
                {
                    substatus.length === 0 && (
                        <Typography
                        sx={{
                            color : colors.pinkAccent[500],
                            textAlign : 'center'
                        }}
                        variant='h2'
                        >
                        No Sub Status until now
                        </Typography>
                    )
                }
                <GridBox
                    spacing={1}
                >
                    {
                        substatus.map((subStatus , i) => (
                            <GridItem xs={12} sm={6} md={4} lg={3} key={i}>
                                <StatusCard setMessageType={setMessageType} setOpen={setOpen} setMessage={setMessage} refetch={c.refetch} subStatus={subStatus} />
                            </GridItem>
                        ))
                    }
                </GridBox>
            </Box>
            <Dialog
                    open={deleteFAQDialogOpen}
                    maxWidth={'xs'}
                >
                <DialogTitle
                        sx={{
                            color : colors.yellowAccent[500] ,
                            textAlign : 'center',
                            textTransform : 'capitalize'
                        }}
                    >create new Sub Status</DialogTitle>
                <DialogContent>
                    <DialogContentText
                    sx={{
                        textAlign : 'center',
                        marginBottom : '10px'
                    }}
                    >
                     after you click on create button , new sub status will add for all users , take care this action cant be undo
                    </DialogContentText>
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                    >
                        {
                            (
                            {
                                values,
                                errors,
                                touched,
                                handleBlur,
                                handleChange,
                                handleSubmit,
                                setFieldValue
                            }
                            ) => (
                            <form onSubmit={handleSubmit}>
                                <Box
                                    display="grid"
                                    gap="30px"
                                    gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                    sx={{
                                        "& > div": { gridColumn:"span 4" },
                                    }}
                                >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.name}
                                    name="name"
                                    error={!!touched.name && !!errors.name}
                                    helperText={touched.name && errors.name}
                                    sx={{ gridColumn: "span 4" }}
                                />
                                <Box
                  sx={{ gridColumn: "span 4" }}
                        >
                            <Button
                                    component="label"
                                    variant="contained"
                                    startIcon={<CloudUpload />}
                                    href="#file-upload"
                                    fullWidth
                                    color='secondary'
                                    sx={{
                                        marginBottom : '10px'
                                    }}
                                >
                                    Upload a file
                                    <VisuallyHiddenInput onChange={(e) => {
                                        setFieldValue('imageFile' , e.currentTarget.files[0])
                                        handleChange(e)
                                        handleSelectImage(e)
                                    }} onBlur={handleBlur} multiple type="file" name="image" value={values.image} />
                                    
                                </Button>
                                {touched.image && errors.image && (
                                    <FormHelperText error>
                                    {errors.image}
                                    </FormHelperText>
                                )}
                                {
                                    imagePreview && (
                                        <Box
                                            sx={{
                                                gridColumn: "span 4",
                                                textAlign : 'center',
                                                maxHeight : '200px',
                                                overflowY: 'auto'
                                            }}
                                        >
                                        <img 
                                            src={imagePreview}
                                            style={{
                                                maxWidth : '200px',
                                                borderRadius :'10px',
                                                border : '1px dotted #888'
                                            }}
                                        />
                                        </Box>
                                    )
                                }
                        
                                </Box>
                                </Box>
                                <Box display="flex" justifyContent="end" mt="20px">
                                <Button type="submit" color="success" variant="contained">
                                    add
                                </Button>
                                </Box>
                            </form>
                            )
                        }
                    </Formik>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onDeleteFAQDialogClose} color="error">
                        Cancel
                    </Button>
                </DialogActions>
                </Dialog>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        </>
        )
}

const validationSchema = Yup.object({
    name :  Yup.string().required('name field is required'),
    image :  Yup.string().required('image field is required'),
  })
  
  const initialValues = {
    name : '',
    image : '',
    imageFile : ''
  }

    export default StatusInfo