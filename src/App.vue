
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
    </div>
  </body>
</template>

<script>
import wordsData from "@/assets/100words.json";

export default {
  name: 'App',
  components: {
  },
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
    scrollToContainer3() {
      this.$refs.container3.scrollIntoView({ behavior: 'smooth' });
    },
    shuffleWords() {
      // Shuffles the array of words using the Fisher-Yates algorithm
      for (let i = this.words.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [this.words[i], this.words[j]] = [this.words[j], this.words[i]];
      }
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
    checkTranslation() {
      if (this.userTranslation.toLowerCase() === this.currentWord.english.toLowerCase()) {
        this.getNextWord();
      } else {
        alert("Incorrect. Try again.");
      }
    },
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
  color: #2c3e50;
}
</style>
