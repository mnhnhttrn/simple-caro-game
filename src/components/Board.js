import React from 'react'
import { Paper, makeStyles, Container } from '@material-ui/core'

import './Board.css'

function Square(props) {
    const { onClick, value } = props
    return (
        <div className="square" onClick={onClick}>
            {value}
        </div>
    );
}

function renderSquare(i, props) {
    const { winLine, squares, onClick, pos } = props
    if (winLine.indexOf(i) > -1) {
        return (
            <Square
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
            squares.push(renderSquare(r * 20 + j, props, classes))
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
        lineHeight: 1,
        margin: theme.spacing(3, 2)
    },
    row: {
        display: 'inline-block',
        padding: 0,
        lineHeight: 1,
    }
}));

export default function Board(props) {
    const classes = useStyles();
    const rows = [];
    for (let i = -1; i < 20; i += 1) {
        rows.push(renderRow(i, props, classes))
    }
    return (
        <Container align="center">
            <Paper className={classes.board}>{rows}</Paper>
        </Container>
    );
}