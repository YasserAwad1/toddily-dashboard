import React from 'react'
import Page from '../layouts/Page'
import * as Yup from 'yup'
import { useQuery } from '@tanstack/react-query'
import { request } from '../api/request'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import { useNavigate } from 'react-router'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'
import { Grid, List, ListItem, ListItemText, Typography, useTheme } from '@mui/material'
import { tokens } from '../assets/theme'

const validationSchema = Yup.object({
  name : Yup.string().required('class name field is required'),
  age_section_id : Yup.string().required('age section field is required'),
  teacher_id : Yup.string().required('teacher name field is required'),
})




const getClassesFromServer = () => {
  return request({
    url : '/classroom',
    method : 'get'
  })
}

const getTeachersFromServer = () => {
  return request({
    url : '/accounts?type=stuff',
    method : 'get'
  })
}

const getAgeSectionFromServer = () => {
  return request({
    url : '/age-section',
    method : 'get'
  })
}

const orginizeData = (values) => {
  const newValues = values.map(valuesObject => (
    {
      name : valuesObject.first_name + ' ' +valuesObject.last_name,
      value : valuesObject.id
    }
  ))

  return newValues
}


const OrgnizeAgeSectionData = (values) => {
  const newValues = values.map(valueObject => ({
    name : 'from ' +  valueObject.from + ' to ' + valueObject.to,
    value : valueObject.id
  })) 

  return newValues
}

const Classes = () => {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const {isLoading , isError , error , data , refetch} = useQuery({
    queryKey : ['get-classes-from-server'],
    queryFn : getClassesFromServer
  })

  const teachersQuery = useQuery({
    queryKey : ['get-teachers-for-classes'],
    queryFn : getTeachersFromServer
  })

  const ageSectionQuery = useQuery({
    queryKey : ['get-age-section-for-classes'],
    queryFn : getAgeSectionFromServer
  })
  
  if(isLoading || teachersQuery.isLoading || ageSectionQuery.isLoading){
    return <CubeLoader />
  }

  if(isError){
    return <GetErrorHandler error={error} refetch={refetch} />
  }
  if(teachersQuery.isError){
    return <GetErrorHandler error={teachersQuery.error} refetch={teachersQuery.refetch} />
  }
  if(ageSectionQuery.isError){
    return <GetErrorHandler error={ageSectionQuery.error} refetch={ageSectionQuery.refetch} />
  }
  
  const teachers = teachersQuery.data.data.data.filter((obj) => {
    return obj.role === 'teacher'  
  })

  const ageSection = ageSectionQuery.data.data.data

  const classColumns = [
    {
        field : 'id',
        headerName : 'ID',
        width : 50
    },
    {
        field : 'name',
        headerName : 'Class Name',
        flex : 1,
        minWidth : 150,
        editable : true
        // flex : 1
    },
    {
        field : 'age_section',
        headerName : 'Age Section',
        minWidth : 150,
        flex : 1,
        valueGetter : (params) => {
          return params.row.age_section
        },
        valueFormatter : (params) => {
          return 'from : ' + params.value.from + ' to : ' + params.value.to
        },
    },
    {
        field : 'teacher_id',
        headerName : 'Teacher ID',
        flex : 1,
        minWidth : 150,
        type : 'singleSelect',
        valueOptions : () => {
          return teachers.map(obj => obj.id)
        },
        
        editable : true
    }
  ]

  return (
    <>
    <Page 
      name={'class'} 
      data={data.data} 
      columns={classColumns}
      link={{
        path : 'classroom'
      }}
      formInputs={[
        {
          name : 'name',
          lable : 'Class Name',
          type : 'text',
          initialValues : '',
          fullWidth : true
        },
        {
          name : 'teacher_id',
          lable : 'Teacher',
          type : 'select',
          initialValues : '',
          fullWidth : true,
          valueOptions : orginizeData(teachers)
        },
        {
          name : 'age_section_id',
          lable : 'Age Section',
          type : 'select',
          initialValues : '',
          fullWidth : true,
          valueOptions : OrgnizeAgeSectionData(ageSection)
        },
      ]}
      initialValues={{
        name : '',
        teacher_id : '',
        age_section_id : '',
      }}
      validationSchema={validationSchema}
      valuesShouldUpdate={['name' , 'teacher_id']}
      updateAPI={'/classroom'}
      refetch={refetch}
    />
    <Grid container sx={{
      marginTop : '10px'
    }}>
      {
        teachers.length > 0
        ? (
          <Grid item xs={12}>
            <Typography
              sx={{
                textAlign : 'center',
                fontSize  : '30px',
                color : colors.yellowAccent[500],
                textTransform : 'capitalize'
              }}
            >
              available teachers
            </Typography>
            <List>
              {
                teachers.map(teacher => (
                  <ListItem key={teacher.id}>
                    <ListItemText
                      sx={{
                        textAlign : 'center'
                      }}
                    >
                      {`${teacher.id} - ${teacher.first_name} ${teacher.last_name}`}
                    </ListItemText>
                  </ListItem>
                ))
              }
            </List>
          </Grid>
        )
        : undefined
      }
      
    </Grid>
    </>
  )
}

export default Classes