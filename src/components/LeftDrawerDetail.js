import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DataUsageIcon from '@material-ui/icons/DataUsage';
import Graphs from "./Graphs";
import {useHistory} from "react-router-dom";
import MyTable from "./MyTable";
import Paper from "@material-ui/core/Paper";
import GridListTile from "@material-ui/core/GridListTile";
import GridList from "@material-ui/core/GridList";
import HomeIcon from '@material-ui/icons/Home';
import TocIcon from '@material-ui/icons/Toc';
const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
}));

const useStylesGrid = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
}));

export default function LeftDrawerDetail({survey}) {
    const classes = useStyles();
    const classesGrid = useStylesGrid();
    const theme = useTheme();
    const [open, setOpen] = React.useState(true);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const history = useHistory();
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const [isTabular, setIsTabular] =  React.useState(false);

    function goToHomepage() {
        history.push("/")

    }

    function goToTable() {
        setIsTabular(false)
    }

    function goToGraph() {
        setIsTabular(true)

    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        {survey["title"]}
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                </div>
                <Divider />
                <List>
                    {['Go back to Surveys'].map((text, index) => (
                        <ListItem button key={text} onClick={()=>goToHomepage()}>
                            <ListItemIcon>{index % 2 === 0 ? <HomeIcon /> : <HomeIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Graphs'].map((text, index) => (
                        <ListItem button key={text} onClick={()=>goToTable()}>
                            <ListItemIcon>{index % 2 === 0 ? <DataUsageIcon /> : <DataUsageIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {['Tabular data'].map((text, index) => (
                        <ListItem button key={text} onClick={()=>goToGraph()}>
                            <ListItemIcon>{index % 2 === 0 ? <TocIcon /> : <TocIcon />}</ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                {!isTabular ?
                    <div className={classesGrid.root}>
                        <GridList cols={2} cellHeight={"auto"} spacing={10}>
                            {survey["questions"].map(question => {
                                return (
                                    <div>
                                        <div style={{marginTop: '80px'}}>
                                        </div>
                                        <Paper style={{marginRight: "20px", paddingBottom: "30px"}}>
                                            <GridListTile key={question}>
                                                <Graphs key={question["questionId"]} question={question}/>
                                            </GridListTile>
                                        </Paper>
                                    </div>
                                );
                            })}
                        </GridList>
                    </div>
                    :
                    <div>
                        {survey["questions"].map(question => {
                            return (
                                <div>
                                    <div style={{marginTop: '80px'}}>
                                    </div>
                                    <div>
                                        <MyTable key={question["questionId"]} question={question}/>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                }
            </main>
        </div>
    );
}
