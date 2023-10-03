import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, List, ListItem, ListItemIcon, ListItemText, TextField, Typography, useTheme } from '@mui/material'
import React from 'react'
import GridBox from '../components/GridBox'
import GridItem from '../components/GridItem'
import { tokens } from '../assets/theme'
import { NoteOutlined } from '@mui/icons-material'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { request } from '../api/request'
import { useMutation } from '@tanstack/react-query'
import CubeLoader from '../components/CubeLoader/CubeLoader'

const sendNotification = (values) => {
    return request({
        url : '/sendNotification',
        method : 'post',
        data : values
    })
}

const ReadableCards = ({setMessage , setMessageType , setaAlterOpen}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const sendNotificationMutation = useMutation({
        mutationKey : ['send-notification-for-user'],
        mutationFn : sendNotification,
        onSuccess : () => {
            setMessage('Notification Sent Successfully')
            setMessageType('success')
            setaAlterOpen(true)
            setOpen(false)
        },
        onError : (error) => {
            if (error.response){
              switch(error.response.status){
                case 401 : {
                    setMessage('you are not authorize to get in our system')
                  setMessageType('error')
                  setaAlterOpen(true)
                  break
                }
                case 422 : {
                    setMessage('wrong entered data')
                  setMessageType('error')
                  setaAlterOpen(true)
                  break
                }
                case 500 : {
                    setMessage('we have a problem in our server , come later')
                  setMessageType('error')
                  setaAlterOpen(true)
                  break
                }
                case 404 : {
                    setMessage("we out of space , we can't find your destenation")
                  setMessageType('error')
                  setaAlterOpen(true)
                  break
                }
                default : {
                    setMessage("unkown error accoure : request falid with status code" + error.response.status)
                  setMessageType('error')
                  setaAlterOpen(true)
                  break
                }
              }
            }else if(error.request){
                setMessage('server response with nothing , Check your internet connection or contact support if the problem persists')
              setMessageType('error')
              setaAlterOpen(true)
            }else {
                setMessage('unknow error : ' + error.message)
              setMessageType('error')
              setaAlterOpen(true)
            }
          }
    })

    const sendNotificationHandler = (values) => {
        sendNotificationMutation.mutate(values)
    }

    if(sendNotificationMutation.isLoading){
        return <CubeLoader />
    }
  return (
    <>
    <Box
        sx={{
            margin : '30px 0',
        }}
    >
        <GridBox spacing={4}>
            <GridItem xs={12}  md={7}>
                <Box
                    sx={{
                        padding : '20px 5px',
                        borderRadius : '8px',
                        backgroundImage : `linear-gradient(90deg , ${colors.primary[500]} , ${colors.primary[400]})`,
                    }}
                >
                    <Typography
                        variant='h4'
                        sx={{
                            textTransform : 'capitalize'
                        }}
                    >
                        public information about system
                    </Typography>
                    <Typography
                        sx={{
                            lineHeight : '1.5',
                            color : colors.grey[200],
                            margin : '10px 0'
                        }}

                        variant='h5'
                    >
                        this is where you can control everything on toddily application
                    </Typography>
                    <Typography
                        sx={{
                            color : colors.yellowAccent[500],
                            margin : '10px 0',
                            textTransform : 'capitalize ',
                            position : 'relative',
                            width : 'fit-content',
                            "&::before" :{
                                content : '""',
                                position : 'absolute',
                                width : '30%',
                                height : '1px',
                                backgroundColor : colors.yellowAccent[500],
                                left : '0',
                                bottom : '-4px'
                            }
                        }}
                        variant='h5'
                    >
                        important infromation for admin
                    </Typography>
                    <List>
                        <ListItem
                            
                        >
                            <ListItemIcon>
                                <NoteOutlined/>
                            </ListItemIcon>
                            <ListItemText
                                sx={{
                                    textTransform : 'capitalize'
                                }}
                            >
                            don't give up your credentials to anyone else
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            
                        >
                            <ListItemIcon>
                                <NoteOutlined/>
                            </ListItemIcon>
                            <ListItemText
                            sx={{
                                textTransform : 'capitalize'
                            }}
                            >
                            when you perform any action you will not be able to go back , so take care while working in dashboard
                            </ListItemText>
                        </ListItem>
                        <ListItem
                            
                        >
                            <ListItemIcon>
                                <NoteOutlined/>
                            </ListItemIcon>
                            <ListItemText
                            sx={{
                                textTransform : 'capitalize'
                            }}
                            >
                                read evey popup that comes up , it may contain important information
                            </ListItemText>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <NoteOutlined/>
                            </ListItemIcon>
                            <ListItemText
                            sx={{
                                textTransform : 'capitalize'
                            }}
                            >
                                all buttons in the dashboard perform impotant actions , if you didn't know the functionality of any button , please contact support
                            </ListItemText>
                        </ListItem>
                    </List>
                    
                </Box>
            </GridItem>
            <GridItem xs={12} md={5}>
                <Box
                    sx={{
                        backgroundColor : colors.yellowAccent[500],
                        borderRadius : '12px',
                        justifyContent : 'center',
                        padding : '15px',
                        height : '100%'
                    }}
                >
                    <Box
                        sx={{
                            backgroundColor : colors.primary[500],
                            borderRadius : '12px',
                            display : 'flex',
                            alignItems : 'center',
                            justifyContent : 'center',
                            flexDirection : 'column',
                            height : '100%',
                            padding : '5px'
                        }}
                    >
                        <Typography
                            sx={{
                                textAlign : 'center',
                                lineHeight : '1.5',
                                color : colors.grey[200],
                                marginBottom : '10px'
                            }}
                            variant='h5'
                        >
                            send a notification to all parents
                        </Typography>
                        <Button color='secondary' onClick={handleClickOpen}>send notification</Button>
                    </Box>
                </Box>
            </GridItem>
        </GridBox>
    </Box>
    <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Send Notification</DialogTitle>
        <DialogContent>
          <DialogContentText>
            publish new notification for user 
          </DialogContentText>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={sendNotificationHandler}
        >
            {
                ({handleBlur , handleChange , handleSubmit , values , errors , touched}) => (
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Title"
                            value={values.title}
                            name='title'
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.title && !!errors.title}
                            helperText={touched.title && errors.title}
                            sx={{
                                mb : 1,
                            }}
                        />
                        <TextField
                            label="Message"
                            multiline
                            rows={4}
                            value={values.message}
                            name='body'
                            fullWidth
                            variant="outlined"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            error={!!touched.body && !!errors.body}
                            helperText={touched.body && errors.body}
                        />
                        <Box
                            sx={{
                                display : 'flex',
                                alignItems : 'center',
                                justifyContent: 'flex-end',
                                marginTop : '10px'
                            }}
                        >
                            <Button type='submit' color='success'>
                                Send Notification
                            </Button>
                        </Box>
                    </form>
                )
            }
        </Formik>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color='error'>Cancel</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

const initialValues = {
    body : '',
    title : ''
}

const validationSchema = Yup.object({
    body : Yup.string().required('message is required'),
    title : Yup.string().required('title is required')
})

export default ReadableCards