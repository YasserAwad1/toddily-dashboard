import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormHelperText, IconButton, ImageList, ImageListItem, Snackbar, TextField, Typography, useTheme } from '@mui/material';
import React , {useState} from 'react';
import { baseURLImage, request } from '../api/request';
import { useMutation, useQuery } from '@tanstack/react-query';
import CubeLoader from '../components/CubeLoader/CubeLoader';
import { useNavigate } from 'react-router';
import AddButton from '../components/AddButton';
import { tokens } from '../assets/theme';
import * as Yup from 'yup'
import { Formik } from 'formik';
import { CloudUpload, DeleteOutlined } from '@mui/icons-material';
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper';
import { VisuallyHiddenInput } from '../components/VisuallyHiddenInput';

const addImageToServer = (file) => {
    return request({
        url : '/post',
        method : 'POST',
        headers : {
          "Content-Type": "multipart/form-data"
        },
        data : file
    })
}

const getPublicImagesFromServer = () => {
    return request({
        url : '/post',
    })
}

const deleteImageFromServer = (id) => {
  return request({
    url : `/post/${id}`,
    method : 'delete'
  })
}

const PublicImages = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [open, setOpen] = useState(false);
    const [openSnackbar , setOpenSnackbar] = useState(false)
    const [message , setMessage] = useState("")
    const [messageType , setMessageType] = useState("")
    const [deleteDialogOpen , setDeleteDialogOpen] = useState(false)
    const [clickedImage , setClickedImage] = useState()
    const [imagePreview, setImagePreview] = useState(null);
    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        
        setImagePreview(URL.createObjectURL(file))
      }

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handelAlterClose = () => {
      setOpenSnackbar(false)
    }

    const deleteImageDialogClose = () => {
      setDeleteDialogOpen(false)
  }

  const deleteImageDialogOpen = (id) => {
    setClickedImage(id)
    setDeleteDialogOpen(true)
  }
  const deleteDialogConfirm = () => {
    deleteImageMutation.mutate(clickedImage)
    deleteImageDialogClose()
  }

    const getPublicImagesFromServerQuery = useQuery({
        queryKey : ['get-public-images-from-server'],
        queryFn : getPublicImagesFromServer
    })

    const deleteImageMutation = useMutation({
      mutationKey : ['delete-image-from-server'],
      mutationFn : deleteImageFromServer,
      onSuccess : (data) => {
        getPublicImagesFromServerQuery.refetch()
        setMessage('an image deleted successfully')
          setMessageType('warning')
          setOpenSnackbar(true)
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

    const addImageMutation = useMutation({
        mutationKey : ['add-public-image-to-server'],
        mutationFn : addImageToServer,
        onSuccess : (data) => {
          getPublicImagesFromServerQuery.refetch()
          setMessage('new image added successfully')
          setMessageType('success')
          setOpenSnackbar(true)
          setOpen(false)
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

    const addImageFornHanderler = (values) => {
        let data = {
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
            images : currentImages
          }
          addImageMutation.mutate(currentData)
          i+=5
        }else{
          let currentImages = [] ;
          for(let j = i ; j < values.imageFile.length ; j ++){
            currentImages[j] = values.imageFile[j]
          }
          const currentData = {
            images : currentImages
          }
          addImageMutation.mutate(currentData)
          i+= values.imageFile.length - i
        }
      }
      return 
    }
        addImageMutation.mutate(data)
        setOpen(false)

    }
    if(getPublicImagesFromServerQuery.isLoading || addImageMutation.isLoading || deleteImageMutation.isLoading){
      return <CubeLoader />
    }
  
    if(getPublicImagesFromServerQuery.isError){
      return <GetErrorHandler error={getPublicImagesFromServerQuery.error} refetch={getPublicImagesFromServerQuery.refetch} />
    }

  return (
    <>
    <Box>
    <AddButton color={colors.pinkAccent[500]} reactionFunction={handleClickOpen} />
    <Box sx={{ width: '100%', height: '100%'}}>
      {
        getPublicImagesFromServerQuery.data.data.posts.length === 0 && (
          <Typography
          sx={{
            color : colors.pinkAccent[500],
            textAlign : 'center'
          }}
          variant='h2'
        >
          No Posts until now
        </Typography>
        )
      }
      <ImageList variant="masonry" cols={3} gap={8}>
        {getPublicImagesFromServerQuery.data.data.posts.map((item,i) => (
          <ImageListItem 
            key={i}
            sx={{
              position : 'relative',
              borderRadius : '6px'
              
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
              src={`${baseURLImage}${item.image_url}?w=248&fit=crop&auto=format`}
              srcSet={`${baseURLImage}${item.image_url}?w=248&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
              style={{
                borderRadius : '0 6px 6px 6px'
              }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
    </Box>
    <Snackbar open={openSnackbar} autoHideDuration={4000} onClose={handelAlterClose}>
            <Alert onClose={handelAlterClose} severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    <Dialog 
      open={open}
    >
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <Formik
                onSubmit={addImageFornHanderler}
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
                        <Button type="submit" color="success" variant="outlined">
                            add
                        </Button>
                        </Box>
                    </form>
                    )
                }
            </Formik>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant='outlined' color='error'>Cancel</Button>
        </DialogActions>
      </Dialog>

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
            delete Image alter
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
                textAlign : 'center',
                marginBottom : '10px'
            }}
          >
            are you sure you want to delete this image , this action can't be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={deleteDialogConfirm} color="success">
                confirm
            </Button>
            <Button onClick={deleteImageDialogClose} color="error">
                Cancel
            </Button>
        </DialogActions>
        </Dialog>
    </>
  )
}

export default PublicImages

const initialValues = {
    image : '',
    imageFile : ''
}

const validationSchema = Yup.object({
    image : Yup.string().required('image field is required')
})