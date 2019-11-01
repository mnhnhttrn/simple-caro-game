// Source tham khảo "React tutorial": https://reactjs.org/tutorial/tutorial.html
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CssBaseline, Container, Paper, Grid, ListItem, List, ListSubheader, Button, IconButton, Box, Typography, } from '@material-ui/core'
import { Replay, Sort } from '@material-ui/icons';
import Board from '../components/Board'
import * as gameActions from '../actions/SinglePlayer'
import * as authActions from '../actions/Auth'
import calculateWinner from '../components/caroHelper'
import Loading from '../components/Loading';

const handleTurn = (i, props, playerFirst) => {
    const { gameState, playerMove, haveWinner } = props
    let { history } = gameState
    const { stepNumber, xIsNext, isDone } = gameState
    history = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (isDone) {
        return
    }

    //Negative val means bot turn
    if (i < 0) {
        i = Math.floor(Math.random() * 400)
        while (squares[i]) {
            i = Math.floor(Math.random() * 400)
        }
        console.log('bot Moved !!!', i)
    } else {
        if (squares[i] || (playerFirst !== xIsNext)) {
            return;
        }
    }

    squares[i] = xIsNext ? 'X' : 'O';

    history = history.concat([{ squares, historyPos: i }])
    playerMove(history)
    const l = calculateWinner(squares, i, xIsNext)

    if (l) {
        haveWinner(l)
    }
}

const SinglePlayer = props => {
    const { resetGame, changeListOrder, jumpTo, authToken } = props
    const { gameState } = props;
    const { history, stepNumber, isDone, xIsNext, isStepListDesc, winLine } = gameState;

    const current = history[stepNumber];

    //Player Handler
    const [playerFirst, setPlayerFirst] = React.useState(false)

    //Authenticating
    const [checkAuthing, setCheckAuthing] = React.useState(true)
    React.useEffect(() => {
        authToken().then(res => {
            if (!res) {
                props.history.push('/sign-in')
            } else {
                setCheckAuthing(false)
            }
        })
    }, [])

    if (checkAuthing) {
        return <Loading />
    }

    let status;
    if (isDone) {
        const winner = !xIsNext ? 'X' : 'O';
        status = `${winner} CHIẾN THẮNG!!!`;
    } else {
        status = `Đến lượt ${xIsNext ? 'X' : 'O'}`;
    }

    const moves = (isStepListDesc ? history.slice(1).reverse() : history.slice(1)).map((step, move, arr) => {
        let idx = move + 1
        if (isStepListDesc) {
            idx = arr.length - move
        }
        const desc = `#${idx.toString().padEnd(10)}(${step.historyPos % 20}-${Math.floor(step.historyPos / 20)})`;

        //Highlight style for current step
        if (idx === stepNumber) {
            return (
                <ListItem key={idx} button onClick={() => jumpTo(idx)}>{desc}</ListItem>
            );
        }

        //Last step does not need the divider
        if (idx === arr.length) {
            return (
                <ListItem key={idx} button onClick={() => jumpTo(idx)}>{desc}</ListItem>
            )
        }

        return (
            <ListItem key={idx} button divider onClick={() => jumpTo(idx)}>{desc}</ListItem>
        );
    });

    //Check for bot moved
    if (playerFirst !== xIsNext) {
        console.log('bot move!')

        handleTurn(-1000, props, playerFirst)
    }

    return (
        <Grid container spacing={3}>
            <CssBaseline />
            <Grid item xs={12} lg={8}>
                <Board
                    squares={current.squares}
                    onClick={i => handleTurn(i, props, playerFirst)}
                    winLine={winLine}
                />
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper style={{ margin: 24 }}>
                    <Container>
                        <List component="nav" aria-label="mailbox folders">
                            <ListSubheader>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography color="primary">{status}</Typography>
                                    <IconButton color="secondary" aria-label="Chơi lại từ đầu" onClick={() => resetGame()}>
                                        <Replay />
                                    </IconButton>
                                    <Button onClick={() => changeListOrder()} color="default" startIcon={<Sort />}>
                                        {isStepListDesc ? "Giảm dần" : "Tăng dần"}
                                    </Button>
                                </Box>
                            </ListSubheader>
                            {moves}
                        </List>
                    </Container>
                </Paper>
            </Grid>
        </Grid >
    );
}

const mapStateToProps = state => {
    return {
        gameState: state.gameReducer
    };
};

export default connect(
    mapStateToProps,
    { ...gameActions, ...authActions }
)(withRouter(SinglePlayer));