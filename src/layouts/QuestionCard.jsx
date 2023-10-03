import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Snackbar, Typography, useTheme } from '@mui/material'
import React, { useMemo, useState } from 'react'
import { tokens } from '../assets/theme'
import { DeleteOutlined, QuestionAnswer, QuestionMarkOutlined } from '@mui/icons-material'
import { useMutation } from '@tanstack/react-query'
import { request } from '../api/request'
import CubeLoader from '../components/CubeLoader/CubeLoader'

const deleteFaqFromServer = (id) => {
    return request({
        url : `/question-answer/${id}`,
        method : 'delete'
    })
}

const QuestionCard = ({faqData , refetch , setOpen , setMessage , setMessageType }) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const [answerOpen , setAnswerOpen] = useState(false)
    const randomColor = useMemo(() => colors.mix[Math.floor(Math.random() * 6) * 100] ,[])
    const [deleteFAQDialogOpen , setDeleteFAQDialogOpen] = useState(false)
    const onDeleteFAQDialogOpen = () => {
        setDeleteFAQDialogOpen(true)
      }
      const onDeleteFAQDialogClose = () => {
        setDeleteFAQDialogOpen(false)
      }

      const deleteDialogMuation = useMutation({
        mutationKey : ['delete-faq-from-server'],
        mutationFn : deleteFaqFromServer,
        onSuccess : () => {
            refetch()
            setMessage('one faq deleted successfully')
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

      const onDeleteFAQDialogConfirm = () => {
        deleteDialogMuation.mutate(faqData?.id)
        onDeleteFAQDialogClose()
      }

    if(deleteDialogMuation.isLoading){
      return <CubeLoader />
    }
  return (
    <>
    <Box
        sx={{
            
            padding : '10px',
            borderRadius : '8px',
            // boxShadow : `2px 2px 10px -6px ${colors.primary[400]}`
            boxShadow : `1px 1px 8px -6px ${randomColor}`,
            // boxShadow : `2px 2px 10px -6px ${colors.mix[Math.floor(Math.random() * 7) * 100]}`,
            marginBottom : '10px',
            
        }}
        
    >
        <Box
            sx={{
                display : 'flex',
                justifyContent : 'space-between',
                alignItems : 'center',
            }}
            
        >

            <Box
                sx={{
                    display : 'flex',
                    alignItems : 'center',
                    gap : '5px',
                    padding : '6px',
                    cursor : 'pointer',
                }}
                onClick={() => setAnswerOpen(!answerOpen)}
            >
                <QuestionMarkOutlined 
                    sx={{
                        color : randomColor,
                    }}
                />
                <Typography
                    sx={{
                        textTransform : 'capitalize',
                        color : colors.grey[100]
                    }}
                    variant='h4'
                >
                    {faqData?.question}
                </Typography>
                
            </Box>
            <IconButton
                color='warning'
                onClick={onDeleteFAQDialogOpen}
            >
                <DeleteOutlined />
            </IconButton>
        </Box>
        {
            answerOpen && (
                <Box
                    sx={{
                        display : 'flex',
                        alignItems : 'center',
                        gap : '8px',
                        padding : '10px',
                        borderRadius : '2px',
                        marginTop : '10px',
                        cursor : 'pointer',
                    }}
                    onClick={() => setAnswerOpen(!answerOpen)}
                >
                    <QuestionAnswer 
                        color='success'
                    />
                    <Typography
                        variant='h5'
                    >
                        {faqData?.answer}
                    </Typography>
                </Box>
            )
        }
    </Box>
    <Dialog
        open={deleteFAQDialogOpen}
        maxWidth={'xs'}
    >
        <DialogTitle
                sx={{
                    color : colors.yellowAccent[500] 
                }}
            >Confirm Delete FAQ's Card</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to Delete the FAQ? this action
            can't be undone .
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onDeleteFAQDialogClose} color="error">
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onDeleteFAQDialogConfirm}
            color='success'
          >
            Confirm
          </Button>
        </DialogActions>
    </Dialog>
    </>
  )
}

export default QuestionCard