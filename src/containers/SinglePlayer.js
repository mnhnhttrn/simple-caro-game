// Source tham khảo "React tutorial": https://reactjs.org/tutorial/tutorial.html
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { makeStyles, CssBaseline, Container, Paper, Grid, ListItem, List, ListSubheader, Button, IconButton, Box as div, Typography } from '@material-ui/core'
import { Replay, Sort, ArrowBackIos, AccountCircle, Undo, Redo } from '@material-ui/icons';
import Board from '../components/Board'
import * as gameActions from '../actions/SinglePlayer'
import * as authActions from '../actions/Auth'
import calculateWinner from '../components/caroHelper'
import Loading from '../components/Loading';

const useStyle = makeStyles(theme => ({
    headerBar: {
        minWidth: 910,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: theme.spacing(3, 3, 0, 3)
    },
    headerBtn: {
        margin: theme.spacing(1)
    },
    headerStatus: {
        fontWeight: 'bold'
    },
    item: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(3)
    },
    historyListContainer: {
        padding: theme.spacing(5)
    },
    historyList: {
        maxHeight: '75vh',
        overflow: 'auto',
    },
}))

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

const allowUndo = (history, stepNumber) => {
    return stepNumber > 0
}

const allowRedo = (history, stepNumber) => {
    return stepNumber < history.length - 1
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

    const styleClasses = useStyle()

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
        // const winner = !xIsNext ? 'X' : 'O';
        // status = `${winner} CHIẾN THẮNG!!!`;
        status = `Bạn đã ${(!xIsNext) === playerFirst ? 'chiến thắng ^_^' : 'thua cuộc T_T'}`
    } else {
        status = `Đến lượt ${xIsNext === playerFirst ? 'bạn' : 'máy'} ${xIsNext ? 'X' : 'O'}...`;
    }

    const moves = (isStepListDesc ? history.slice(1).reverse() : history.slice(1)).map((step, move, arr) => {
        let idx = move + 1
        if (isStepListDesc) {
            idx = arr.length - move
        }
        const desc = `#${idx.toString().padEnd(10)}(${step.historyPos % 20}-${Math.floor(step.historyPos / 20)})`;

        //Highlight style for current step
        if (isStepListDesc && idx === 1) {
            return (<ListItem key={idx} button onClick={() => jumpTo(idx, history)}>{desc}</ListItem>)
        }

        if (!isStepListDesc && idx === history.length - 1) {
            return (<ListItem key={idx} button onClick={() => jumpTo(idx, history)}>{desc}</ListItem>)
        }

        return (
            <ListItem key={idx} button divider onClick={() => jumpTo(idx, history)}>{desc}</ListItem>
        );
    });

    //Check for bot moved
    if (playerFirst !== xIsNext) {
        console.log('bot move!')
        const wait = Math.floor(Math.random() * 1123)
        setTimeout(() => { handleTurn(-1000, props, playerFirst) }, wait)
    }

    return (
        <Grid container>
            <CssBaseline />
            <Grid item xs={12}>
                <Paper className={styleClasses.headerBar}>
                    <IconButton color="default" aria-label="Quay về trang chủ" href="/" className={styleClasses.headerBtn}>
                        <ArrowBackIos />
                    </IconButton>
                    <Typography className={styleClasses.headerStatus} color={xIsNext ? "primary" : "secondary"}>{status}</Typography>
                    <div>
                        <IconButton color="secondary" aria-label="Chơi lại từ đầu" onClick={() => resetGame()} className={styleClasses.headerBtn}>
                            <Replay />
                        </IconButton>
                        <IconButton color="primary" aria-label="Quay lại một bước" disabled={!allowUndo(history, stepNumber)} onClick={() => allowUndo(history, stepNumber) && jumpTo(stepNumber - 1, history)} className={styleClasses.headerBtn}>
                            <Undo />
                        </IconButton>
                        <IconButton color="primary" aria-label="Tiến trước một bước" disabled={!allowRedo(history, stepNumber)} onClick={() => allowRedo(history, stepNumber) && jumpTo(stepNumber + 1, history)} className={styleClasses.headerBtn}>
                            <Redo />
                        </IconButton>
                    </div>
                    <IconButton color="default" aria-label="Tài khoản" onClick={() => resetGame()} className={styleClasses.headerBtn}>
                        <AccountCircle />
                    </IconButton>
                </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
                <div
                    className={styleClasses.item}>
                    <Board
                        squares={current.squares}
                        onClick={i => handleTurn(i, props, playerFirst)}
                        winLine={winLine} />
                </div>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper className={styleClasses.item}>
                    <Container className={styleClasses.historyListContainer}>
                        <ListSubheader>
                            <Button onClick={() => changeListOrder()} color="default" startIcon={<Sort />}>
                                Lịch sử lượt đi {isStepListDesc ? "Giảm dần" : "Tăng dần"}
                            </Button>
                        </ListSubheader>
                        <List component="nav" aria-label="mailbox folders" className={styleClasses.historyList}>
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