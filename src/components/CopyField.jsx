import { CopyAllOutlined, DoneAllOutlined } from '@mui/icons-material'
import { Box, IconButton, Typography, useTheme } from '@mui/material'
import {motion} from 'framer-motion'
import React, { useRef } from 'react'
import { useState } from 'react'
import { tokens } from '../assets/theme'
import CopyToClipboard from 'react-copy-to-clipboard'

const CopyField = ({password}) => {
    const myThheme = useTheme()
    const colors = tokens(myThheme.palette.mode)
    const [passwordCopyed , setPassowrdCopyed] = useState(false)
    const passwordRef = useRef(null)
    const copyPassword = async() => {

        try {
          await navigator.clipboard.writeText(passwordRef.current.innerText)
          setPassowrdCopyed(true)
        } catch (e) {
          console.log(e)
        }
      
      }
  return (
    <>
        <Box
            sx={{
                display : 'flex',
                alignItems : 'center',
                justifyContent : 'space-between',
                borderRadius : '8px',
                border : '1px solid #888',
                borderLeft : `5px solid ${colors.greenAccent[700]}`,
                backgroundColor : '#020b35',
                padding : '4px 8px',
                marginBottom : '5px',
                gap : '10px',
                overflowX : 'hidden'
            }}
        >
            <Typography
                color={'white'}
                sx={{
                    wordBreak : 'break-all'
                }}
                ref={passwordRef}
            >
                {password}
            </Typography>
            <CopyToClipboard
                onCopy={() => setPassowrdCopyed(true)}
                text={password}
            >
                <IconButton
                    // onClick={copyPassword }
                    color='success'
                >
                    <CopyAllOutlined sx={{color :'white'}}  />
                </IconButton>
            </CopyToClipboard>
        </Box>
        {
            passwordCopyed && (
                <motion.div
                    style={{
                        position : 'relative',
                    }}
                    initial={{
                        left : '-100%',
                        opacity : '0'
                    }}
                    animate={{
                        left : '0',
                        opacity : '1'
                    }}
                    transition={{
                        type : 'spring',
                        stiffness : 250
                    }}
                >
                    <Box
                        sx={{
                            display : 'flex',
                            alignItems : 'center',
                            justifyContent : 'center',
                            gap : '5px',
                            overflowX : 'hidden'
                        }}
                    >
                        <Typography
                            sx={{
                                color : colors.primary[100],
                                fontSize : '14px',
                                overflow : 'hidden'
                            }}
                        >
                            Copied
                        </Typography>
                        <DoneAllOutlined 
                            sx={{
                                color : colors.greenAccent[600],
                            }}
                        />
                    </Box>
                </motion.div>
            )
        }
    </>
  )
}

export default CopyField

