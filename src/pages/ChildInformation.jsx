import { CloudUpload, PermIdentityOutlined} from '@mui/icons-material'
import { Alert, Box, Button, ImageList, ImageListItem, List, ListItem, ListItemIcon, ListItemText, Snackbar, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { tokens } from '../assets/theme'
import { useLocation, useNavigate, useParams } from 'react-router'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { baseURLImage, request } from '../api/request'
import { useMutation } from '@tanstack/react-query'
import { VisuallyHiddenInput } from '../components/VisuallyHiddenInput'
import CubeLoader from '../components/CubeLoader/CubeLoader'


const ChildInformation = () => {
    const theme = useTheme()
    const [updateFormOpen , setUpdateFormOpen] = useState(false)
    const colors = tokens(theme.palette.mode)
    const {state : {data}} = useLocation()
    const [open , setOpen] = useState(false)
    const [message , setMessage] = useState("")
    const [messageType , setMessageType] = useState("success")
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate()

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };



    const handleSelectImage = (event) => {
        const file = event.target.files[0];
        
        setImagePreview(URL.createObjectURL(file))
      }
    const initialValues = {
        image : '',
        imageFile : ''
    }

    const validationSchema = Yup.object({
        image : Yup.string().required('image field is required')
    })

    const updateImage = (values) => {
        return request({
            url : `/children/${data.id}`,
            data : values,
            headers : {
                "Content-Type" : "multipart/form-data"
            },
            method : 'post'
        })
    }
    const updateImageMution = useMutation({
        mutationKey : [`update-child-${data.id}-image-in server`],
        mutationFn : updateImage,
        onSuccess : () => {
            setMessage('added successfully for system')
            setMessageType('success')
            setOpen(true)
            setUpdateFormOpen(false)
            setImagePreview(null)
            navigate(-1)
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

    const handleFormSubmit = (values) => {
        let data = {
            image : values.imageFile
        }
        updateImageMution.mutate(data)
    }

    if(updateImageMution.isLoading){
        return <CubeLoader />
    }

  return (
    <>
    <Box>
        <Button
            onClick={()=> setUpdateFormOpen(true)}
            variant='contained'
            color='secondary'
        >
            update image
        </Button>
        <Box
            sx={{
                width : {xs : '100%' , sm : '80%' , md : '60%'},
                margin : '0 auto'
            }}
        >
        {
            updateFormOpen && (
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
                            <Button
                                component="label"
                                variant="contained"
                                startIcon={<CloudUpload />}
                                href="#file-upload"
                                fullWidth
                                color='secondary'
                                sx={{
                                    gridColumn: "span 4",
                                    padding : '10px 20px',
                                    marginTop : '10px'
                                }}
                            >
                                Upload a file
                                <VisuallyHiddenInput onChange={(e) => {
                                    setFieldValue('imageFile' , e.currentTarget.files[0])
                                    handleChange(e)
                                    handleSelectImage(e)
                                }} type="file" name="image" value={values.image} />
                            </Button>
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
                        <Box display="flex" justifyContent="end" mt="20px" gap={'10px'}>
                            <Button type="submit" color="success" variant="contained">
                            update
                            </Button>
                            <Button onClick={() => { setUpdateFormOpen(false) ; setImagePreview(null) }} color="error" variant="outlined">
                            cancel
                            </Button>
                        </Box>
                        </form>
                    )
                    }
                </Formik>
            )
        }
        </Box>
            <Typography
                sx={{
                    textTransform : 'capitalize',
                    color : colors.greenBlueAccent[500],
                    margin : '20px 5px'
                }}
                variant='h3'
            >
                identity informations
            </Typography>
            <ImageList variant="masonry" cols={1} gap={8}>
                <ImageListItem 
                    key={data.image}
                    sx={{
                    position : 'relative',
                    borderRadius : '6px',
                    maxWidth : '60%',
                    margin : '0 auto'
                    }}
                    
                >
                    <img
                    src={`${baseURLImage}${data.image}?w=248&fit=crop&auto=format`}
                    srcSet={`${baseURLImage}${data.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                    alt={data.image}
                    loading="lazy"
                    style={{
                        borderRadius : '6px'
                    }}
                    />
                </ImageListItem>
            </ImageList>
            <List>
                <ListItem>
                    <ListItemIcon>
                        <PermIdentityOutlined />
                    </ListItemIcon>
                    <ListItemText>
                        {data.name}
                    </ListItemText>
                </ListItem>
                <ListItem>
                    <ListItemIcon>
                        <PermIdentityOutlined />
                    </ListItemIcon>
                    <ListItemText>
                        {data.isExtra ? 'Extra' : 'Not Extra'}
                    </ListItemText>
                </ListItem>
            </List>
        </Box>
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
        </>
  )
}

export default ChildInformation