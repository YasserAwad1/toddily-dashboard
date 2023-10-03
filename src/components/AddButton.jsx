import { AddOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../assets/theme'

const AddButton = ({color , reactionFunction}) => {
  return (
    <Box
        sx={{
            marginBottom : '10px',
            display : 'flex',
            alignItems : 'center',
            border : `1px solid ${color}`,
            borderRadius : '6px',
            transition : '0.4s',
            transformOrigin : 'bottom left',
            position : 'relative',
            width : 'fit-content',
            "&::after" : {
                content : "''",
                position : 'absolute',
                width  : '10px',
                height : '10px',
                borderRadius : '50%',
                left : '0',
                top : '-10px',
                backgroundColor : `${color}`,
                transition : '0.4s'
            },
            "&:hover" : {
                transform : 'rotate(4deg)',
                paddingRight : '10px',
                "& .my-text" : {
                    maxWidth : '50px'
                }
            },
            "&:hover::after" : {
                left : 'calc(100% - 20px)'
            },
            "&::before" : {
                content : "''",
                position : 'absolute',
                width : '1px',
                height : '0',
                backgroundColor : `${color}`,
                transition : '0.4s',
                right : '9px',
                top : '-10px',
            },
            "&:hover::before" :{
                top : '-10px',
                height : '10px'
            }
        }}
        onClick={() => reactionFunction()}
    >
        <IconButton
            sx={{
                borderRadius : '0px',
                width : '40px',
                height : '40px',
                backgroundColor : 'transparent',
                "&:hover" : {
                    backgroundColor : 'transparent'
                }
            }}
            onClick={() => reactionFunction()}
        >
            <AddOutlined 
                sx={{
                    color : `${color}`
                }}
            />
        </IconButton>
        <Typography
            className='my-text'
            sx={{
                maxWidth : '0px',
                transition : '0.4s',
                overflow : 'hidden',
            }}
            onClick={() => reactionFunction()}
        >
            new
        </Typography>
    </Box>
  )
}

export default AddButton