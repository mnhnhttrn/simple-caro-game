import React from 'react'
import { makeStyles, Dialog, DialogTitle, Button, Typography } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    btnGroup: {
        display: 'inline-block',
        lineHeight: 1
    },
    btn: {
        margin: theme.spacing(3, 2),
        width: 150,
        height: 250,
    },
    btnContent: {
        width: 150,
        height: 250,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around'
    }
}))

export default function WhoFirstDialog(props) {
    const { onClose, open } = props
    const classes = useStyles()
    return (
        <Dialog aria-labelledby="simple-dialog-title" open={open} onClose={() => onClose(true)}>
            <DialogTitle id="simple-dialog-title">Bạn muốn đi trước hay sau nhỉ ?</DialogTitle>
            <div className={classes.btnGroup}>
                <Button className={classes.btn} variant="contained" color="primary" onClick={() => onClose(true)}>
                    <div className={classes.btnContent}>
                        <div className="fa fa-3x fa-times" />
                        <Typography>Đi trước</Typography>
                    </div>
                </Button>
                <Button className={classes.btn} variant="contained" color="secondary" onClick={() => onClose(false)}>
                    <div className={classes.btnContent}>
                        <div className="fa fa-3x fa-dot-circle" />
                        <Typography>Đi sau</Typography>
                    </div>
                </Button>
            </div>
        </Dialog>
    );
}