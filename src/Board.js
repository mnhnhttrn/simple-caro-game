import React from 'react'

function Square(props) {
    const { className, onClick, value } = props
    return (
        <button type="button" className={className} onClick={onClick}>
            {value}
        </button>
    );
}


function HeadColSquare(props) {
    const { value } = props
    return (
        <div className="head-col-square">
            {value}
        </div>
    );
}

function HeadRowSquare(props) {
    const { value } = props
    return (
        <div className="head-row-square">
            {value}
        </div>
    );
}

class Board extends React.Component {
    renderSquare(i) {
        const { winLine, squares, onClick } = this.props
        if (winLine.indexOf(i) > -1) {
            return (
                <Square
                    key={i}
                    value={squares[i]}
                    onClick={() => onClick(i)}
                    className="square win-square"
                />
            );
        }
        return (
            <Square
                key={i}
                value={squares[i]}
                onClick={() => onClick(i)}
                className="square"
            />
        );
    }

    renderRow(r) {
        const squares = [];
        for (let j = 0; j < 20; j += 1) {
            if (r === -1) {
                squares.push(<HeadColSquare key={j} value={j} />)
            } else {
                squares.push(this.renderSquare(r * 20 + j))
            }
        }
        if (r === -1) {
            return (
                <div key={r} className="board-row"><HeadRowSquare value="" />{squares}</div>
            );
        }
        return (
            <div key={r} className="board-row"><HeadRowSquare value={r} />{squares}</div>
        );
    }

    render() {

        const rows = [];
        for (let i = -1; i < 20; i += 1) {
            rows.push(this.renderRow(i))
        }
        return (
            <div>
                {rows}
            </div>
        );
    }
}

export default Board