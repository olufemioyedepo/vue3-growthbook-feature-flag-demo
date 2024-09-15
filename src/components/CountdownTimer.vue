<template>
    <span>
        <!--displays the countdown timer with a green background -->
        <span class="badge bg-success" v-if="hoursLeft > 6">{{ formattedTime }}</span>

        <!--displays the countdown timer with an amber background -->
        <span class="badge bg-warning" v-if="hoursLeft > 1 && hoursLeft < 6">{{ formattedTime }}</span>

        <!--displays the countdown timer with a red background -->
        <span class="badge bg-danger" v-if="hoursLeft < 1">{{ formattedTime }}</span>
    </span>
</template>

<script lang="ts">
import { onMounted, ref, onBeforeUnmount, computed, defineComponent } from "vue";

export default defineComponent({
    name: 'CountdownTimer',
    props: {
        campaignEndTime: String, 
    },
    setup(props, {emit}) {
        const hoursLeft = ref(0);
        let intervalId: any;
        let campaignEndTime = ref({ endTime: props.campaignEndTime?.toString() ?? "" }); ;
        const targetTime = new Date(campaignEndTime.value.endTime).getTime();
        const currentTime = ref(new Date().getTime());
        const timeRemaining = ref(targetTime - currentTime.value);

        hoursLeft.value = timeRemaining.value / 1000 / 60 / 60;

        const isCampaignTimeElapsed = () => {
            emit("isCampaignTimeOver", timeRemaining.value === 0)
        }

        // formats the days, hours, minutes, seconds text on the countdown timer component
        const formattedTime = computed(() => {
            const seconds = Math.floor(timeRemaining.value / 1000);
            const minutes = Math.floor(seconds / 60);
            const hours = Math.floor(minutes / 60);
            const days = Math.floor(hours / 24);
            const countdownTimertext = formatCountdownTimertext(days, hours, minutes, seconds);
            return countdownTimertext;
        });


    onMounted(() => {
        intervalId = setInterval(updateTimer, 1000);
    });

    const formatCountdownTimertext = (days: number, hours: number, minutes: number, seconds: number) => {
        const daysText = days > 1 ? `${days}days ` : `${days}day ` ;
        const hoursText = hours > 1 ? `${hours % 24}hrs ` : hours <= 1 ? `${hours % 24}hr ` : '';
        const minutesText = minutes > 1 ? `${minutes % 60}mins ` : minutes <= 1 ? `${minutes % 60}min ` : '';
        const secondsText = seconds > 1 ? `${seconds % 60}secs ` :  `${seconds}sec `;
        
        return `
            ${daysText}
            ${hoursText}
            ${minutesText}
            ${secondsText}
        `;
    };

    onBeforeUnmount(() => {
        clearInterval(intervalId);
    });

    function updateTimer() {
        currentTime.value = new Date().getTime();
        timeRemaining.value = Math.max(0, targetTime - currentTime.value);
        isCampaignTimeElapsed();
    }

    return {
        formattedTime,
        hoursLeft,
        isCampaignTimeElapsed,
    };
    }
});
</script>

<style scoped>

</style>