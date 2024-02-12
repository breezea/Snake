import global from './config'

class Snake {
    constructor() {
        let [xn, yn] = global.get_size()

        this.head_x = Math.floor(Math.random() * xn) * global.block_width
        this.head_y = Math.floor(Math.random() * yn) * global.block_height
        this.pos = [[this.head_x, this.head_y]]

        this.directions = {
            'up': () => this.border_format(this.head_x, this.head_y - global.block_height),
            'down': () => this.border_format(this.head_x, this.head_y + global.block_height),
            'left': () => this.border_format(this.head_x - global.block_width, this.head_y),
            'right': () => this.border_format(this.head_x + global.block_width, this.head_y),
        }
        this.moving_direction = Object.keys(this.directions)[Math.floor(Math.random() * Object.keys(this.directions).length)]
        this.score = 0
    }
    get_pos() {
        return this.pos
    }
    border_format(x, y) {
        return [(x + global.container_width) % global.container_width, (y + global.container_height) % global.container_height]
    }
    move(food_x, food_y) {
        let [next_x, next_y] = this.directions[this.moving_direction]()
        if (this.pos.some((item) => {
            return JSON.stringify(item) === JSON.stringify([next_x, next_y]
            )
        })) {
            return false
        }
        this.head_x = next_x
        this.head_y = next_y
        if (next_x == food_x && next_y == food_y) {
            this.pos.unshift([next_x, next_y])
            this.score += 1
        } else {
            this.pos.unshift([next_x, next_y])
            this.pos.pop()
        }
        return true

    }

}

export default new Snake()