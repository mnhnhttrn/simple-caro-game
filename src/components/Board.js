import React from 'react'
import { Paper, makeStyles, Container, Box } from '@material-ui/core'

import './Board.css'

function Square(props) {
    const { onClick, value, highlight } = props
    let val = value
    let cl = ''
    let squareClassName = 'square'
    if (value === 'X') {
        val = ''
        if (highlight) {
            cl = "fa fa-lg fa-times"
            squareClassName += ' MuiButton-containedPrimary'
        } else {
            cl = "fa fa-lg fa-times MuiIcon-colorPrimary"
        }
    }
    if (value === 'O') {
        val = ''
        if (highlight) {
            cl = "fa fa-lg fa-dot-circle"
            squareClassName += ' MuiButton-containedSecondary'
        } else {
            cl = "fa fa-lg fa-dot-circle MuiIcon-colorSecondary"
        }
    }

    return (
        <div className={squareClassName} onClick={onClick}>
            <div className={cl}>{val}</div>
        </div>
    );
}

function renderSquare(i, props) {
    const { winLine, squares, onClick, pos } = props
    console.log('current pos ', pos)
    if (winLine.indexOf(i) > -1) {
        return (
            <Square
                highlight={true}
                key={i}
                value={squares[i] ? squares[i] : " "}
                onClick={() => onClick(i)}
            />
        );
    }
    if (i === pos) {
        return (
            <Square
                highlight={true}
                key={i}
                value={squares[i] ? squares[i] : " "}
                onClick={() => onClick(i)}
            />
        );
    }
    return (
        <Square
            key={i}
            value={squares[i] ? squares[i] : " "}
            onClick={() => onClick(i)}
        />
    );
}

function renderRow(r, props, classes) {
    const squares = [];
    for (let j = 0; j < 20; j += 1) {
        if (r === -1) {
            squares.push(<Square key={j} value={j} />)
        } else {
            squares.push(renderSquare(r * 20 + j, props))
        }
    }
    if (r === -1) {
        return (
            <div key={r} className={classes.row}><Square value=" " />{squares}</div>
        );
    }
    return (
        <div key={r} className={classes.row}><Square value={r} />{squares}</div>
    );
}

const useStyles = makeStyles(theme => ({
    board: {
        minWidth: 760,
        minHeight: 760,
        padding: theme.spacing(5, 2),
        lineHeight: 1,
    },
    row: {
        display: 'inline-block',
    }
}));

export default function Board(props) {
    const classes = useStyles();
    const rows = [];
    for (let i = -1; i < 20; i += 1) {
        rows.push(renderRow(i, props, classes))
    }
    return (
        <Container>
            <Paper className={classes.board} align="center">{rows}</Paper>
        </Container>
    );
}

