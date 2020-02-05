import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CSVLink, CSVDownload} from 'react-csv';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});



export default function MyTable({question}) {

    function createData(question, answer) {
        return { question, answer, };
    }

    let rows = question["answerOptions"].map(x => createData(x["text"], x["selectedByRespondents"]))
    let labels = question["answerOptions"].map(x => x["text"])
    let tableData = question["answerOptions"].map(x => x["selectedByRespondents"])
    let title = [question["questionTitle"]]
    console.log(question)
    const csvData =[
        title,
        labels ,
        tableData ,
    ];


    const classes = useStyles();

    return (
        <Grid item xs={12}>
        <div>
            <div style={{marginBottom: "3px"}}>
                <div style={{float:'left'}}>
                    <h3>{question["questionTitle"]}</h3>
                </div>
                <div style={{float:'right'}}>
                    <Button style={{backgroundColor: "rgb(219, 35, 102)"}}> <CSVLink data={csvData} >Download me</CSVLink></Button>
                </div>
            </div>
            <TableContainer component={Paper}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead style={{backgroundColor: "rgba(63, 81, 181, 0.3)"}}>
                        <TableRow>
                            <TableCell>Question</TableCell>
                            <TableCell align="right">Respondents (%)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map(row => (
                            <TableRow key={row.question}>
                                <TableCell component="th" scope="row">
                                    {row.question}
                                </TableCell>
                                <TableCell align="right">{row.answer}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </Grid>
    );
}