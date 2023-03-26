<template>
    <div>
      <h2>Quiz</h2>
      <div v-if="currentWord">
        <p>{{ currentWord.spanish }}</p>
        <input type="text" v-model="userTranslation" @keydown.enter="checkTranslation">
      </div>
      <div v-else>
        <p>Congratulations! You finished the quiz.</p>
      </div>
    </div>
  </template>
  
  <script>
  import wordsData from "@/assets/100words.json";
  
  export default {
    data() {
      return {
        words: wordsData.words,
        currentIndex: 0,
        currentWord: null,
        userTranslation: "",
      };
    },
    created() {
      this.shuffleWords();
      this.getNextWord();
    },
    methods: {
      shuffleWords() {
        // Shuffles the array of words using the Fisher-Yates algorithm
        for (let i = this.words.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
        }
      },
      getNextWord() {
        this.currentWord = this.words[this.currentIndex];
      },
      checkTranslation() {
        if (this.userTranslation.toLowerCase() === this.currentWord.english.toLowerCase()) {
          alert("Correct!");
          this.userTranslation = "";
          this.currentIndex++;
          if (this.currentIndex < this.words.length) {
            this.getNextWord();
          } else {
            this.currentWord = null;
          }
        } else {
          alert("Incorrect, try again.");
        }
      },
    },
  };
  </script>
