
const global = {
    container_width: 500,
    container_height: 500,
    contaienr_bg: '#d3ccd6',
    line: false,
    block_width: 20,
    block_height: 20,
    snake_bg: '#d5ebe1',

    interval: 100

}

const get_size = () => {
    return [
        global.container_width / global.block_width,
        global.container_height / global.block_height
    ]
}

export default {
    ...global,
    get_size
}