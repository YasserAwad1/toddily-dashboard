import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import { tokens } from '../assets/theme'
import { Link } from 'react-router-dom'
import { baseURLImage } from '../api/request';

const ChildCard = ({child , childClassName}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    console.log(child)
  return (
    <Box
        sx={{
            overflow : 'hidden',
            position : 'relative',
            borderRadius : '8px',
            "&:hover .child-card-body" : {
                bottom : '0'
            },
            "&:hover > img" : {
                transform : 'rotate(3deg) scale(1.1)'
            }
        }}
    >
        <img 
            style={{
                maxWidth : '100%',
                transition : '0.3s'
            }}
            src={`${baseURLImage}${child.image}`}
            locading={'lazy'}
        />
        <Box
            className={'child-card-body'}
            sx={{
                position : 'absolute',
                width : '100%',
                padding : '20px',
                backgroundColor : 'white',
                transition : '0.3s',
                left : '0',
                bottom : '-100%'
            }}
        >
            <Typography
                sx={{
                    color : colors.indigoAccent[500],
                    fontSize : '20px',
                    fontWeight : '500'
                }}
            >
                {child.name}
            </Typography>
            <Typography
                sx={{
                    color : colors.grey[200],
                    fontSize : '16px',
                    fontWeight : '300'
                }}
            >
                {childClassName}
            </Typography>
        </Box>
    </Box>
  );
};

export default ChildCard;
