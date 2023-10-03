import { Box, useMediaQuery } from '@mui/material'
import React from 'react'

const Form = ({children}) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  return (
    <Box
      display="grid"
      gap="30px"
      gridTemplateColumns="repeat(4, minmax(0, 1fr))"
      sx={{
        "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
      }}
    >
      {children}
    </Box>
  )
}

export default Form