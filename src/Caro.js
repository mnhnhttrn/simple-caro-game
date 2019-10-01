// Source tham khảo "React tutorial": https://reactjs.org/tutorial/tutorial.html
import React from 'react'
import './Caro.css'


function Square(props) {
    return (
        <button className={props.className} onClick={props.onClick}>
            {props.value}
        </button>
    );
}


function HeadColSquare(props) {
    return (
        <div className="head-col-square">
            {props.value}
        </div>
    );
}

function HeadRowSquare(props) {
    return (
        <div className="head-row-square">
            {props.value}
        </div>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        if (this.props.winLine.indexOf(i) > -1) {
            return (
                <Square
                    key={i}
                    value={this.props.squares[i]}
                    onClick={() => this.props.onClick(i)}
                    className="square win-square"
                />
            );
        }
        return (
            <Square
                key={i}
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                className="square"
            />
        );
    }

    renderHeadColSquare(i) {
        return (
            <HeadColSquare
                value={i} />
        );
    }

    renderHeadRowSquare(i) {
        return (
            <HeadRowSquare
                value={i} />
        );
    }

    renderRow(r) {
        let squares = [];
        for (let j = 0; j < 20; j++) {
            if (r === -1) {
                squares.push(this.renderHeadColSquare(j))
            } else {
                squares.push(this.renderSquare(r * 20 + j))
            }
        }
        if (r === -1) {
            return (
                <div className="board-row"><HeadRowSquare value={""} />{squares}</div>
            );
        }
        return (
            <div className="board-row"><HeadRowSquare value={r} />{squares}</div>
        );
    }

    render() {

        let rows = [];
        for (let i = -1; i < 20; i++) {
            rows.push(this.renderRow(i))
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

class Caro extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(400).fill(null),
                historyPos: -1
            }],
            screenHeight: window.innerHeight,
            screenWidth: window.innerWidth,
            xIsNext: true,
            isDone: false,
            stepNumber: 0,
            isStepListDesc: false,
            arrowSymbol: '↓',
            winLine: Array(5).fill(null)
        };
        window.addEventListener("resize", this.onUpdateScreen);
    }

    onUpdateScreen = () => {
        this.setState({
            screenHeight: window.innerHeight,
            screenWidth: window.innerWidth
        });
    };

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        this.setState({ pos: i });
        const squares = current.squares.slice();
        if (squares[i] || this.state.isDone) {
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            xIsNext: !this.state.xIsNext,
            history: history.concat([{ squares: squares, historyPos: i }]),
            stepNumber: history.length
        });
        var l = calculateWinner(squares, i, this.state.xIsNext)
        if (l) {
            //console.log(l)
            this.setState({ isDone: true, winLine: l })
        }
    }

    resetGame() {
        this.setState({
            history: [{
                squares: Array(400).fill(null),
                historyPos: -1
            }],
            xIsNext: true,
            isDone: false,
            stepNumber: 0,
            winLine: Array(5).fill(null)
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        });
    }

    changeListOrder() {
        this.setState({
            isStepListDesc: !this.state.isStepListDesc
        }, () => { this.setState({ arrowSymbol: this.state.isStepListDesc ? '↑' : '↓' }) })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        let status;
        if (this.state.isDone) {
            let winner = !this.state.xIsNext ? 'X' : 'O';
            status = winner + " CHIẾN THẮNG!!!";
        } else {
            status = 'Đến lượt ' + (this.state.xIsNext ? 'X' : 'O');
        }

        const moves = (this.state.isStepListDesc ? history.slice(1).reverse() : history.slice(1)).map((step, move, arr) => {
            let idx = move + 1
            if (this.state.isStepListDesc) {
                idx = arr.length - move
            }
            const desc = '#' + idx.toString().padEnd(10) + '(' + step.historyPos % 20 + '-' + Math.floor(step.historyPos / 20) + ')';
            if (idx === this.state.stepNumber) {
                return (
                    <li key={idx} className="selected-step">
                        <button onClick={() => this.jumpTo(idx)}>{desc}</button>
                    </li>
                );
            }
            return (
                <li key={idx}>
                    <button onClick={() => this.jumpTo(idx)}>{desc}</button>
                </li>
            );
        });

        if (this.state.screenWidth < 720) {
            return (
                <div className="status">Màn hình cần có chiều dài lớn 720px để có thể chơi được!</div>
            );
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        winLine={this.state.winLine}
                    />
                </div>
                <div className="game-info">
                    <ol>
                        <div className="status">{status}</div>
                        <div>
                            <button onClick={() => this.resetGame()} id="reset-btn">Chơi lại từ đầu</button>
                            <br /><button onClick={() => this.changeListOrder()} id="change-order-btn">Nước đi (col-row)    {this.state.arrowSymbol}</button>
                        </div>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}


function calculateWinner(squares, pos, xIsNext) {
    if (pos === -1) {
        return null;
    }
    let hline = getHoriziontalLine(squares, pos)
    let vline = getVerticalLine(squares, pos)
    let semiCross = getSemiCross(squares, pos)
    let mainCross = getMainCross(squares, pos)
    return ruleCheck(hline, xIsNext) || ruleCheck(vline, xIsNext) || ruleCheck(semiCross, xIsNext) || ruleCheck(mainCross, xIsNext)
}

function ruleCheck(line, xIsNext) {
    let player = xIsNext ? 'X' : 'O';
    let op = !xIsNext ? 'X' : 'O';
    const win = 5;
    let count = 0;
    for (let i = 0; i < line.length; i++) {
        if (line[i].val === player) {
            count++
        } else {
            count = 0
        }
        if (count === win) {
            if (i - count === -1 && line[i + 1].val === op) { return null }
            if (i + 1 === 20 && line[i - count].val === op) { return null }
            if (line[i - count].val === op && line[i + 1].val === op) { return null }
            // this.setState({winLine:line.slice(i-count,i+1)})
            // return player;
            let wl = []
            for (let j = i + 1 - count; j < i + 1; j++) {
                wl.push(line[j].p)
            }
            return wl
        }
    }
    return null;
}

function getHoriziontalLine(squares, pos) {
    let line = [];
    let h = Math.floor(pos / 20)
    for (let i = 0; i < 19; i++) {
        line.push({ val: squares[h * 20 + i], p: h * 20 + i })
    }
    return line
}

function getVerticalLine(squares, pos) {
    let line = [];
    let v = pos % 20
    for (let i = 0; i < 19; i++) {
        line.push({ val: squares[i * 20 + v], p: i * 20 + v })
    }
    return line
}

function getSemiCross(squares, pos) {
    //Get semi-cross
    let line = [];
    let h = Math.floor(pos / 20);
    let v = pos % 20;
    h--;
    v--;
    while (h > -1 && v > -1) {
        //let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
        //console.log(str)
        line.unshift({ val: squares[h * 20 + v], p: h * 20 + v })
        h--;
        v--;
    }
    //console.log("pushing :" +(squares[pos]));
    line.push({ val: squares[pos], p: pos })
    h = Math.floor(pos / 20);
    v = pos % 20;
    h++;
    v++;
    while (h < 20 && v < 20) {
        // let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
        // console.log(str)
        line.push({ val: squares[h * 20 + v], p: h * 20 + v })
        h++;
        v++;
    }
    // console.log("semi cross: " + line)
    return line;
}

function getMainCross(squares, pos) {
    //Get semi-cross
    let line = [];
    let h = Math.floor(pos / 20);
    let v = pos % 20;
    h--;
    v++;
    while (h > -1 && v < 20) {
        // let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
        // console.log(str)
        line.unshift({ val: squares[h * 20 + v], p: h * 20 + v })
        h--;
        v++;
    }
    // console.log("pushing :" +(squares[pos]));
    line.push({ val: squares[pos], p: pos })
    h = Math.floor(pos / 20);
    v = pos % 20;
    h++;
    v--;
    while (h < 20 && v > -1) {
        // let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
        // console.log(str)
        line.push({ val: squares[h * 20 + v], p: h * 20 + v })
        h++;
        v--;
    }
    // console.log("main cross: " + line)
    return line;
}

export default Caro