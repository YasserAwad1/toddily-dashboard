import React from "react";
import { useNavigate, useParams } from "react-router";
import NetworkError from "./Errors/NetworkError";
import CubeLoader from "../components/CubeLoader/CubeLoader";
import { request } from "../api/request";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import GridBox from "../components/GridBox";
import GridItem from "../components/GridItem";
import { tokens } from "../assets/theme";
import ChildCard from "../layouts/ChildCard";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from '@mui/material/styles';
import { InfoOutlined } from "@mui/icons-material";

const StyledGridOverlay = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
  '& .ant-empty-img-1': {
    fill: theme.palette.mode === 'light' ? '#aeb8c2' : '#262626',
  },
  '& .ant-empty-img-2': {
    fill: theme.palette.mode === 'light' ? '#f5f5f7' : '#595959',
  },
  '& .ant-empty-img-3': {
    fill: theme.palette.mode === 'light' ? '#dce0e6' : '#434343',
  },
  '& .ant-empty-img-4': {
    fill: theme.palette.mode === 'light' ? '#fff' : '#1c1c1c',
  },
  '& .ant-empty-img-5': {
    fillOpacity: theme.palette.mode === 'light' ? '0.8' : '0.08',
    fill: theme.palette.mode === 'light' ? '#f5f5f5' : '#fff',
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        style={{ flexShrink: 0 }}
        width="100"
        height="100"
        viewBox="0 0 184 152"
        aria-hidden
        focusable="false"
      >
        <g fill="none" fillRule="evenodd">
          <g transform="translate(24 31.67)">
            <ellipse
              className="ant-empty-img-5"
              cx="67.797"
              cy="106.89"
              rx="67.797"
              ry="12.668"
            />
            <path
              className="ant-empty-img-1"
              d="M122.034 69.674L98.109 40.229c-1.148-1.386-2.826-2.225-4.593-2.225h-51.44c-1.766 0-3.444.839-4.592 2.225L13.56 69.674v15.383h108.475V69.674z"
            />
            <path
              className="ant-empty-img-2"
              d="M33.83 0h67.933a4 4 0 0 1 4 4v93.344a4 4 0 0 1-4 4H33.83a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4z"
            />
            <path
              className="ant-empty-img-3"
              d="M42.678 9.953h50.237a2 2 0 0 1 2 2V36.91a2 2 0 0 1-2 2H42.678a2 2 0 0 1-2-2V11.953a2 2 0 0 1 2-2zM42.94 49.767h49.713a2.262 2.262 0 1 1 0 4.524H42.94a2.262 2.262 0 0 1 0-4.524zM42.94 61.53h49.713a2.262 2.262 0 1 1 0 4.525H42.94a2.262 2.262 0 0 1 0-4.525zM121.813 105.032c-.775 3.071-3.497 5.36-6.735 5.36H20.515c-3.238 0-5.96-2.29-6.734-5.36a7.309 7.309 0 0 1-.222-1.79V69.675h26.318c2.907 0 5.25 2.448 5.25 5.42v.04c0 2.971 2.37 5.37 5.277 5.37h34.785c2.907 0 5.277-2.421 5.277-5.393V75.1c0-2.972 2.343-5.426 5.25-5.426h26.318v33.569c0 .617-.077 1.216-.221 1.789z"
            />
          </g>
          <path
            className="ant-empty-img-3"
            d="M149.121 33.292l-6.83 2.65a1 1 0 0 1-1.317-1.23l1.937-6.207c-2.589-2.944-4.109-6.534-4.109-10.408C138.802 8.102 148.92 0 161.402 0 173.881 0 184 8.102 184 18.097c0 9.995-10.118 18.097-22.599 18.097-4.528 0-8.744-1.066-12.28-2.902z"
          />
          <g className="ant-empty-img-4" transform="translate(149.65 15.383)">
            <ellipse cx="20.654" cy="3.167" rx="2.849" ry="2.815" />
            <path d="M5.698 5.63H0L2.898.704zM9.259.704h4.985V5.63H9.259z" />
          </g>
        </g>
      </svg>
      <Box sx={{ mt: 1 }}>No Rows</Box>
    </StyledGridOverlay>
  );
}

