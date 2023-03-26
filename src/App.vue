
<template>
  <body>
    <div class="container1">
      <div class="parent-container1">
        <div class="div1">
          <img src="@/assets/grandlingologowhite.svg" alt="GrandLingo Logo White" class="svg-logo" type="image/svg+xml">
        </div>
        <div class="div2">
        </div>
        <div class="div3">
          <img src="@/assets/earthicon.svg" alt="GrandLingo Earth Icon" class="svg-earthicon" type="image/svg+xml">
        </div>
        <div class="div4">
          <h2>"Grandlingo's approach to language learning is brilliant! Within just a few weeks, I was able to hold basic
            conversations with native Spanish speakers. The focus on the most common 1000 words was exactly what I needed
            to achieve fluency quickly and efficiently. I highly recommend Grandlingo to anyone who wants to learn
            Spanish!" - Sarah, Grandlingo user.</h2>
          <button @click="scrollToContainer3">Get Started</button>
        </div>
        <div class="div5">
          <h2>Spanish</h2>
          <img src="@/assets/spanishflag.svg" alt="Spanish Flag" class="svg-spanishflag" type="image/svg+xml">
        </div>
      </div>
    </div>
    <div class="container2">
      <div class="parent-container2">
        <div class="div1">
          <div class="card">
            <h2>Innovative</h2>
            <h4>Grandlingo's innovative approach focuses on teaching the most common 1000 words in Spanish, which accounts
              for over 80% of speech. This means learners can achieve fluency faster and with less effort.</h4>
          </div>
        </div>
        <div class="div2">
          <div class="card">
            <h2>Efficient</h2>
            <h4>Grandlingo's teaching method for Spanish is practical, enjoyable, and ideal for busy individuals who wish
              to learn the language quickly and efficiently. </h4>
          </div>
        </div>
        <div class="div3">
          <div class="card">
            <h2>Enjoyable</h2>
            <h4>Grandlingo offers a fun and enjoyable method for learning Spanish, making it the perfect choice for anyone
              who wants to avoid boredom.</h4>
          </div>
        </div>
        <div class="div4">
          <div class="card">
            <h2>Practical</h2>
            <h4>Grandlingo's practical and fun teaching method is perfect for busy people who want to learn Spanish
              quickly and effectively.</h4>

          </div>
        </div>
        <div class="div5">
          <h1>Learning a new language can be rewarding, but also challenging. </h1>
          <h4>Traditional methods can take years of study and practice to achieve fluency. Grandlingo offers a more
            efficient approach by focusing on the most common 1000 words in the Spanish language, which account for over
            80% of speech. By teaching only essential vocabulary, learners can achieve fluency faster and easier. This
            practical and fun method boosts confidence and motivation, and is perfect for busy people who want to learn
            Spanish quickly and effectively. Try Grandlingo today and take the first step towards mastering the language!
          </h4>
        </div>
      </div>
    </div>
    <div class="container3" ref="container3">
      <div class="quiz-card">
        <div class="card-body">
      <h5 class="card-title">{{ currentWord ? currentWord.english : '' }}</h5>
      <input
        type="text"
        v-model="userTranslation"
        @keydown.enter="submitTranslation"
        placeholder="Enter translation here..."
      />
      <p v-if="currentWord">English: {{ currentWord.spanish }}</p>
      <button ref="submitButton" class="green-button" @click="submitTranslation">Submit</button>
      <button v-if="showSkipButton" class="green-button" @click="skipWord">Skip</button>
      <div v-if="showNotification" class="notification">{{ notificationMessage }}</div>
      <div v-if="showHintButton || showWordButton" class="button-group">
        <button class="get-hint" v-if="showHintButton" @click="getHint()">Get Hint</button>
        <button class="show-word" v-if="showWordButton" @click="showWord()">Show Word</button>
      </div>

          <div>
            <svg class="circle-diagram" height="300" width="300" viewBox="0 0 20 30" style="margin: 40px;">
              <circle class="red-circle" r="10" cx="10" cy="10" fill="tomato" />
              <circle class="yellow-circle" r="5" cx="10" cy="10" fill="transparent" stroke="yellow" stroke-width="10"
                :stroke-dasharray="yellowDiagram()" transform="rotate(-90) translate(-20)" />
              <circle class="green-circle" r="5" cx="10" cy="10" fill="transparent" stroke="green" stroke-width="10"
                :stroke-dasharray="greenDiagram()" transform="rotate(-90) translate(-20)" />
              <rect x="3" y="21" width="4" height="2" fill="green" />
              <text class="green-text" x="8" y="22.5">{{ calculatePercentage("green") }} %</text>
              <rect x="3" y="24" width="4" height="2" fill="yellow" />
              <text class="yellow-text" x="8" y="25.5">{{ calculatePercentage("yellow") }} %</text>
              <rect x="3" y="27" width="4" height="2" fill="tomato" />
              <text class="red-text" x="8" y="28.5">{{ calculatePercentage("red") }} %</text>
            </svg>
          </div>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import wordsData from "@/assets/100words.json";

