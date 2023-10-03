import { Alert, Box, Button, Snackbar, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import GridBox from '../components/GridBox'
import GridItem from '../components/GridItem'
import { tokens } from '../assets/theme'
import { Formik } from 'formik'
import * as yup from 'yup'
import signinBackground from '../assets//images/toddilyOuterLogo.jpg'
import Form from '../components/Form'
import { request } from '../api/request'
import { useNavigate } from 'react-router'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import { useMutation } from '@tanstack/react-query'
import { login, useJawadAuthController } from '../context'

const signinHandler = (values) => {
  return request({
    url : '/login',
    method : 'post',
    data : {
      ...values,
      device_token : 'kdfnaskjdnakndwilahdhnskandawihdnaljdnhakjwdnkjabshab'
    },
  }).then(res => res)
}

const Signin = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const isExtraSmall = useMediaQuery('(max-width:599px)')
    const [open , setOpen] = useState(false)
    const [message , setMessage] = useState("")
    const [messageType , setMessageType] = useState("success")
    const [ , dispatch] = useJawadAuthController()

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const navigate = useNavigate()

    const { mutate , isLoading} = useMutation({
      mutationFn : signinHandler,
      onSuccess : (data) => {
        login(dispatch , {
          token : data.data.token,
          user : data.data.user
        })
        navigate('/dashboard')
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
                setMessage('email or password is wrong')
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

    const loginFormHandler = (values) => {
      mutate(values)
    }

    if(isLoading){
      return <CubeLoader />
    }

  return (
    <>
    <Box>
    <GridBox
      height={'calc(100vh - 80px)'}
      alignItems={'center'}
      spacing={4}
    >
      <GridItem xs={12} sm={5} >
        <Box
          sx={{
            padding : isExtraSmall ? '0 15px' : '0 0 0 30px'
          }}
        >

          <Typography
            sx={{
              color : colors.pinkAccent[500],
              textTransform : 'capitalize',
              marginBottom : '15px',
            }}
            variant='h2'
          >
            welcome back
          </Typography>
          <Typography
            sx={{
              color :colors.grey[400],
              marginBottom : '15px',
            }}
            variant='h4'
          >
            Enter your email and password to sign up
          </Typography>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={loginFormHandler}
          >
            {
              ({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
              }) => (
                <form onSubmit={handleSubmit}>
                    <Form>
                    <TextField
                      fullWidth
                      variant="filled"
                      type="text"
                      label="Username"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.username}
                      name="username"
                      error={!!touched.username && !!errors.username}
                      helperText={touched.username && errors.username}
                      sx={{ 
                          gridColumn: "span 4" ,
                      }}
                    />
                    <TextField
                      fullWidth
                      variant="filled"
                      type="password"
                      label="Password"
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.password}
                      name="password"
                      error={!!touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                      sx={{ 
                          gridColumn: "span 4" ,
                      }}
                    />
                    </Form>
                  <Box display="flex" justifyContent="center" mt="20px">
                    <Button type="submit" fullWidth sx={{color : colors.indigoAccent[500] , padding:'10px' , backgroundImage : `linear-gradient(90deg , ${colors.yellowAccent[500]} , ${colors.yellowAccent[400]})` }} color="secondary" variant="contained">
                      Sign in
                    </Button>
                  </Box>
                  <Box
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    rowGap={2}
                    mt={3}
                    textAlign={'center'}
                    
                  >
                  </Box>
                </form>
              )
            }
          </Formik>
        </Box>
      </GridItem>
      {
        !isExtraSmall && (
          <GridItem xs={12} sm={7} sx={{height:'100%'}}>
          <Box
            height={'100%'}
            overflow ='hidden'
            mt={1}
          >

            <Box
              sx={{

                backgroundImage : `url(${signinBackground})`,
                backgroundSize : 'cover',
                backgroundRepeat : 'no-repeat',
                backgroundPosition : 'center',
                height : '100%',
                transform: "skewX(-15deg)",
                borderRadius : '16px',
                position : 'relative',
                right : '-100px',
              }}
            >
            </Box>
          </Box>
          </GridItem>
        )
      }
      
    </GridBox>
    </Box>
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                {message}
            </Alert>
        </Snackbar>
    </>
  )
}

const initialValues = {
    username : '',
    password : ''
  }
  
  const validationSchema = yup.object({
    username : yup.string().required('username field is required'),
    password : yup.string().required('password field is required')
  })
export default Signin