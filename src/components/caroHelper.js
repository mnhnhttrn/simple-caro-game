module.exports = {
    getHoriziontalLine: (squares, pos) => {
        const line = [];
        const h = Math.floor(pos / 20)
        for (let i = 0; i < 19; i += 1) {
            line.push({ val: squares[h * 20 + i], p: h * 20 + i })
        }
        return line
    },

    getVerticalLine: (squares, pos) => {
        const line = [];
        const v = pos % 20
        for (let i = 0; i < 19; i += 1) {
            line.push({ val: squares[i * 20 + v], p: i * 20 + v })
        }
        return line
    },

    getSemiCross: (squares, pos) => {
        // Get semi-cross
        const line = [];
        let h = Math.floor(pos / 20);
        let v = pos % 20;
        h -= 1;
        v -= 1;
        while (h > -1 && v > -1) {
            // let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
            // console.log(str)
            line.unshift({ val: squares[h * 20 + v], p: h * 20 + v })
            h -= 1;
            v -= 1;
        }
        // console.log("pushing :" +(squares[pos]));
        line.push({ val: squares[pos], p: pos })
        h = Math.floor(pos / 20);
        v = pos % 20;
        h += 1;
        v += 1;
        while (h < 20 && v < 20) {
            // let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
            // console.log(str)
            line.push({ val: squares[h * 20 + v], p: h * 20 + v })
            h += 1;
            v += 1;
        }
        // console.log("semi cross: " + line)
        return line;
    },

    getMainCross: (squares, pos) => {
        // Get semi-cross
        const line = [];
        let h = Math.floor(pos / 20);
        let v = pos % 20;
        h -= 1;
        v += 1;
        while (h > -1 && v < 20) {
            // let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
            // console.log(str)
            line.unshift({ val: squares[h * 20 + v], p: h * 20 + v })
            h -= 1;
            v += 1;
        }
        // console.log("pushing :" +(squares[pos]));
        line.push({ val: squares[pos], p: pos })
        h = Math.floor(pos / 20);
        v = pos % 20;
        h += 1;
        v -= 1;
        while (h < 20 && v > -1) {
            // let str = "get point: (" +  h + " - " + v + "): " + (h*20+v)
            // console.log(str)
            line.push({ val: squares[h * 20 + v], p: h * 20 + v })
            h += 1;
            v -= 1;
        }
        // console.log("main cross: " + line)
        return line;
    },

    ruleCheck: (line, xIsNext) => {
        const player = xIsNext ? 'X' : 'O';
        const op = !xIsNext ? 'X' : 'O';
        const win = 5;
        let count = 0;
        for (let i = 0; i < line.length; i += 1) {
            if (line[i].val === player) {
                count += 1
            } else {
                count = 0
            }
            if (count === win) {
                if (i - count === -1 && line[i + 1].val === op) { return null }
                if (i + 1 === 20 && line[i - count].val === op) { return null }
                if (line[i - count].val === op && line[i + 1].val === op) { return null }
                const wl = []
                for (let j = i + 1 - count; j < i + 1; j += 1) {
                    wl.push(line[j].p)
                }
                return wl
            }
        }
        return null;
    },

    calculateWinner: (squares, pos, xIsNext) => {
        if (pos === -1) {
            return null;
        }
        const hline = this.getHoriziontalLine(squares, pos)
        const vline = this.getVerticalLine(squares, pos)
        const semiCross = this.getSemiCross(squares, pos)
        const mainCross = this.getMainCross(squares, pos)
        return this.ruleCheck(hline, xIsNext) || this.ruleCheck(vline, xIsNext) || this.ruleCheck(semiCross, xIsNext) || this.ruleCheck(mainCross, xIsNext)
    }
}