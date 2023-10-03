import { DateRangeOutlined, InfoOutlined, Person } from "@mui/icons-material";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { tokens } from "../assets/theme";
import GridBox from "../components/GridBox";
import GridItem from "../components/GridItem";
import ChildCard from "../layouts/ChildCard";
import { request } from "../api/request";
import { useQuery } from "@tanstack/react-query";
import CubeLoader from "../components/CubeLoader/CubeLoader";
import { GetErrorHandler } from "../helper/GetErrorHandlerHelper";




const ClassInformation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { classID } = useParams();
  const getChildrenClasses = () => {
    return request({ url: `/classroom/${classID}` });
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["get-classRoom-details"],
    queryFn: getChildrenClasses,
  });

  

  if (isLoading) {
    return <CubeLoader />;
  }

  if (isError) {
    return <GetErrorHandler error={error} refetch={refetch} />
  }
  const classRoom = data.data.class;
  const teacher = data.data.class.teacher;
  const ageSection = classRoom.age_section;
  const children = data.data.class.children;
  return (
    <>
    <Box>
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
            class name : {classRoom.name}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <DateRangeOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            age section : from {ageSection.from} to {ageSection.to}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            teacher : {teacher.first_name} {teacher.last_name}
            {/* <Link
              to={`/stuffs/${teacher.id}`}
              style={{ color: colors.yellowAccent[500] }}
            >
              {" "}
              more...
            </Link> */}
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
            return (
              <GridItem key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ChildCard classRoomName={classRoom.name} child={item} />
              </GridItem>
            );
          })}
        </GridBox>
      </Box>
    </Box>
    
    </>
  );
};

export default ClassInformation;
