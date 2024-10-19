<script setup>
const props = defineProps({
  description: String,
})
</script>

<template>
  <div class="meetup-description">{{ description }}</div>
</template>

<style scoped>
.meetup-description {
  padding-top: 33px;
  margin-bottom: 24px;
  font-size: 18px;
  line-height: 28px;
  white-space: pre-wrap;
}
</style>
