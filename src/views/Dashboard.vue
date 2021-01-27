<template>
    <div class="dashboard">
        <h1> Hi, {{ userProfile.name }} </h1>
        <GameForm />
        <v-row>
            <v-col md="4" v-for="(game, index) in games" :key="game.id">
                <v-card>
                    <v-img
                        v-if="game.image"
                        height="250"
                        :src="game.image"
                        lazy-src="https://via.placeholder.com/250"
                    >
                    </v-img>
                    <v-card-title> {{ game.title }} </v-card-title>
                    <v-card-text>
                        <p class="subtitle-1">Developer: {{ game.developer }}</p>
                        <p class="subtitle-1">Publisher: {{ game.publisher }}</p>
                        <p>{{ game.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                           <GameForm :game="game" :index="index" /> 
                        <v-btn color="red">Delete</v-btn>
                    </v-card-actions>
                </v-card>
         

            </v-col>
        </v-row>
    </div>
</template>

<script>

import { mapState } from 'vuex'
import GameForm from '../components/GameForm.vue'
import {auth, storage, gamesCollection} from '../firebase'

export default {

    components: {
        GameForm
    },

    data() {
        return {
            games: []
        }
    },

    computed: {
        ...mapState(['userProfile'])
    },

    methods: {
        async getGames() {
            try {
                const querySnapshot = await gamesCollection.where('userId', '==', auth.currentUser.uid ).get()
                querySnapshot.forEach( async (doc) =>  {
                    let img = ''
                    if (doc.data().image) {
                        img = await storage.ref().child(doc.data().image).getDownloadURL()
                    }
                    this.games.push ({
                        id: doc.id,
                        title: doc.data().title,
                        developer: doc.data().developer,
                        publisher: doc.data().publisher,
                        description: doc.data().description,
                        image: img,
                        img: doc.data().image
                    })
                })
            } catch (e) {
                console.log(e)
            }
        }
    },

    async mounted() {
        await this.getGames()
    }
    
}
</script>