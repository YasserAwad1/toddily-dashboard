import { InfoOutlined } from "@mui/icons-material"
import { Box, Button, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material"
import { Navigate } from "react-router"

export const GetErrorHandler = ({error , refetch}) => {
    if(error.response){
        if(error.response.status === 401){
          return Navigate({
            to : '/auth/signin'
          })
        }else if(error.response.status === 401) {
            <Box
            sx={{
              width : '100%',
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'center',
              flexDirection : 'column'
            }}
          >
            <Typography
              sx={{
                textTransform : 'capitalize',
                fontSize : '17px',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px'
              }}
            >
              there are some problems in server
            </Typography>
            <Typography
              sx={{
                textTransform : 'capitalize',
                fontSize : '17px',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px'
              }}
            >
              contact support to solve this problem
            </Typography>
            <Typography
              sx={{
                textTransform : 'capitalize',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px',
                fontWeight : 'bold'
              }}
  
              variant='h5'
            >
              server response with 500 status code
            </Typography>
          </Box>
        }else {
          return <Box
            sx={{
              width : '100%',
              display : 'flex',
              alignItems : 'center',
              justifyContent : 'center',
              flexDirection : 'column'
            }}
          >
            <Typography
              sx={{
                textTransform : 'capitalize',
                fontSize : '17px',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px'
              }}
            >
              error happened while you send request for server
            </Typography>
            <Typography
              sx={{
                textTransform : 'capitalize',
                fontSize : '17px',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px'
              }}
            >
              server response with error code : {error.response.status}
            </Typography>
            <Typography
              sx={{
                textTransform : 'capitalize',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px',
                fontWeight : 'bold'
              }}
  
              variant='h5'
            >
              some advice to solve the problem : 
            </Typography>
            <List>
              <ListItem>
                <ListItemIcon>
                  <InfoOutlined />
                </ListItemIcon>
                <ListItemText>
                  check you'r interent connection , sometimes slow internet cuse this problem
                </ListItemText>
              </ListItem>
  
              <ListItem>
                <ListItemIcon>
                  <InfoOutlined />
                </ListItemIcon>
                <ListItemText>
                  turn off your proxy , sometimes desipare behind the proxy cuse for this problem
                </ListItemText>
              </ListItem>
            </List>
            <Button
              onClick={() => refetch()}
              sx={{
                textTransform : 'capitalize'
              }}
  
              variant='contained'
            >
              Try again
            </Button>
          </Box>
        }
      }else if(error.request){
        return <Box
          sx={{
            width : '100%',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            flexDirection : 'column'
          }}
        >
          <Typography
            sx={{
              textTransform : 'capitalize',
                fontSize : '17px',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px'
            }}
          >
            server response with nothing , please call support to solve this problem
          </Typography>
          <Typography
              sx={{
                textTransform : 'capitalize',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px',
                fontWeight : 'bold'
              }}
  
              variant='h5'
            >
              some reasons for this problem : 
            </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                slow internet connection
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                using bad proxy
              </ListItemText>
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <InfoOutlined />
              </ListItemIcon>
              <ListItemText>
                problems in server
              </ListItemText>
            </ListItem>
          </List>
          <Button
              onClick={() => refetch()}
              sx={{
                textTransform : 'capitalize'
              }}
  
              variant='contained'
            >
              Try again
            </Button>
        </Box>
      }else {
        return <Box
          sx={{
            width : '100%',
            display : 'flex',
            alignItems : 'center',
            justifyContent : 'center',
            flexDirection : 'column'
          }}
        >
          <Typography
            sx={{
              textTransform : 'capitalize',
                fontSize : '17px',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px'
            }}
          >
            unknown problem happend while we working in your request
          </Typography>
          <Typography
              sx={{
                textTransform : 'capitalize',
                color : 'gray',
                padding : '4px',
                marginBottom : '10px',
                fontWeight : 'bold'
              }}
  
              variant='h5'
            >
              error message : {error.message}
            </Typography>
          <Button
              onClick={() => refetch()}
              sx={{
                textTransform : 'capitalize'
              }}
  
              variant='contained'
            >
              Try again
            </Button>
        </Box>
      }
}