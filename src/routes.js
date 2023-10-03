import { AddOutlined, DashboardOutlined, ListOutlined, PersonOutlined } from "@mui/icons-material";

export const routes = [
    {
        id : 1,
        path : '/',
        name : 'Dashboard',
        icon : <DashboardOutlined />,
        isSubMenu : false,
    },
    {
        id : 2,
        name : 'Parents',
        isSubMenu : true,
        icon : <PersonOutlined />,
        nestedLink : [
            {
                id : 1,
                path : '/parents',
                name : 'Parents',
                icon : <ListOutlined />,
                isSubMenu : false
            },
            {
                id : 2,
                path : '/parents/create',
                name : 'Add Parent',
                icon : <AddOutlined />,
                isSubMenu : false
            },
        ]
    }
]