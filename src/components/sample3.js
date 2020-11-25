module.exports = { code1: `let useRhymeHighlighter = function()  {
    const colorsSeed = uniqid();
    let chat = ref(null);
    
    let updateHighlights = function() {
      let myInput = chat.value.$el.querySelector('[contenteditable=true]');
      let rhymeMarker = new marker(myInput);
      let rhymeGroups = rhymeDetector(myInput.innerText);
      let colors = colourer({ luminosity: 'light', count: rhymeGroups.length, seed: colorsSeed });
      let rhymeStyles = {};
      
      colors.forEach((color, i) =˃ {
        rhymeStyles[\'rhyme-group-\${{i}}\'] = { 'background-color': color };
      });
      
      const sheet = styler.createStyleSheet(rhymeStyles);
      sheet.attach();
      
      let savedSel = ranger.saveSelection();
          rhymeMarker.unmark({
            done: () => {
              rhymeGroups.forEach((group, i) =>
                rhymeMarker.mark(group.join(' '), { accuracy: { value: "exactly", limiters: [",", ".", "-", "\"", "'", "!", "?", "_", "@"] }, className: sheet.classes[\'rhyme-group-\${i}\'] }));
                ranger.restoreSelection(savedSel, true);
            }
          });
    };
    
    let mounted = onMounted(() => {
      let input = chat.value.$el.querySelector('[contenteditable=true]');
      input.addEventListener('input', updateHighlights);
      input.addEventListener('focus', () => setTimeout(updateHighlights, 50));
    });
    
    return { mounted, chat, updateHighlights };
}


//this is the component JS
export default {
  name: 'RhymeHighlight',
  setup() {
    return useRhymeHighlighter()
  }
};
`, 
code2: `export default {
  name: 'RhymeHighlight',
    props: {
    content: {
      default: '',
      type: String,
    },
  },
  mounted() {
   this.markInstance = new mark(this.$refs.myInput);
   this.updateHighlights();
   this.colorsSeed = uniqid();
  },
  methods: {
    updateHighlights()
    {
      let rhymeGroups = findRhymes(this.text() || '');
      let colors = randomColor({
        luminosity: 'light',
        count: rhymeGroups.length,
        seed: this.colorsSeed
      });
      
      let rhymeStyles = {};
      
      
      colors.forEach((color, index) => {
        rhymeStyles['rhyme-group-\${index}'] = { 'background-color': color }
      });
      
      const sheet = jss.createStyleSheet(rhymeStyles);
      sheet.attach();
      let savedSel = rangy.saveSelection();
      this.markInstance.unmark({
        done: () => {
          rhymeGroups.forEach((group, i) =>
             this.markInstance.mark(group.join(' '), { accuracy: { value: "exactly", limiters: [",", ".", "-", "\"", "'", "!", "?", "_", "@"] }, className: sheet.classes['rhyme-group-\${i}'] }));
          rangy.restoreSelection(savedSel, true);
        }
      });
    }
  }
};` 
};