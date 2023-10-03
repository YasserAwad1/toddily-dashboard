import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Snackbar, TextField, Typography, useMediaQuery, useTheme } from '@mui/material'
import React, { useState } from 'react'
import QuestionCard from '../layouts/QuestionCard'
import { tokens } from '../assets/theme'
import { Formik } from 'formik'
import * as Yup from 'yup'
import AddButton from '../components/AddButton'
import { request } from '../api/request'
import { useMutation, useQuery } from '@tanstack/react-query'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'

const getFAQsFromServer = () => {
  return request({
    url : '/question-answer',
    method : 'get'
  })
}

const addFaqToServer = (values) => {
  return request({
    url : '/question-answer',
    method : 'post',
    data : values
  })
}

const FAQs = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [addFAQDialogOpen , setAddFAQDialogOpen] = useState(false)
    const [open , setOpen] = useState(false)
    const [message , setMessage] = useState("")
    const [messageType , setMessageType] = useState("")
    const randomNumberBetween0Adn7 = Math.floor(Math.random() * 7)
    const randomNumberBetween100And700 = (randomNumberBetween0Adn7 !== 0 ? randomNumberBetween0Adn7 : 1) * 100
    const randomColor = colors.mix[randomNumberBetween100And700]
    const addToServerMutation = useMutation({
      mutationKey : ['add-faq-to-server'],
      mutationFn: addFaqToServer,
      onSuccess : () => {
        getFaqsQuery.refetch()
        setMessage('new faq added successfully')
        setMessageType('success')
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
    const handleFormSubmit = (values) => {
      addToServerMutation.mutate(values)
      setAddFAQDialogOpen(false)
    }
    const onAddFAQDialogOpen = () => {
      setAddFAQDialogOpen(true)
    }
    const onAddFAQDialogClose = () => {
      setAddFAQDialogOpen(false)
    }
    const onAddFAQDialogConfirm = () => {
      onAddFAQDialogClose()
    }

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };

    const getFaqsQuery = useQuery({
      queryKey : ['get-faqs-from-server'],
      queryFn : getFAQsFromServer,
      refetchIntervalInBackground : true
    })

    if(getFaqsQuery.isLoading || addToServerMutation.isLoading){
      return <CubeLoader />
    }

    if(getFaqsQuery.isError){
      return <GetErrorHandler error={getFaqsQuery.error} refetch={getFaqsQuery.refetch} />
    }

  return (
    <>
        <Box>
            <AddButton color={randomColor} reactionFunction={onAddFAQDialogOpen} refetch={getFaqsQuery.refetch} />
            <Box>
              {
                getFaqsQuery?.data?.data?.qa.length === 0 && (
                  <Typography
                    sx={{
                      color : colors.pinkAccent[500],
                      textAlign : 'center'
                    }}
                    variant='h2'
                  >
                    No FAQs until now
                  </Typography>
                )
              }
              {
                getFaqsQuery?.data?.data?.qa?.map(faq => (
                  <QuestionCard faqData={faq} refetch={getFaqsQuery.refetch} setMessage={setMessage} setMessageType={setMessageType} setOpen={setOpen} />
                ))
              }
            </Box>
        </Box>
        <Dialog
          open={addFAQDialogOpen}
          maxWidth={'xs'}
        >
        <DialogTitle
                sx={{
                    color : colors.yellowAccent[500] ,
                    textAlign : 'center',
                    textTransform : 'capitalize'
                }}
            >create new FAQ</DialogTitle>
        <DialogContent>
          <DialogContentText
            sx={{
                textAlign : 'center',
                marginBottom : '10px'
            }}
          >
            after you add a Q&A it will publish to all users and this Q&A cannot be update , to take care while writing it , and if you make a mistake you can delete it and write a new one
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
                    label="Question"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.question}
                    name="question"
                    error={!!touched.question && !!errors.question}
                    helperText={touched.question && errors.question}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Answer"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.answer}
                    name="answer"
                    error={!!touched.answer && !!errors.answer}
                    helperText={touched.answer && errors.answer}
                    sx={{ gridColumn: "span 4" }}
                />
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
          <Button onClick={onAddFAQDialogClose} color="error">
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
    question :  Yup.string().required('question field is required'),
    answer :  Yup.string().required('answer field is required'),
  })
  
  const initialValues = {
    question : '',
    answer : '',
  }
  

export default FAQs