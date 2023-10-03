import { Grid } from '@mui/material'
import React from 'react'
import { useToddliyUIController } from '../context'

const GridBox = ({children , ...rest}) => {
  return (
    <Grid container {...rest}>
        {children}
    </Grid>
  )
}

export default GridBox