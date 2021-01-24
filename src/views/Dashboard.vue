<template>
    <div class="dashboard">
        <h1> Hi, {{ userProfile.name }} </h1>
    </div>
</template>

<script>

import { mapState } from 'vuex'
export default {
    data() {
        return {

        }
    },

    computed: {
        ...mapState(['userProfile'])
    }
    
}
</script>