export default {
  name: 'App',
  components: {},
  data() {
    return {
      words: [],
      currentIndex: 0,
      currentWord: null,
      userTranslation: "",
      showNotification: false,
      notificationMessage: "",
      firstTry: 0,
      secondTry: 0,
      firstGuess: true,
      showHintButton: false,
      showWordButton: false,
      showWordRedSubmit: false,
    };
  },
  created() {
    if (localStorage.currentIndex) {
      this.currentIndex = localStorage.currentIndex;
    }
    if (localStorage.firstTry) {
      this.firstTry = localStorage.firstTry;
    }
    if (localStorage.secondTry) {
      this.secondTry = localStorage.secondTry;
    }
    if (wordsData && typeof wordsData === 'object') {
      this.words = Object.entries(wordsData).map(([spanish, english]) => {
        return { spanish, english };
      });
      if (this.currentIndex < this.words.length) {
        this.currentWord = this.words[this.currentIndex];
        if (!localStorage.currentIndex) {
          this.currentIndex++;
        }
      } else {
        this.currentWord = null;
      }
    } else {
      console.error("Error: Unable to load words data.");
    }

  },
  mounted() {
    // Do any additional setup here

  },
  watch: {
    currentIndex(newIndex) {
      localStorage.currentIndex = newIndex;
    },
    firstTry(newTry) {
      localStorage.firstTry = newTry;
    },
    secondTry(newSecondTry) {
      localStorage.secondTry = newSecondTry;
    },
  },
  methods: {
    scrollToContainer3() {
      this.$refs.container3.scrollIntoView({ behavior: 'smooth' });
    },
    getNextWord() {
      if (this.currentIndex < this.words.length) {
        this.currentWord = this.words[this.currentIndex];
        this.currentIndex++;
        this.firstGuess = true;
      } else {
        this.currentWord = null;
      }
      this.userTranslation = "";
    },
    submitTranslation() {
  if (this.showWordRedSubmit) {
    this.currentIndex++; // increase index if show word is clicked before submitting
    this.showWordRedSubmit = false; // reset flag
    this.getNextWord();
    this.$refs.submitButton.classList.remove('red-button');
    this.$refs.submitButton.classList.add('green-button');
    return;
  }
  if (this.currentWord && this.userTranslation && this.userTranslation.toLowerCase() === this.currentWord.spanish.toLowerCase()) {
    if (this.firstGuess) {
      this.firstTry++;
    } else {
      this.secondTry++;
    }
    this.getNextWord();
    this.$refs.submitButton.classList.remove('red-button');
    this.$refs.submitButton.classList.add('green-button');
  } else {
    this.firstGuess = false;
    this.notificationMessage = "Incorrect. Try again.";
    this.showNotification = true;
    this.showHintButton = true;
    this.showWordButton = true;
    setTimeout(this.hideNotification, 2000);
  }
    },
    hideNotification() {
      this.showNotification = false;
      this.notificationMessage = "";
    },
    getHint() {
  // Show the first letter of the word in the input field
  this.userTranslation = this.currentWord.spanish[0];
  this.showWordButton = true;
  this.$refs.submitButton.classList.remove('red-button');
  this.$refs.submitButton.classList.add('green-button');
},
  
showWord() {
  this.userTranslation = this.currentWord.spanish;
  this.showHintButton = false;
  this.showWordButton = false;
  this.$refs.submitButton.classList.remove('green-button');
  this.$refs.submitButton.classList.add('red-button');
  this.showWordRedSubmit = true; // set flag to true when show word is clicked
  this.$refs.submitButton.focus(); // focus on the submit button after clicking show word
},
  
    greenDiagram() {
      let questions = 0;
      if (this.currentIndex != 0) {
        questions = this.currentIndex - 1;
      }
      let result = (this.firstTry / questions)* 31.4
      return result + " 31.4";
    },
    yellowDiagram() {
      let questions = 0;
      if (this.currentIndex !== 0) {
        questions = this.currentIndex - 1;
      }
      let green = this.firstTry / questions;
      let result = (green + this.secondTry / questions) * 31.4
      return result + " 31.4";
      
    },
    calculatePercentage(color) {
      let questions = 0;
      if (this.currentIndex != 0) {
        questions = this.currentIndex - 1;
      }
      let percentage = 0;
      let green = (this.firstTry / questions * 100);
      let yellow = (this.secondTry / questions * 100);
      let red = 100 - (green + yellow);

      if (color === "green") {
        percentage = green;
      }
      else if (color === "yellow") {
        percentage = yellow;
      }
      else if (color === "red") {
        percentage = red;
      }
      return percentage.toFixed(1);
    },
    test(){
      return "12 31.4";
    }
  },
};
</script>



<style>
@import "@/assets/style.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
