import { Box, Button, TextField, useMediaQuery } from "@mui/material"
import { Formik } from "formik"
import * as Yup from 'yup'

const CreateNewParent = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const handleFormSubmit = (values) => {
    console.log(values)
  }
  return (
    <Box
      width={'80%'}
      margin={'50px auto'}
    >
      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={validationSchema}
      >
        {
          (
            {
              values,
              errors,
              touched,
              handleBlur,
              handleChange,
              handleSubmit,
            }
          ) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="First Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.first_name}
                    name="first_name"
                    error={!!touched.first_name && !!errors.first_name}
                    helperText={touched.first_name && errors.first_name}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Last Name"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.last_name}
                    name="last_name"
                    error={!!touched.last_name && !!errors.last_name}
                    helperText={touched.last_name && errors.last_name}
                    sx={{ gridColumn: "span 4" }}
                />
                <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Phone Number"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.phone}
                    name="phone"
                    error={!!touched.phone && !!errors.phone}
                    helperText={touched.phone && errors.phone}
                    sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained">
                  add
                </Button>
              </Box>
            </form>
          )
        }
      </Formik>

    </Box>
  )
}

const validationSchema = Yup.object({
  first_name :  Yup.string().required('first name field is required'),
  last_name :  Yup.string().required('last name field is required'),
  phone : Yup.string().required('phone number field is required')
})

const initialValues = {
  first_name : '',
  last_name : '',
  phone : '',
}

export default CreateNewParent