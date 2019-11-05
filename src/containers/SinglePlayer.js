// Source tham khảo "React tutorial": https://reactjs.org/tutorial/tutorial.html
import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { makeStyles, CssBaseline, Container, Paper, Grid, ListItem, List, ListSubheader, Button, IconButton, Typography, Card, Icon, Avatar, ListItemAvatar, ListItemText, Dialog, DialogTitle } from '@material-ui/core'
import { Replay, Sort, ArrowBackIos, AccountCircle, Undo, Redo } from '@material-ui/icons';
import { loadCSS } from 'fg-loadcss';
import Board from '../components/Board'
import * as gameActions from '../actions/SinglePlayer'
import * as authActions from '../actions/Auth'
import calculateWinner from '../components/caroHelper'
import Loading from '../components/Loading';
import AvatarImg from '../components/AvatarImg'
import BotAvatar from '../static/bot_avatar.png'
import ProfileMenu from '../components/ProfileMenu'
import WhoFirstDialog from '../components/dialogs/WhoFirstDialog'
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
    item: {
        display: 'flex',
        justifyContent: 'center',
        margin: theme.spacing(3)
    },
    statusBar: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: theme.spacing(2, 3)
    },
    historyListContainer: {
        padding: theme.spacing(5)
    },
    historyList: {
        maxHeight: '55vh',
        overflow: 'auto',
    },
    backgroundPrimary: {
        background: theme.palette.primary.main
    },
    backgroundSecondary: {
        background: theme.palette.secondary.main
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
    const { gameState, authState } = props;
    const { history, stepNumber, isDone, xIsNext, isStepListDesc, winLine } = gameState;
    const { profilePayload } = authState
    const { avatarURL } = profilePayload
    //const avatarURL = ""

    const current = history[stepNumber];

    //Authenticating
    let [checkAuthing, setCheckAuthing] = React.useState(true)

    //Player Handler
    let [playerFirst, setPlayerFirst] = React.useState(true)
    //Player Select Handler
    let [whoFirstAsked, setWhoFirstAsked] = React.useState(false)

    const styleClasses = useStyle()

    React.useEffect(() => {
        authToken().then(res => {
            if (!res) {
                props.history.push('/sign-in')
            } else {
                setCheckAuthing(false)
            }
        })
        loadCSS(
            'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
            document.querySelector('#font-awesome-css'),
        );
    }, [])

    if (checkAuthing) {
        return <Loading />
    }


    function handleCloseWhoFirstDialog(value) {
        console.log('called!!!')
        setWhoFirstAsked(true);
        setPlayerFirst(value);
    }

    if (!whoFirstAsked) {
        return <WhoFirstDialog onClose={handleCloseWhoFirstDialog} open={!whoFirstAsked} />
    }

    let status;
    if (isDone) {
        // const winner = !xIsNext ? 'X' : 'O';
        // status = `${winner} CHIẾN THẮNG!!!`;
        status = `Bạn đã ${(!xIsNext) === playerFirst ? 'chiến thắng ^_^' : 'thua cuộc T_T'}`
    } else {
        status = `Đến lượt ${xIsNext === playerFirst ? 'bạn' : 'máy'}...`;
    }

    const moves = (isStepListDesc ? history.slice(1).reverse() : history.slice(1)).map((step, move, arr) => {
        let idx = move + 1
        if (isStepListDesc) {
            idx = arr.length - move
        }
        return (
            <ListItem key={idx} button onClick={() => jumpTo(idx, history)}>
                <ListItemAvatar>
                    <Avatar className={idx % 2 === 0 ? styleClasses.backgroundSecondary : styleClasses.backgroundPrimary}>
                        #{idx}
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={`${Math.floor(step.historyPos / 20)} - ${step.historyPos % 20}`} secondary={`${(idx % 2 === 0) === playerFirst ? 'Máy' : 'Bạn'} đã đánh`} />
            </ListItem>
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
                    <Typography variant="h5">Chơi với máy</Typography>
                    <div>
                        <IconButton color="secondary" aria-label="Chơi lại từ đầu" onClick={() => { resetGame(); setWhoFirstAsked(false) }} className={styleClasses.headerBtn}>
                            <Replay />
                        </IconButton>
                        <IconButton color="primary" aria-label="Quay lại một bước" disabled={!allowUndo(history, stepNumber)} onClick={() => allowUndo(history, stepNumber) && jumpTo(stepNumber - 1, history)} className={styleClasses.headerBtn}>
                            <Undo />
                        </IconButton>
                        <IconButton color="primary" aria-label="Tiến trước một bước" disabled={!allowRedo(history, stepNumber)} onClick={() => allowRedo(history, stepNumber) && jumpTo(stepNumber + 1, history)} className={styleClasses.headerBtn}>
                            <Redo />
                        </IconButton>
                    </div>
                    <ProfileMenu className={styleClasses.headerBtn} avatarURL={avatarURL} />
                </Paper>
            </Grid>
            <Grid item xs={12} lg={8}>
                <div
                    className={styleClasses.item}>
                    <Board
                        squares={current.squares}
                        onClick={i => handleTurn(i, props, playerFirst)}
                        winLine={winLine}
                        pos={current.historyPos}
                    />
                </div>
            </Grid>
            <Grid item xs={12} lg={4}>
                <Paper className={styleClasses.item}>
                    <div className={styleClasses.statusBar}>
                        <Icon className={xIsNext ? "fa fa-3x fa-times-circle" : "fa fa-3x fa-dot-circle"} color={xIsNext ? "primary" : "secondary"} />
                        <Typography>{status}</Typography>
                        {
                            xIsNext === playerFirst
                                ? <Avatar src={AvatarImg(avatarURL)} imgProps={{ onError: (e) => { e.target.src = AvatarImg() } }} />
                                : <Avatar src={BotAvatar}></Avatar>
                        }
                    </div>
                </Paper>
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
        gameState: state.gameReducer,
        authState: state.authReducer
    };
};

export default connect(
    mapStateToProps,
    { ...gameActions, ...authActions }
)(withRouter(SinglePlayer));