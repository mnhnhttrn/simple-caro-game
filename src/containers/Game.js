// Source tham khảo "React tutorial": https://reactjs.org/tutorial/tutorial.html
import React from 'react'
import { connect } from 'react-redux'
import Board from '../components/Board'
import './Game.css'
import * as actions from '../actions/Game'
import caroHelper from '../components/caroHelper'

class Game extends React.Component {
    handleClick(i) {
        const { caroState, playerMove, haveWinner } = this.props
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
        const l = caroHelper.calculateWinner(squares, i, xIsNext)
        if (l) {
            haveWinner(l)
        }
    }

    render() {
        const { resetGame, changeListOrder, jumpTo } = this.props
        const { caroState } = this.props;
        const { history, stepNumber, isDone, xIsNext, isStepListDesc, winLine } = caroState;
        const current = history[stepNumber];
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
            if (idx === stepNumber) {
                return (
                    <li key={idx} className="selected-step">
                        <button type="button" onClick={() => jumpTo(idx)}>{desc}</button>
                    </li>
                );
            }
            return (
                <li key={idx}>
                    <button type="button" onClick={() => jumpTo(idx)}>{desc}</button>
                </li>
            );
        });

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={current.squares}
                        onClick={i => this.handleClick(i)}
                        winLine={winLine}
                    />
                </div>
                <div className="game-info">
                    <ol>
                        <div className="status">{status}</div>
                        <div>
                            <button type="button" onClick={() => resetGame()} id="reset-btn">Chơi lại từ đầu</button>
                            <br /><button type="button" onClick={() => changeListOrder()} id="change-order-btn">Nước đi (col-row)    {caroState.arrowSymbol}</button>
                        </div>
                        {moves}
                    </ol>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        caroState: state.caroReducer
    };
};

export default connect(
    mapStateToProps,
    { ...actions }
)(Game);