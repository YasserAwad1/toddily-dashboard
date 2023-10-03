import { Box, IconButton, ImageList, ImageListItem, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme, useThemeProps } from '@mui/material'
import React from 'react'
import { tokens } from '../assets/theme'
import { CallOutlined, ClassOutlined, PermIdentityOutlined, WorkOutlined } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { request } from '../api/request'
import { useParams } from 'react-router'
import CubeLoader from '../components/CubeLoader/CubeLoader'


const getStuffFromServer = (id) => {
    return request({
        url : `/accounts/${id}`
    })
}

const StuffInformation = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const {stuffID} = useParams()
    const getStuffQuery = useQuery({
        queryKey : [`get-stuff-${stuffID}-from-server`],
        queryFn : () => getStuffFromServer(stuffID),
    })


    if(getStuffQuery.isLoading) {
        return <CubeLoader />
    }

    if(getStuffQuery.isError){
        return 'error'
    }

    const stuffInformation = getStuffQuery.data.data.account
  return (
    <>
        <Box>
            <Typography
                sx={{
                    textTransform : 'capitalize',
                    color : colors.greenBlueAccent[500]
                }}
                variant='h3'
            >
                identity informations
            </Typography>

            <List>
                <ListItem>
                    <ListItemIcon>
                        <PermIdentityOutlined />
                    </ListItemIcon>
                    <ListItemText>
                        {stuffInformation.first_name} {stuffInformation.last_name}
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <CallOutlined />
                    </ListItemIcon>
                    <ListItemText>
                        {stuffInformation.phone}
                    </ListItemText>
                </ListItem>

                <ListItem>
                    <ListItemIcon>
                        <WorkOutlined />
                    </ListItemIcon>
                    <ListItemText>
                        {stuffInformation.role}
                    </ListItemText>
                </ListItem>
                {
                    stuffInformation.role === 'teacher' && stuffInformation.classRoom
                    && (
                        <ListItem>
                            <ListItemIcon>
                                <ClassOutlined />
                            </ListItemIcon>
                            <ListItemText>
                                {stuffInformation?.classRoom?.name}
                            </ListItemText>
                        </ListItem>
                    )
                }
            </List>
        </Box>
        {
            stuffInformation.role === 'teacher'
            ? (
                !stuffInformation.classRoom ? (
                    <Typography
                        sx={{
                            color : colors.yellowAccent[500],
                            fontSize : '25px',
                            textTransform : 'capitalize',
                            textAlign : 'center'
                        }}
                    > This Teacher Havent Class Yet </Typography>
                )
                : (
                    <ImageList variant="masonry" cols={3} gap={8}>
                            {stuffInformation.classRoom.children.map((item) => (
                            <ImageListItem 
                                key={item.image}
                                sx={{
                                    overflow : 'hidden',
                                    position : 'relative',
                                    borderRadius : '8px',
                                    boxShadow : '1px 1px 10px -2px #black',
                                    "&:hover .child-card-body" : {
                                        bottom : '0'
                                    },
                                    "&:hover > img" : {
                                        transform : 'rotate(1deg) scale(1.1)'
                                    }
                                }}
                                
                            >
                                <img
                                src={`http://192.168.1.19:9000${item.image}?w=248&fit=crop&auto=format`}
                                srcSet={`http://192.168.1.19:9000${item.image}?w=248&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.image}
                                loading="lazy"
                                style={{
                                    borderRadius : '6px 6px 0 0',
                                    transition : '0.3s'
                                }}
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
                                        {item.name}
                                    </Typography>
                                    {
                                        item.isExtra && (
                                            <Typography
                                                sx={{
                                                    color : colors.grey[200],
                                                    fontSize : '16px',
                                                    fontWeight : '300'
                                                }}
                                            >
                                                Extra
                                            </Typography>
                                        )
                                    }
                                </Box>
                            </ImageListItem>
                        ))}
                    </ImageList>
                )
                
            )
            : undefined
        }
    </>
  )
}

export default StuffInformation