import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import { growthBookPlugin } from "@/utils/growthbook";

createApp(App)
    // Use the new GrowthBook plugin like other plugins
    .use(growthBookPlugin, {
        featuresEndpoint: "https://cdn.growthbook.io/api/features/INSERT_CLIENT_KEY_FROM_SDK_CONNECTION",
        enableDevMode: true,
    })
    .mount("#app");
