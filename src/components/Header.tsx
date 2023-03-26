import { Person, Settings, Logout } from "@mui/icons-material";
import { Box, AppBar, Toolbar, Typography, Tooltip, IconButton, Avatar, Menu, MenuItem, ListItemIcon } from "@mui/material";
import Link from "next/link";
import { useState } from "react";

export default function Header() {

    const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography sx={{ flexGrow: 1, fontWeight: 'bold' }} variant="h5">travelbud</Typography>
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                            <Avatar >N</Avatar>
                        </IconButton>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        <MenuItem key="Profile">
                            <ListItemIcon>
                                <Person fontSize="small" />
                            </ListItemIcon>
                            <Typography textAlign="center">Profile</Typography>
                        </MenuItem>
                        <MenuItem key="Settings">
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <Typography textAlign="center">Settings</Typography>
                        </MenuItem>
                        <Link href='/api/auth/logout' color="inherit">
                            <MenuItem>
                                <ListItemIcon>
                                    <Logout fontSize="small" />
                                </ListItemIcon>
                                <Typography textAlign="center">Logout</Typography>
                            </MenuItem>
                        </Link>
                    </Menu>
                </Toolbar>
            </AppBar>
        </Box>
    )
}

