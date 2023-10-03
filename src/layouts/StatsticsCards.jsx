import { Box, Typography } from '@mui/material'
import React from 'react'
import GridBox from '../components/GridBox'
import GridItem from '../components/GridItem'
import { useTheme } from '@mui/material'
import { tokens } from '../assets/theme'
import { ClassOutlined, Person2Outlined } from '@mui/icons-material'

const StatsticsCards = ({statstics}) => {
    const theme = useTheme()
    const colors = tokens(theme.palette.mode)
  return (
    <Box>
        <GridBox spacing={4}>
            <GridItem xs={12} sm={6} md={3}>
                <Box
                    sx={{
                        width : '100%',
                        padding : '10px 12px',
                        borderRadius : '12px',
                        // backgroundImage : `linear-gradient( 90deg,${colors.primary[500]} ,${colors.yellowAccent[500]})`,
                        display : 'flex',
                        backgroundColor : colors.tealAccent[500],
                        alignItems : 'center',
                        justifyContent : 'space-between',
                        // boxShadow : `0px 0px 15px -6px ${colors.yellowAccent[500]}`
                        // borderRight : `2px solid ${colors.yellowAccent[500]}`,
                        // borderLeft : `2px solid ${colors.yellowAccent[500]}`
                        boxShadow : `5px 5px 15px -6px ${colors.tealAccent[500]}`
                    }}
                >
                <Box>
                  <Typography
                    sx={{
                      fontSize : '18px',
                      color : colors.primary[100],
                      textTransform : 'capitalize',
                      marginBottom : '6px',
                    }}
                  >
                    students
                  </Typography>
                  <Typography
                    sx={{
                      color : colors.primary[100],
                      fontWeight : '700',
                      fontSize : '20px',
                    }}
                  >
                    {statstics?.kids_number}
                  </Typography>
                </Box>
                <Box>
                  <Person2Outlined 
                    sx={{
                      color : colors.primary[100],
                      fontWeight : 'bold',
                      fontSize : '25px'
                    }}
                  />
                </Box>
              </Box>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
            <Box
                    sx={{
                        width : '100%',
                        padding : '10px 12px',
                        borderRadius : '12px',
                        // backgroundImage : `linear-gradient( 90deg,${colors.yellowAccent[500]} ,${colors.primary[500]})`,
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'space-between',
                        backgroundColor : colors.yellowAccent[500],
                        // borderRight : `2px solid ${colors.yellowAccent[500]}`,
                        // borderLeft : `2px solid ${colors.yellowAccent[500]}`
                        boxShadow : `5px 5px 15px -6px ${colors.yellowAccent[500]}`
                    }}
                >
                <Box>
                  <Typography
                    sx={{
                      fontSize : '18px',
                      color : colors.primary[100],
                      textTransform : 'capitalize',
                      marginBottom : '6px',
                    }}
                  >
                    Teachers
                  </Typography>
                  <Typography
                    sx={{
                      color : colors.primary[100],
                      fontWeight : '700',
                      fontSize : '20px',
                    }}
                  >
                    {statstics?.teachers_number}
                  </Typography>
                </Box>
                <Box>
                  <Person2Outlined 
                    sx={{
                      color : colors.primary[100],
                      fontWeight : 'bold',
                      fontSize : '25px'
                    }}
                  />
                </Box>
              </Box>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
            <Box
                    sx={{
                        width : '100%',
                        padding : '10px 12px',
                        borderRadius : '12px',
                        // backgroundImage : `linear-gradient( 90deg,${colors.primary[500]} ,${colors.yellowAccent[500]})`,
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'space-between',
                        backgroundColor : colors.lightGreenAccent[500],
                        // borderRight : `2px solid ${colors.yellowAccent[500]}`,
                        // borderLeft : `2px solid ${colors.yellowAccent[500]}`
                        boxShadow : `5px 5px 15px -6px ${colors.lightGreenAccent[500]}`
                    }}
                >
                <Box>
                  <Typography
                    sx={{
                      fontSize : '18px',
                      color : colors.primary[100],
                      textTransform : 'capitalize',
                      marginBottom : '6px',
                    }}
                  >
                    Parents
                  </Typography>
                  <Typography
                    sx={{
                      color : colors.primary[100],
                      fontWeight : '700',
                      fontSize : '20px',
                    }}
                  >
                    {statstics?.parents_number}
                  </Typography>
                </Box>
                <Box>
                  <Person2Outlined 
                    sx={{
                      color : colors.primary[100],
                      fontWeight : 'bold',
                      fontSize : '25px'
                    }}
                  />
                </Box>
              </Box>
            </GridItem>
            <GridItem xs={12} sm={6} md={3}>
            <Box
                    sx={{
                        width : '100%',
                        padding : '10px 12px',
                        borderRadius : '12px',
                        // backgroundImage : `linear-gradient( 90deg,${colors.yellowAccent[500]} ,${colors.primary[500]})`,
                        display : 'flex',
                        alignItems : 'center',
                        justifyContent : 'space-between',
                        backgroundColor : colors.pinkAccent[500],
                        // borderRight : `2px solid ${colors.yellowAccent[500]}`,
                        // borderLeft : `2px solid ${colors.yellowAccent[500]}`
                        boxShadow : `5px 5px 15px -6px ${colors.pinkAccent[500]}`
                    }}
                >
                <Box>
                  <Typography
                    sx={{
                      fontSize : '18px',
                      color : colors.primary[100],
                      textTransform : 'capitalize',
                      marginBottom : '6px',
                    }}
                  >
                    classes
                  </Typography>
                  <Typography
                    sx={{
                      color : colors.primary[100],
                      fontWeight : '700',
                      fontSize : '20px',
                    }}
                  >
                    {statstics?.classes_number}
                  </Typography>
                </Box>
                <Box>
                  <ClassOutlined 
                    sx={{
                      color : colors.primary[100],
                      fontWeight : 'bold',
                      fontSize : '25px'
                    }}
                  />
                </Box>
              </Box>
            </GridItem>
        </GridBox>
    </Box>
  )
}

export default StatsticsCards