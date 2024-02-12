<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import bg from './background'
import snake from './snake'
import global from './config'
const score = ref(0)
onMounted(() => {
  let container = document.getElementById('container')

  bg.load(container)

  window.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowUp' && snake.moving_direction !== 'down') {
      snake.moving_direction = 'up'
    } else if (e.key == 'ArrowDown'&& snake.moving_direction !== 'up') {
      snake.moving_direction = 'down'
    } else if (e.key == 'ArrowLeft' && snake.moving_direction !== 'right') {
      snake.moving_direction = 'left'
    } else if (e.key == 'ArrowRight' && snake.moving_direction !== 'left') {
      snake.moving_direction = 'right'
    }
  })

  let snake_pos = snake.get_pos()
  let food_pos = bg.get_food_position(snake.get_pos())
  bg.draw(snake_pos, food_pos)

  let time_interval = setInterval(() => {
    let ok = snake.move(bg.food_x, bg.food_y)
    if (ok){
      let food_pos = bg.get_food_position(snake.get_pos())
      let snake_pos = snake.get_pos()
      bg.draw(snake_pos, food_pos)
      score.value = snake.score
    }else{
      console.warn("你咬到尾巴了")
      clearInterval(time_interval)
    }
  }, global.interval);

})
onBeforeUnmount(() => {
  var parentElement = document.getElementById("parentElementId");
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
})


const count = ref(0)
</script>

<template>
  <div>分数 {{ score }}</div>
  <div id="container"> </div>
</template>

<style scoped>
.container {
  width: 500px;
  height: 500px;
  background-color: beige;
}
</style>
