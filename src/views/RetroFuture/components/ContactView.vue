<template>
  <section class="contact-page">
    <h2>联系作者</h2>
    <p>如需发送消息，请填写下方表单。我们会尽快回复您。</p>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">您的称呼：</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div class="form-group">
        <label for="email">您的邮箱：</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="form-group">
        <label for="message">留言内容：</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit">提交</button>
    </form>
    <p v-if="submitted">消息已发送，感谢您的联系！</p>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const submitted = ref(false)

function submitForm() {
  // Placeholder for actual form submission logic
  console.log('Form submitted (placeholder)')
  submitted.value = true
  // Reset form or redirect after submission if needed
}
</script>

<style scoped>
.contact-page {
  text-align: center;
}

h2 {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

p {
  margin-bottom: 1.5rem;
  line-height: 1.8;
  font-size: 0.7rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 600px;
  margin: 0 auto;
}

.form-group {
  display: flex;
  flex-direction: column;
  text-align: left;
}

label {
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
  font-family: var(--font-main);
  font-size: 0.7rem;
}

input[type='text'],
input[type='email'],
textarea {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.75rem;
  font-family: var(--font-main);
  border-radius: 2px;
  font-size: 0.7rem;
}

input[type='text']:focus,
input[type='email']:focus,
textarea:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 5px var(--primary-color);
}

button {
  background: var(--primary-color);
  color: var(--background-color);
  border: none;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-family: var(--font-main);
  font-size: 0.7rem;
  border-radius: 2px;
  transition: background-color 0.3s ease;
  align-self: flex-start;
  margin-top: 1rem;
}

button:hover {
  background: var(--accent-color);
  color: var(--text-color);
}

p[v-if='submitted'] {
  margin-top: 1.5rem;
  color: var(--secondary-color);
  font-size: 0.7rem;
}
</style>
