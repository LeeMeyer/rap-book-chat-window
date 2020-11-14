const marker = require('mark.js');
const ranger = require('rangy-selectionsaverestore');
const styler = require('jss').default;
const uniqid = require('uniqid');
const rhymeDetector = require('rhyme-detector');
const colourer = require('randomcolor');
const { ref } = require('@vue/composition-api');
const { onMounted } = require('@vue/composition-api');

export default function() 
{ 
  const colorsSeed = uniqid();
  
  let chat = ref(null);

  let updateHighlights = function() {
      let myInput = chat.value.$el.querySelector('[contenteditable=true]');
    
      let rhymeMarker = new marker(myInput);
      let rhymeGroups = rhymeDetector(myInput.innerText);

      let colors = colourer({ luminosity: 'light', count: rhymeGroups.length, seed: colorsSeed });

      let rhymeStyles = {};
      
      colors.forEach((color, i) => {
        rhymeStyles[`rhyme-group-${i}`] = { 'background-color': color };
      });

      const sheet = styler.createStyleSheet(rhymeStyles)
      sheet.attach();

      let savedSel = ranger.saveSelection();

      rhymeMarker.unmark({
        done: () => {
          rhymeGroups.forEach((group, i) =>
             rhymeMarker.mark(group.join(' '), { accuracy: { value: "exactly", limiters: [",", ".", "-", "\"", "'", "!", "?", "_", "@"] }, className: sheet.classes[`rhyme-group-${i}`] }));
         
         ranger.restoreSelection(savedSel, true);
        }
      });
  };

  let mounted = onMounted(() => {
     let input = chat.value.$el.querySelector('[contenteditable=true]');
     input.addEventListener('input', updateHighlights);
     input.addEventListener('focus', () => setTimeout(updateHighlights, 50));     
  });

  return { mounted, chat, updateHighlights }
}