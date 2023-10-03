import React from 'react'
import Page from '../layouts/Page'
import { Box } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import { useNavigate } from 'react-router'
import { baseURLImage, request } from '../api/request'
import * as Yup from 'yup'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'

const cloumns = [
  {
    field : 'id',
    headerName : 'ID',
    width : 50
  },
    {
        field : 'name',
        headerName : 'Name',
        editable : true,
        minWidth : 120,
        flex : 1
    },
    {
        field : 'image',
        headerName : 'Image',
        headerAlign : 'center',
        minWidth : 120,
        flex : 1,
        align : 'center',
        renderCell : (params) => {
            return <a href={`${baseURLImage}${params.row.image}`} target='_blanck'><Box
                sx={{
                    width : '50px',
                    height : '50px',
                    borderRadius : '50%',
                    backgroundImage : `url(${baseURLImage}${params.row.image})`,
                    backgroundRepeat : 'no-repeat',
                    backgroundSize : 'cover',
                    backgroundPosition : 'center'
                }}
            >

            </Box>
            </a>
        }
    },
    {
        field : 'isExtra',
        type : 'boolean',
        editable : true,
        headerName : 'Is Extra',
        minWidth : 120,
        flex : 1
    },
    {
      field : 'sex',
      headerName : 'Gender',    
      type : 'singleSelect',
      valueOptions : ['male' , 'female'],
      minWidth : 120,
      flex : 1,
      editable : true
    },
]

const getChildrensFromServer = () => {
    return request({
        url : '/children'
    })
}

const getParentsFromServer = () => {
  return request({
      url : '/accounts?type=parent',
      method : 'get'
  })
}

const getClassesFromServer = () => {
  return request({
    url : '/classroom',
    method : 'get'
  })
}


const validationSchema = Yup.object({
  name : Yup.string().required('name field is requied'),
  image : Yup.string().required('image field is requied'),
  isExtra : Yup.boolean().required('is extra field is required'),
  sex : Yup.string().required('gender field is required'),
  parent_id : Yup.string().required('parent is a required field'),
  classRoom_id : Yup.string().required('class room is a required field')
})


const orginizeParentsData = (data) => {
  return data.map(obj => ({name : obj.id + ' - ' + obj.first_name + ' ' + obj.last_name , value : obj.id}))
}

const orginizeClassesData = (data) => {
  return data.map(obj => ({name : obj.name , value : obj.id}))
}


const Childrens = () => {
  const childrensQuery = useQuery({
      queryKey : ['get-childrens-from-server'],
      queryFn : getChildrensFromServer
  })

  const parentsQuery = useQuery({
    queryKey : ['get-parents-from-server-for-childrens'],
    queryFn : getParentsFromServer
  })

  const classesQuery = useQuery({
    queryKey : ['get-classes-from-server-for-childrens'],
    queryFn : getClassesFromServer
  })

  if(childrensQuery.isLoading || parentsQuery.isLoading || classesQuery.isLoading){
      return <CubeLoader />
    }
  
  if(childrensQuery.isError){
    return <GetErrorHandler error={childrensQuery.error} refetch={childrensQuery.refetch} />
  }
  if(parentsQuery.isError){
    return <GetErrorHandler error={parentsQuery.error} refetch={parentsQuery.refetch} />
  }
  if(classesQuery.isError){
    return <GetErrorHandler error={classesQuery.error} refetch={classesQuery.refetch} />
  }

  const parentsSelectOptions = orginizeParentsData(parentsQuery.data.data.data)
  const classesSelectOptions = orginizeClassesData(classesQuery.data.data)
  return (
    <Page 
    name={'childrens'} 
    data={childrensQuery.data.data.children} 
    columns={cloumns}
    link={{
      path : 'children'
    }}
    formInputs={[
      {
        name : 'name',
        lable : 'First Name',
        type : 'text',
        initialValues : '',
        fullWidth : true
      },
      {
        name : 'image',
        lable : 'Image',
        type : 'file',
        fullWidth : true
      },
      {
        name : 'parent_id',
        lable : 'Parent',
        type : 'select',
        fullWidth : true,
        valueOptions : parentsSelectOptions
      },
      {
        name : 'sex',
        lable : 'Gender',
        type : 'select',
        fullWidth : true,
        valueOptions : [
          {name : 'male' , value : 'male'},
          {name : 'female' , value : 'female'},
        ]
      },
      {
        name : 'isExtra',
        lable : 'Is Extra',
        type : 'select',
        fullWidth : true,
        valueOptions : [
          {name : 'normal' , value : 0},
          {name : 'extra' , value : 1},
        ]
      },
      {
        name : 'classRoom_id',
        lable : 'Class',
        type : 'select',
        fullWidth : true,
        valueOptions : classesSelectOptions
      },
      
    ]}
      initialValues={{
        name : '',
        image : '',
        isExtra : 0,
        sex : 'male',
        parent_id : '',
        classRoom_id : classesSelectOptions.length > 0  ? 1 : '' 
      }}
        validationSchema={validationSchema}
        valuesShouldUpdate={['name' , 'isExtra' , 'sex']}
        updateAPI={'/children'}
        refetch={childrensQuery.refetch}
    />
  )
}

export default Childrens