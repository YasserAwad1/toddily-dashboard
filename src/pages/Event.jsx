import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, IconButton, ImageList, ImageListItem, Input, Snackbar, TextField, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import GridBox from '../components/GridBox'
import GridItem from '../components/GridItem'
import image from '../assets/images/5.jpg'
import { AddOutlined, CloudUpload, DeleteOutlined, PlusOneOutlined } from '@mui/icons-material'
import { tokens } from '../assets/theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AddButton from '../components/AddButton'
import { useNavigate, useParams } from 'react-router'
import { useMutation, useQuery } from '@tanstack/react-query'
import { baseURLImage, request } from '../api/request'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import AddImage from '../assets/images/add.png'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'
import { VisuallyHiddenInput } from '../components/VisuallyHiddenInput'


const getEventImagsFromServer = (id) => {
  return request({
    url : `/events/${id}`
  })
}

// let arr = [1,2,3,4,5,6,7,8,9]
// console.log(arr.splice(0,5))

const addEventImageToserver = (values) => {
  return request({
    url : '/event-images',
    method : 'post',
    headers : {
      "Content-Type" : "multipart/form-data"
    },
    data : values
  })
}



const deleteEventImageFromServer = (id) => {
  return request({
    url : `/event-images/${id}`,
    method : 'delete'
  })
}


