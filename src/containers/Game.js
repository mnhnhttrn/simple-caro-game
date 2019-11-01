// Source tham khảo "React tutorial": https://reactjs.org/tutorial/tutorial.html
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { CssBaseline, Container, Paper, Grid, ListItem, List, ListSubheader, Button, IconButton, Box, Typography, } from '@material-ui/core'
import ReplayIcon from '@material-ui/icons/Replay';
import SortIcon from '@material-ui/icons/Sort';
import Board from '../components/Board'
import * as gameActions from '../actions/Game'
import * as authActions from '../actions/Auth'
import calculateWinner from '../components/caroHelper'
import Loading from '../components/Loading';

const handleClick = (i, props) => {
    const { caroState, playerMove, haveWinner } = props
    let { history } = caroState
    const { stepNumber, xIsNext, isDone } = caroState
    history = history.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (squares[i] || isDone) {
        return;
    }
    squares[i] = xIsNext ? 'X' : 'O';
    playerMove(i, squares)
    const l = calculateWinner(squares, i, xIsNext)

    if (l) {
        haveWinner(l)
    }
}

const Game = props => {
    const { resetGame, changeListOrder, jumpTo, authToken } = props
    const { caroState } = props;
    const { history, stepNumber, isDone, xIsNext, isStepListDesc, winLine } = caroState;
    const current = history[stepNumber];

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

    return (
        <Grid container spacing={3}>
            <CssBaseline />
            <Grid item xs={12} lg={8}>
                <Board
                    squares={current.squares}
                    onClick={i => handleClick(i, props)}
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
                                        <ReplayIcon />
                                    </IconButton>
                                    <Button onClick={() => changeListOrder()} color="default" startIcon={<SortIcon />}>
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
        caroState: state.caroReducer
    };
};

export default connect(
    mapStateToProps,
    { ...gameActions, ...authActions }
)(withRouter(Game));