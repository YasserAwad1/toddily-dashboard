import { Grid } from '@mui/material'
import React from 'react'

const GridItem = ({children , ...rest}) => {
  return (
    <Grid item {...rest}>
        {children}
    </Grid>
  )
}

export default GridItem