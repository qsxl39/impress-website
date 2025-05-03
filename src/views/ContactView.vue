<template>
  <section class="contact-page">
    <h2>Contact Transmission</h2>
    <p>
      To send a subspace message, please use the encrypted form below. Response times may vary
      depending on solar flare activity and proximity to uncharted wormholes.
    </p>
    <form @submit.prevent="submitForm">
      <div class="form-group">
        <label for="name">Callsign:</label>
        <input type="text" id="name" name="name" required />
      </div>
      <div class="form-group">
        <label for="email">Comm Frequency (Email):</label>
        <input type="email" id="email" name="email" required />
      </div>
      <div class="form-group">
        <label for="message">Message:</label>
        <textarea id="message" name="message" rows="5" required></textarea>
      </div>
      <button type="submit">Send Transmission</button>
    </form>
    <p v-if="submitted">Transmission sent successfully. Stand by for potential reply.</p>
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
  /* Styles moved to global style.css */
}

p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
}

label {
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
  font-family: var(--font-display);
}

input[type='text'],
input[type='email'],
textarea {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid var(--border-color);
  color: var(--text-color);
  padding: 0.75rem;
  font-family: var(--font-mono);
  border-radius: 2px;
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
  font-family: var(--font-display);
  font-size: 1.1rem;
  border-radius: 2px;
  transition: background-color 0.3s ease;
  align-self: flex-start; /* Align button left */
}

button:hover {
  background: var(--accent-color);
  color: var(--text-color);
}

p[v-if='submitted'] {
  margin-top: 1.5rem;
  color: var(--secondary-color);
}
</style>
