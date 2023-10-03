import { CheckOutlined, ClassOutlined, DateRangeOutlined, InfoOutlined, More, Phone } from '@mui/icons-material'
import { Box, List, ListItem, ListItemIcon, ListItemText, Typography, useTheme } from '@mui/material'
import React from 'react'
import { useLocation, useParams } from 'react-router'
import { tokens } from '../assets/theme'
import GridBox from '../components/GridBox'
import GridItem from '../components/GridItem'
import ChildCard from '../layouts/ChildCard'

const TeacherInformation = () => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
    const {state : {teacher}} = useLocation()
    const {teacherID} = useParams()
    if(!teacher){
        console.log('react query wil get teacher information from server')
    }else{
        console.log('teacher information based in link for this component')
    }
  return (
    <Box>
        <List>
            <ListItem>
                <ListItemIcon>
                    <InfoOutlined />
                </ListItemIcon>
                <ListItemText
                    sx={{
                        textTransform : 'capitalize'
                    }}
                >
                    Firstname : jawad
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <InfoOutlined />
                </ListItemIcon>
                <ListItemText
                    sx={{
                        textTransform : 'capitalize'
                    }}
                >
                    lastname : taki aldeen
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <DateRangeOutlined />
                </ListItemIcon>
                <ListItemText
                    sx={{
                        textTransform : 'capitalize'
                    }}
                >
                    age : 25
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <More />
                </ListItemIcon>
                <ListItemText
                    sx={{
                        textTransform : 'capitalize'
                    }}
                >
                    is extra : No
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <Phone />
                </ListItemIcon>
                <ListItemText
                    sx={{
                    textTransform : 'capitalize'
                    }}
                >
                    phone number : 0948966979
                </ListItemText>
            </ListItem>
            <ListItem>
                <ListItemIcon>
                    <ClassOutlined />
                </ListItemIcon>
                <ListItemText
                    sx={{
                    textTransform : 'capitalize'
                    }}
                >
                    class name : KJ2
                </ListItemText>
            </ListItem>
      </List>
      <Box
        sx={{
          display : 'flex',
          alignItems : 'center',
          justifyContent : 'center',
          marginBottom : '20px'
        }}
      >
        <Typography
          sx={{
            width : 'fit-contetn',
            textAlign : 'center',
            color : colors.pinkAccent[500],
            fontSize : {xs : '28px' , sm : '30px' , md : '34px'},
            fontWeight : '500',
            position : 'relative',
            "&::after" : {
              content : "''",
              position : 'absolute',
              width : '50px',
              height : '1px',
              backgroundImage : `linear-gradient(to right ,${colors.indigoAccent[800]} , ${colors.pinkAccent[500]})`,
              left : '-60px',
              top : '50%',
              transform : 'translateY(-50%)',
            },
            "&::before" : {
              content : "''",
              position : 'absolute',
              width : '50px',
              height : '1px',
              backgroundImage : `linear-gradient(to right ,${colors.pinkAccent[500]} , ${colors.indigoAccent[800]})`,
              right : '-60px',
              top : '50%',
              transform : 'translateY(-50%)',
            },
          }}
        >
          Students
        </Typography>
      </Box>
      <Box>
        <GridBox
            spacing={1}
        >
            <GridItem
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <ChildCard />
            </GridItem>
            <GridItem
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <ChildCard />
            </GridItem>
            <GridItem
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <ChildCard />
            </GridItem>
            <GridItem
                xs={12}
                sm={6}
                md={4}
                lg={3}
            >
                <ChildCard />
            </GridItem>
        </GridBox>
      </Box>
    </Box>
  )
}

export default TeacherInformation