const getChildrens = () => {
  return request({
    url : '/children'
  })
}


const childrenColumn = [
  {
    field : 'id',
    headerName : 'ID',
    width : 50
  },
  {
    field : 'name',
    headerName : 'Name',
    width : 150
  },
]

const addChildCourseToServer = (values) => {
  return request({
    url : '/child-course',
    method : 'post',
    data : values
  })
}

const CourseInforamtion = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { courseID } = useParams();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [rowSelectionModel, setRowSelectionModel] = React.useState([]);

  const getCourse = () => {
    return request({ url: `/course/${courseID}` });
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addChildToCourseMutation = useMutation({
    mutationKey : ['add-child-course-ro-server'],
    mutationFn : addChildCourseToServer
  })

  const handleAddChildrens = () => {
    let data = {
      'child_ids' : rowSelectionModel,
      'course_id' : courseID
    }
    console.log(data)
    addChildToCourseMutation.mutate(data)
  }

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`get-course-${courseID}-details`],
    queryFn: getCourse,
  });

  const cheldrenQuery = useQuery({
    queryKey : ['get-childrens-from-server-for-class'],
    queryFn : getChildrens
  })
  if (isLoading || cheldrenQuery.isLoading) {
    return <CubeLoader />;
  }

  if (isError) {
    if (error.response.status === 401) {
      navigate("/auth/signin");
    } else if (error.message === "Network Error") {
      return <NetworkError />;
    } else {
      refetch();
    }
  }

  const course = data.data.course;
  const children = data.data.course.children;
  return (
    <>
    <Button
        sx={{
          marginBottom : '20px',
          padding : '8px 20px',
          marginLeft : '10px'
        }}
        color="secondary"
        variant="contained"
        onClick={handleClickOpen}
      >
        add childrens
      </Button>
      <List>
        <ListItem>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            course name : {course.name}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <InfoOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            children number : {course.children.length}
          </ListItemText>
        </ListItem>
      </List>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        
        <Typography
          sx={{
            width: "fit-contetn",
            textAlign: "center",
            color: colors.pinkAccent[500],
            fontSize: { xs: "28px", sm: "30px", md: "34px" },
            fontWeight: "500",
            position: "relative",
            "&::after": {
              content: "''",
              position: "absolute",
              width: "50px",
              height: "1px",
              backgroundImage: `linear-gradient(to right ,${colors.indigoAccent[800]} , ${colors.pinkAccent[500]})`,
              left: "-60px",
              top: "50%",
              transform: "translateY(-50%)",
            },
            "&::before": {
              content: "''",
              position: "absolute",
              width: "50px",
              height: "1px",
              backgroundImage: `linear-gradient(to right ,${colors.pinkAccent[500]} , ${colors.indigoAccent[800]})`,
              right: "-60px",
              top: "50%",
              transform: "translateY(-50%)",
            },
          }}
        >
          Students
        </Typography>
      </Box>
      <Box>
        <GridBox spacing={1}>
          {children.map((item) => {
            console.log(item)
            return (
              <GridItem key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ChildCard classRoomName={"child.classRoo"} child={item} />
              </GridItem>
            );
          })}
        </GridBox>
      </Box>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            select all child you want to add for this class then click add , or click cancel if you won't
          </DialogContentText>
          <Box
            sx={{
              height : '300px'
            }}
          >
          <DataGrid
            rows={cheldrenQuery.data.data.children}
            columns={childrenColumn}
            // isRowSelectable={(params) => params.row.quantity > 50000}
            rowSelection
            checkboxSelection
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setRowSelectionModel(newRowSelectionModel);
            }}
            rowSelectionModel={rowSelectionModel}
            initialState={{
              pagination: { paginationModel: { pageSize: 5 } },
            }}
            slots={{
              noRowsOverlay : CustomNoRowsOverlay
          }}
            pageSizeOptions={[5, 10, 25]}
          />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddChildrens}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CourseInforamtion;
