<template> 
    <span id="animated-number">{{ animatedNumber }}</span>
</template>

<script>
export default {
    props: {
        number: {
            type: Number,
            default: 0
        },
        delay: {
            type: Number,
            default: 0
        }
    },
    data() {
        return {
            tweenedNumber: this.number
        }
    },
    computed: {
        animatedNumber: function() {
            return this.tweenedNumber.toFixed(0);
        }
    },
    watch: {
        number: function(newValue) {
            // eslint-disable-next-line no-undef
            gsap.to(this.$data, { duration: 0.5, tweenedNumber: newValue, delay: this.delay, oncomplete: () => this.$emit('animation-complete')});
        }
    }
}
</script>