const Event = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [isAddImageDialogOpen , setIsAddImageDialogOpen] = useState(false)
  const [isDeleteImageOpen , setIsDeleteImageOpen] = useState(false)
  const [clickedImage , setClickedImage] = useState()
  const [openSnackbar , setOpenSnackbar] = useState(false)
  const [message , setMessage] = useState("")
  const [messageType , setMessageType] = useState("")
  const isNonMobile = useMediaQuery("(min-width:600px)")
  const {eventID} = useParams()
  const [imagePreview, setImagePreview] = useState(null);
 const handleSelectImage = (event) => {
        const file = event.target.files[0];
        
        setImagePreview(URL.createObjectURL(file))
      }

  // dealing with APIs

  const handelAlterClose = () => {
    setOpenSnackbar(false)
  }

  // get images for this event
  const eventImagesQuery = useQuery({
    queryKey : ['get-images-for-event-from-server'],
    queryFn : () => getEventImagsFromServer(eventID)
  })

  const addNewImageMutation = useMutation({
    mutationKey : ['add-event-image-to-server'],
    mutationFn : addEventImageToserver,
    onSuccess : () => {
      setMessage('images added successfully')
      setMessageType('success')
      setOpenSnackbar(true)
      eventImagesQuery.refetch()
      AddImageDialogClose()
      setImagePreview(null)
    },
    onError : (error) => {
            if (error.response){
              switch(error.response.status){
                case 401 : {
                    setMessage('you are not authorize to make this request')
                  setMessageType('error')
                  setOpenSnackbar(true)
                  break
                }
                case 422 : {
                    setMessage('problems with data you are entered')
                  setMessageType('error')
                  setOpenSnackbar(true)
                  break
                }
                case 500 : {
                    setMessage('we have a problem in our server , come later')
                  setMessageType('error')
                  setOpenSnackbar(true)
                  break
                }
                case 404 : {
                    setMessage("we out of space , we can't find your destenation")
                  setMessageType('error')
                  setOpenSnackbar(true)
                  break
                }
                default : {
                    setMessage("unkown error accoure : request falid with status code" + error.response.status)
                  setMessageType('error')
                  setOpenSnackbar(true)
                  break
                }
              }
            }else if(error.request){
                setMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
              setMessageType('error')
              setOpenSnackbar(true)
            }else {
                setMessage('unknow error : ' + error.message)
              setMessageType('error')
              setOpenSnackbar(true)
            }
          }
  })


  const deleteImageMutation = useMutation({
    mutationKey : ['delete-event-image-from-server'],
    mutationFn : deleteEventImageFromServer,
    onSuccess : () => {
      setMessage('one image deleted successfully')
      setMessageType('warning')
      setOpenSnackbar(true)
      eventImagesQuery.refetch()
      deleteImageDialogClose()
    },
    onError : (error) => {
      if (error.response){
        switch(error.response.status){
          case 401 : {
              setMessage('you are not authorize to make this request')
            setMessageType('error')
            setOpenSnackbar(true)
            break
          }
          case 422 : {
              setMessage('problems with data you are entered')
            setMessageType('error')
            setOpenSnackbar(true)
            break
          }
          case 500 : {
              setMessage('we have a problem in our server , come later')
            setMessageType('error')
            setOpenSnackbar(true)
            break
          }
          case 404 : {
              setMessage("we out of space , we can't find your destenation")
            setMessageType('error')
            setOpenSnackbar(true)
            break
          }
          default : {
              setMessage("unkown error accoure : request falid with status code" + error.response.status)
            setMessageType('error')
            setOpenSnackbar(true)
            break
          }
        }
      }else if(error.request){
          setMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
        setMessageType('error')
        setOpenSnackbar(true)
      }else {
          setMessage('unknow error : ' + error.message)
        setMessageType('error')
        setOpenSnackbar(true)
      }
    }
  })

  const AddImageDialogOpen = () => {
    setIsAddImageDialogOpen(true)
  }
  const AddImageDialogClose = () => {
    setIsAddImageDialogOpen(false)
  }

  // here
  const handleFormSubmit = (values) => {
    const data = {
      event_id : eventID,
      images : values.imageFile
    }
    let i = 0
    if(values.imageFile.length > 5){
      while( i < values.imageFile.length ){
        if(i+5 <= values.imageFile.length){
          let currentImages = [] ;
          for(let j = i ; j < i+5 ; j ++){
            currentImages[j] = values.imageFile[j]
          }
          const currentData = {
            event_id : eventID,
            images : currentImages
          }
          addNewImageMutation.mutate(currentData)
          i+=5
        }else{
          let currentImages = [] ;
          for(let j = i ; j < values.imageFile.length ; j ++){
            currentImages[j] = values.imageFile[j]
          }
          const currentData = {
            event_id : eventID,
            images : currentImages
          }
          addNewImageMutation.mutate(currentData)
          i+= values.imageFile.length - i
        }
      }
    }
    addNewImageMutation.mutate(data)
  }



  const deleteImageDialogOpen = (id) => {
    setClickedImage(id)
    setIsDeleteImageOpen(true)
  }
  const deleteImageDialogClose = () => {
    setIsDeleteImageOpen(false)
  }
  const deleteImageDialogConfirm = () => {
    deleteImageMutation.mutate(clickedImage)
  }


  if(eventImagesQuery.isLoading || addNewImageMutation.isLoading || deleteImageMutation.isLoading){
    return <CubeLoader />
  }

  if(eventImagesQuery.isError){
    return <GetErrorHandler error={eventImagesQuery.error} refetch={eventImagesQuery.refetch} />
  }

  const eventInformation = eventImagesQuery.data.data.event

  return (
    <>
    <Box>
    
    <ImageList variant="masonry" cols={3} gap={8}>
      <ImageListItem
        sx={{
          position : 'relative'
        }}
      >
        <Box
          sx={{
            width : '100%',
            height : '100%',
            position : 'absolute',
            left : '0',
            top : '0',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            backgroundColor : colors.indigoAccent[500],
            borderRadius : '6px',
            cursor : 'pointer',
            transition : '0.3s',
            "&:hover" : {
              backgroundColor : colors.indigoAccent[600],
            }
          }}
          onClick={AddImageDialogOpen}
        >
          <AddOutlined 
              sx={{
                color : '#fff',
                fontSize : '100px'
              }}
          />
        </Box>
        <img
          src={`${AddImage}`}
          srcSet={`${AddImage}`}
          alt={'add'}
          loading="lazy"
          style={{
            borderRadius : '6px',
            width : '150px',
          }}
        />
      </ImageListItem>
        {eventInformation.event_images.map((item) => (
          <ImageListItem 
            key={item.src}
            sx={{
              position : 'relative',
              borderRadius : '0px 6px 6px 6px'
              
            }}
            
          >
            <IconButton
              sx={{
                position : 'absolute',
                backgroundColor : 'rgba(255 , 255 , 255 , 0.6)',
                transition : '0.3s',
                left : '0px',
                top : '0px',
                borderTopLeftRadius : '0',
                '&:hover' : {
                  backgroundColor : 'rgba(255 , 255 , 255 , 1)',
                  left : '5px',
                top : '5px',
                }
              }}
              onClick={() => deleteImageDialogOpen(item.id)}
              color='error'
            >
              <DeleteOutlined />
            </IconButton>
            <img
              src={`${baseURLImage}${item.src}?w=248&fit=crop&auto=format`}
              srcSet={`${baseURLImage}${item.src}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.src}
              loading="lazy"
              style={{
                borderRadius : '0px 6px 6px 6px'
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    <Dialog
        open={isAddImageDialogOpen}
        maxWidth={'xs'}
    >
        <DialogTitle
                sx={{
                    color : colors.yellowAccent[500] ,
                    textAlign : 'center',
                    textTransform : 'capitalize'
                }}
            >add image to event</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
                textAlign : 'center',
                marginBottom : '10px'
            }}
          >
            after you click on create button , new image will publish for all users and this image cant be update later so take care while chooseing, and dont worry you can delete image if you make a mistake
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
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
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
                                        setFieldValue('imageFile' , e.currentTarget.files)
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
          <Button onClick={AddImageDialogClose} color="error">
            Cancel
          </Button>
          
        </DialogActions>
    </Dialog>

    <Dialog
        open={isDeleteImageOpen}
        maxWidth={'xs'}
    >
        <DialogTitle
                sx={{
                    color : colors.yellowAccent[500] ,
                    textAlign : 'center',
                    textTransform : 'capitalize'
                }}
            >add image to event</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
                textAlign : 'center',
                marginBottom : '10px'
            }}
          >
            are you sure that you want to delete this image , this action cant be undone
          </DialogContentText>
          </DialogContent>
        <DialogActions>
          <Button onClick={deleteImageDialogConfirm} color="success">
            confirm
          </Button>
          <Button onClick={deleteImageDialogClose} color="error">
            cancle 
          </Button>
          
        </DialogActions>
    </Dialog>
    <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handelAlterClose}>
            <Alert onClose={handelAlterClose} severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </>
  )
}

const validationSchema = Yup.object({
  image :  Yup.string().required('image field is required'),
})

const initialValues = {
  image : '',
  imageFile : ''
}

export default Event