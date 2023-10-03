import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, Snackbar, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import EventCard from '../layouts/EventCard'
import GridBox from '../components/GridBox'
import GridItem from '../components/GridItem'
import { tokens } from '../assets/theme'
import AddButton from '../components/AddButton'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { request } from '../api/request'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'
import { VisuallyHiddenInput } from '../components/VisuallyHiddenInput'
import { CloudUpload } from '@mui/icons-material'


const getEeventFromServer = () => {
    return request({
        url : '/events',
        method : 'get'
    })
}


const createNewEventInServer = (values) => {
    return request({
        url : '/events',
        method : 'POST',
        headers : {
            "Content-Type": "multipart/form-data"
        },
        data : values
    })
}


const Events = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [addEventDialogOpen , setAddEventDialogOpen] = useState(false)
    const [open , setOpen] = useState(false)
    const [message , setMessage] = useState("")
    const [messageType , setMessageType] = useState("")
    const [imagePreview, setImagePreview] = useState(null);
 const handleSelectImage = (event) => {
        const file = event.target.files[0];
        
        setImagePreview(URL.createObjectURL(file))
      }
    const onAddEventDialogOpen = () => {
        setAddEventDialogOpen(true)
    }
    const onAddEventDialogClose = () => {
        setAddEventDialogOpen(false)
    }


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };

    const events = useQuery({
        queryKey : ['get-events-from-server'],
        queryFn : getEeventFromServer
    })


    const createNewEvent = useMutation({
        mutationKey : ['create-new-event-in-server'],
        mutationFn : createNewEventInServer,
        onSuccess : (data) => {
            events.refetch()
            setMessage('new event added successfully')
            setMessageType('success')
            setOpen(true)
            setImagePreview(null)
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

    const handleFormSubmit = (values) => {
        let neValues = {
            name : values.name,
            image_cover : values.imageFile
        }
        createNewEvent.mutate(neValues)
        setAddEventDialogOpen(false)
    }
    

      if(events.isLoading || createNewEvent.isLoading){
        return <CubeLoader />
      }

      if(events.isError){
        return <GetErrorHandler error={events.error} refetch={events.refetch} />
      }

  return (
    <>
    <Box>
        <AddButton color={colors.indigoAccent[500]} reactionFunction={onAddEventDialogOpen} />
        {
            events?.data?.data?.events.length === 0 && (
                <Typography
                    sx={{
                      color : colors.pinkAccent[500],
                      textAlign : 'center'
                    }}
                    variant='h2'
                  >
                    No Events until now
                  </Typography>
            )
        }
        <GridBox spacing={2}>
            {
                    events?.data?.data?.events?.map(event => (
                    <GridItem xs={12} sm={6} md={4} lg={3}>
                        <EventCard eventData={event} refetch={events.refetch} setMessage={setMessage} setMessageType={setMessageType} setOpen={setOpen} />
                    </GridItem>
                ))
            }
        </GridBox>
    </Box>
        <Dialog
            open={addEventDialogOpen}
            maxWidth={'xs'}
        >
        <DialogTitle
                sx={{
                    color : colors.yellowAccent[500] ,
                    textAlign : 'center',
                    textTransform : 'capitalize'
                }}
            >create new Event</DialogTitle>
        <DialogContent>
            <DialogContentText
            sx={{
                textAlign : 'center',
                marginBottom : '10px'
            }}
            >
                after you add an image to an event , this image will publish to all users and this image can't be update but you can delete it if you make a mistake
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
                            label="Event Name"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.name}
                            name="name"
                            error={!!touched.name && !!errors.name}
                            helperText={touched.name && errors.name}
                            sx={{ gridColumn: "span 4" }}
                        />
                        <Box
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
                                        }} onBlur={handleBlur} type="file" name="image" value={values.image} />
                                        
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
            <Button onClick={onAddEventDialogClose} color="error">
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
    name :  Yup.string().required('event name field is required'),
    image :  Yup.string().required('cover image of event is required'),
  })
  
  const initialValues = {
    name : '',
    image : '',
    imageFile : {}
  }
  

export default Events