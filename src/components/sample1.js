module.exports = {
    code: `<link
    rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
/>

<div id="demo">
    <transition 
        appear 
        enter-active-class="animate__animated animate__fadeIn" 
        leave-active-class="animate__animated animate__fadeOut animate__faster" 
        @after-enter="showParagraph2 = true" 
        @after-leave="showTitle = false">
        <p v-if="showParagraph1">Congrats on overengineering your onboarding with React!</p>
    </transition>
    <transition 
        enter-active-class="animate__animated animate__fadeIn" 
        leave-active-class="animate__animated animate__fadeOut animate__faster" 
        @after-enter="showButton = true" 
        @after-leave="showParagraph1 = false">
        <p v-if="showParagraph2">Would you like to make life easier for yourself?</p>
    </transition> 
</div>

<script src="https://unpkg.com/vue@2.6.12/dist/vue.js"></script>
<script>
var demo = new Vue({{
    el: '#demo',
    data:{{
    	showParagraph1: true,
        showParagraph2: false    	
    }}
}});
</script>`
};
