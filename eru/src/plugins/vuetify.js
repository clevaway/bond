import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            primary: "#FD4D4D",
            secondary: "#424242",
            accent: "#82B1FF",
            error: "#FD4D4D",
            info: "#2196F3",
            success: "#4CAF50",
            warning: "#FFC107",
            lightblue: "#14c6FF",
            yellow: "#FFCF00",
            pink: "#FF1976",
            orange: "#FF8657",
            magenta: "#C33AFC",
            darkblue: "#1E2D56",
            gray: "#909090",
            neutralgray: "#F4F4F4",
            green: "#2ED47A",
            red: "#FF5c4E",
            darkblueshade: "#308DC2",
            lightgray: "#BDBDBD",
            lightpink: "#FFCFE3",
            white: "#FFFFFF"
          },
          dark: {
            primary: "#FD4D4D",
            neutralgray: "#1E1E1E"
          },
        }
      }
});
