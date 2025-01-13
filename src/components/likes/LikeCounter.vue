<template>
  <div v-if="isLoading">Loading...</div>

  <button v-else-if="likeCount === 0" @click="likePost">Like this post</button>

  <button v-else @click="likePost">
    Likes
    <span>{{ likeCount }}</span>
  </button>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import confetti from 'canvas-confetti';
import { actions } from 'astro:actions';
import debounce from "lodash.debounce";
interface Props {
  postId: string;
}

const props = defineProps<Props>();

const likeCount = ref(0);
const isLoading = ref(true);
const likeClicks = ref(0);
watch(likeCount,
debounce(async () => {
    await actions.updatelkesPost({
      postId: props.postId,
      increment: likeClicks.value,
    });

    likeClicks.value = 0;
  }, 500)
)

const likePost = async()=>{
  likeCount.value += 1
  likeClicks.value += 1
  confetti({
    particleCount: 100,
    spread: 70,
    origin: {
      x: Math.random(),
      y: Math.random() - 0.2,
    },
  });
}
const getCurrentLikes = async()=>{
  const {data, error}= await actions.getLikesPost(props.postId)
  if(error){
    console.error(error)
  }
  likeCount.value = data?.likes ?? 0
  isLoading.value = false
}

getCurrentLikes()
</script>

<style scoped>
button {
  background-color: #5e51bc;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background-color: #4a3f9a;
}
</style>