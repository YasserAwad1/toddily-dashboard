import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router";
import { tokens } from "../assets/theme";
import {
  InfoOutlined,
  NumbersOutlined,
  Phone,
  VerifiedUserOutlined,
} from "@mui/icons-material";
import GridBox from "../components/GridBox";
import GridItem from "../components/GridItem";
import ChildCard from "../layouts/ChildCard";
import { useQuery } from "@tanstack/react-query";
import { request } from "../api/request";
import CubeLoader from "../components/CubeLoader/CubeLoader";
import NetworkError from "./Errors/NetworkError";
import { GetErrorHandler } from "../helper/GetErrorHandlerHelper";

const ShowParentInformation = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { parentID } = useParams();
  const getParent = () => {
    return request({ url: `/accounts/${parentID}` });
  };

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: [`get-parent-${parentID}-details`],
    queryFn: getParent,
  });
  
  if (isLoading) {
    return <CubeLoader />;
  }

  if (isError) {
    <GetErrorHandler error={error} refetch={refetch} />
  }

  const parent = data?.data.account
  const children = data?.data.account.children;




  return (
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
            Firstname : {parent.first_name}
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
            lastname : {parent.last_name}
          </ListItemText>
        </ListItem>
        <ListItem>
          <ListItemIcon>
            <VerifiedUserOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            Username : {parent.username}
          </ListItemText>
        </ListItem>
        {/* <ListItem>
          <ListItemIcon>
            <NumbersOutlined />
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            Children count : {children.length}
          </ListItemText>
        </ListItem> */}
        <ListItem>
          <ListItemIcon>
            <Phone />
          </ListItemIcon>
          <ListItemText
            sx={{
              textTransform: "capitalize",
            }}
          >
            phone number : {parent.phone}
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
          Childrens
        </Typography>
      </Box>
      <Box>
        <GridBox spacing={1}>
          {children?.map((item) => {
            return (
              <GridItem key={item.id} xs={12} sm={6} md={4} lg={3}>
                <ChildCard classRoomName={item?.class_room?.name} child={item} />
              </GridItem>
            );
          })}
        </GridBox>
      </Box>
    </Box>
  );
};

export default ShowParentInformation;
