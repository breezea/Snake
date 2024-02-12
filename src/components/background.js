import global from './config'

class Background {
    load(container) {
        console.log(container)
        container.style.width = global.container_width + 'px'
        container.style.height = global.container_height + 'px'
        container.style.backgroundColor = global.contaienr_bg
        container.style.position = 'relative'

        this.container = container

        let [xn ,yn] = global.get_size()
        this.food_x = Math.floor(Math.random() * xn) * global.block_width
        this.food_y = Math.floor(Math.random() * yn) * global.block_height
    }
    get_food_position(snake_pos) {
        // 如果snake没有吃到
        // console.log(snake_pos.includes([this.food_x, this.food_y]), this.food_x, this.food_y)
        if (!snake_pos.some(item => JSON.stringify(item) === JSON.stringify([this.food_x, this.food_y]))) {
            return [this.food_x, this.food_y]
        } else {
            let [xn ,yn] = global.get_size()
            this.food_x = Math.floor(Math.random() * xn) * global.block_width
            this.food_y = Math.floor(Math.random() * yn) * global.block_height
            return this.get_food_position(snake_pos)
        }

    }
    clean() {
        while (this.container.firstChild) {
            this.container.removeChild(this.container.firstChild)
        }
    }
    draw(snake_pos, food_pos) {
        // 先清除画板
        this.clean()
        // 画snake
        snake_pos.forEach(([x, y]) => {
            let block = document.createElement('div')
            block.style.width = global.block_width + 'px'
            block.style.height = global.block_height + 'px'
            block.style.backgroundColor = global.snake_bg
            block.style.position = 'absolute'
            block.style.left = x + 'px'
            block.style.top = y + 'px'
            this.container.appendChild(block)
        });

        // 画食物
        let food = document.createElement('div')
        food.style.width = global.block_width + 'px'
        food.style.height = global.block_height + 'px'
        food.style.backgroundColor = 'yellow'
        food.style.position = 'absolute'
        food.style.left = food_pos[0] + 'px'
        food.style.top = food_pos[1] + 'px'
        this.container.appendChild(food)
    }
}

export default new Background()