<template>
    <span>
            <v-avatar
                color="neutralgray"
                size="200"
                class="profileBorder"
            >
                <img
                    :src= "img"
                    alt="John"
                >
            </v-avatar>
    </span>
</template>

<script>
export default {
    props:{
        img: String
    },
}
</script>

<style>
.profileBorder{
 border: 8px solid;
}
</style>