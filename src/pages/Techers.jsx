import React from 'react'
import Page from '../layouts/Page'
import * as Yup from 'yup'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { request } from '../api/request'
import CubeLoader from '../components/CubeLoader/CubeLoader'
import { GetErrorHandler } from '../helper/GetErrorHandlerHelper'


const techersColumns = [
  {
      field : 'id',
      headerName : 'ID',
      width : 50,
      hide : true
  },
  {
      field : 'first_name',
      headerName : 'First Name',
      flex : 1,
      minWidth : 150,
      editable : true
      // flex : 1
  },
  {
      field : 'last_name',
      headerName : 'Last Name',
      flex : 1,
      minWidth : 150,
      editable : true
      // flex : 1
  },
  {
    field : 'username',
    headerName : 'Username',
    flex : 1,
    minWidth : 150,
    // flex : 1
},
  {
      field : 'phone',
      headerName : 'Phone Number',
      editable : true,
      flex : 1,
      minWidth : 150,
  },
  {
      field : 'role',
      headerName : 'Role',
      flex : 1,
      minWidth : 150,
  }
]


const validationSchema = Yup.object({
  first_name : Yup.string().required('first name field is required'),
  last_name : Yup.string().required('last name field is required'),
  role_name : Yup.string().required('age field is required'),
  phone : Yup.string().min(10).max(10).required('phone number field is required'),
})

const getTeachersFromServer = () => {
  return request({
    url : '/accounts?type=stuff',
    method : 'get'
  })
}

const Techers = () => {
  const {isLoading , isError , error , data , refetch} = useQuery({
    queryKey : ['get-teachers-from-server'],
    queryFn : getTeachersFromServer
  })

  if(isLoading){
      return <CubeLoader />
    }
    
    if(isError){
      return <GetErrorHandler error={error} refetch={refetch} />
    }
  return (
    <Page 
      name={'staff'} 
      data={data.data.data} 
      columns={techersColumns}
      link={{
        path : 'accounts'
      }}
      formInputs={[
        {
          name : 'first_name',
          lable : 'First Name',
          type : 'text',
          initialValues : '',
          fullWidth : true
        },
        {
          name : 'last_name',
          lable : 'Last Name',
          type : 'text',
          initialValues : '',
          fullWidth : true
        },
        {
          name : 'phone',
          lable : 'Phone',
          type : 'text',
          initialValues : '',
          fullWidth : true
        },
        {
          name : 'role_name',
          lable : 'Role',
          type : 'select',
          initialValues : 'teacher',
          fullWidth : true,
          valueOptions : [
            {name : 'teacher' , value : 'teacher'},
            {name : 'admin' , value : 'admin'},
            {name : 'doctor' , value : 'doctor'},
            {name : 'social' , value : 'social'},
            {name : 'extra' , value : 'extra'},
          ]
        },
      ]}
      initialValues={{
        first_name : '',
        last_name : '',
        phone : '',
        role_name : 'teacher'
      }}
      validationSchema={validationSchema}
      valuesShouldUpdate={['first_name' , 'last_name' , 'phone']}
      updateAPI={'/accounts'}
      refetch={refetch}
    />
  )
}

export default Techers