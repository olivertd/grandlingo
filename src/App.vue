
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
                <h2>"Grandlingo's approach to language learning is brilliant! Within just a few weeks, I was able to hold basic conversations with native Spanish speakers. The focus on the most common 1000 words was exactly what I needed to achieve fluency quickly and efficiently. I highly recommend Grandlingo to anyone who wants to learn Spanish!" - Sarah, Grandlingo user.</h2>
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
                    <h4>Grandlingo's innovative approach focuses on teaching the most common 1000 words in Spanish, which accounts for over 80% of speech. This means learners can achieve fluency faster and with less effort.</h4>
                </div>
            </div> 
            <div class="div2">
                <div class="card">
                    <h2>Efficient</h2>
                    <h4>Grandlingo's teaching method for Spanish is practical, enjoyable, and ideal for busy individuals who wish to learn the language quickly and efficiently. </h4>
                </div>
            </div> 
            <div class="div3"> 
                <div class="card">
                    <h2>Enjoyable</h2>
                    <h4>Grandlingo offers a fun and enjoyable method for learning Spanish, making it the perfect choice for anyone who wants to avoid boredom.</h4>
                </div>
            </div> 
            <div class="div4"> 
                <div class="card">
                    <h2>Practical</h2>
                    <h4>Grandlingo's practical and fun teaching method is perfect for busy people who want to learn Spanish quickly and effectively.</h4>

                </div>
            </div> 
            <div class="div5"> 
                <h1>Learning a new language can be rewarding, but also challenging. </h1>
                <h4>Traditional methods can take years of study and practice to achieve fluency. Grandlingo offers a more efficient approach by focusing on the most common 1000 words in the Spanish language, which account for over 80% of speech. By teaching only essential vocabulary, learners can achieve fluency faster and easier. This practical and fun method boosts confidence and motivation, and is perfect for busy people who want to learn Spanish quickly and effectively. Try Grandlingo today and take the first step towards mastering the language!</h4>
            </div> 
        </div>
    </div>
    <div class="container3" ref="container3">
      <div class="quiz-card">
        <div class="card-body">
          <h5 class="card-title">{{ currentWord ? currentWord.english : '' }}</h5>
          <input type="text" v-model="userTranslation" @keydown.enter="submitTranslation" placeholder="Enter translation here...">
          <p v-if="currentWord">English: {{ currentWord.spanish }}</p>
          <button @click="submitTranslation">Submit</button>
          <div v-if="showNotification" class="notification">
            {{ notificationMessage }}
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
    };
  },
  created() {
    if (wordsData && typeof wordsData === 'object') {
      this.words = Object.entries(wordsData).map(([spanish, english]) => {
        return { spanish, english };
      });
      this.getNextWord();
    } else {
      console.error("Error: Unable to load words data.");
    }
  },
  mounted() {
    // Do any additional setup here
  },
  methods: {
    scrollToContainer3() {
      this.$refs.container3.scrollIntoView({ behavior: 'smooth' });
    },
    getNextWord() {
      if (this.currentIndex < this.words.length) {
        this.currentWord = this.words[this.currentIndex];
        this.currentIndex++;
      } else {
        this.currentWord = null;
      }
      this.userTranslation = "";
    },
    submitTranslation() {
      if (this.currentWord && this.userTranslation && this.userTranslation.toLowerCase() === this.currentWord.spanish.toLowerCase()) {
        this.getNextWord();
      } else {
        this.notificationMessage = "Incorrect. Try again.";
        this.showNotification = true;
        setTimeout(this.hideNotification, 3000); // Hide the notification after 3 seconds
      }
    },
    hideNotification() {
      this.showNotification = false;
      this.notificationMessage = "";
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
