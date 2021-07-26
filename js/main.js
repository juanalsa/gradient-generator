const app = Vue.createApp({
    data: () => ({
        title: "Gradient Generator",
        fcolor: "#d5ee11",
        scolor: "#f59e24",
        orientation: 1,
        orienOpts: {
            1: "right",
            2: "left",
            3: "top",
            4: "bottom",
        }
    }),
    computed: {
        setColor() {
            return `background: linear-gradient(to ${this.orienOpts[this.orientation]}, ${this.fcolor}, ${this.scolor})`;
        }
    },
});