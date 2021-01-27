<template>
  
        <div class="game-form">
            <v-btn @click="dialog = !dialog" color="primary" v-if="!game"> Add new Game </v-btn>
              <v-btn @click="dialog = !dialog" color="primary" v-else> Edit Game </v-btn>


         <v-dialog v-model="dialog" persistent width="600px">
             <v-card>
                 <v-card-title v-if="!game"> Add new game </v-card-title>
                 <v-card-title v-else> Edit Game </v-card-title>
                 <v-card-text>
                 <v-form
                 v-model="valid"
                 lazy-validation
                 ref="form"
                 >

                 <v-text-field
                    v-model="title"
                    :rules="fieldRules"
                    label="Game Title"
                    required
                    outlined
                ></v-text-field>

                  <v-text-field
                    v-model="developer"
                    :rules="fieldRules"
                    label="Game developer"
                    required
                    outlined
                ></v-text-field>

                   <v-text-field
                    v-model="publisher"
                    :rules="fieldRules"
                    label="Game publisher"
                    required
                    outlined
                ></v-text-field>

                
                   <v-textarea
                    v-model="description"
                    :rules="fieldRules"
                    label="Game description"
                    required
                    outlined
                ></v-textarea>

                <v-file-input
                    accept="image/*"
                    label="File input"
                    v-model="file"
                    show-size
                ></v-file-input>

                <p>Current image: <a v-if="oldImage" :href="oldImage">link</a> </p>

                <v-btn
                    elevation="2"
                    color="primary"
                    @click="storeGame"
                    :loading="isLoading"
                    v-if="!game"
                >

                Store
                        </v-btn>
                               <v-btn
                    elevation="2"
                    color="primary"
                    @click="updateGame"
                    :loading="isLoading"
                    v-else
                >

                Update
                        </v-btn>
                    </v-form>
                 </v-card-text>
                    <v-card-actions>
                            <v-spacer></v-spacer>
                        <v-btn
                            color="blue darken-1"
                            text
                            @click="dialog = false"
                            >
                            Close
                        </v-btn>
                </v-card-actions>
             </v-card>
         </v-dialog>
       </div>
  
</template>



<script>

import { gamesCollection, auth, storage } from '../firebase'

export default {
    name: 'GameForm',
    props: ['game', 'index'],
    data() {
        return {
            isLoading: false,
            valid: false,
            dialog:false,
            title: '',
            developer: '',
            publisher: '',
            description: '',
            file: null,
            fieldRules: [
                v => !!v || 'this field is required'
            ],
            oldImage: ''

        }
    },

    methods: {
        resetForm() {
            this.$refs.form.reset()
        },


        async storeGame() {
            try {
                this.isLoading = false
        

                //upload field

                const fileRef = 'uploads/games/' + this.file.name
                const snapshot = await storage.ref(fileRef).put(this.file)


                let data = {

                    userId: auth.currentUser.uid,
                    title: this.title,
                    developer: this.developer,
                    publisher: this.publisher,
                    description: this.description,
                    image: fileRef

                }

                const doc = await gamesCollection.add(data)

                await this.resetForm()
                
                this.isLoading - false

                this.dialog = false

            } catch(e) {
                console.log(e)
            }
        },
                async updateGame() {
            try {
                this.isLoading = false
        
                if(this.file){
                    // delete oldImage

                    const fileRefOld = this.game.img
                    await storage.ref(fileRefOld).delete()

                }
                //upload field
                const fileRef = 'uploads/games/' + this.file.name
                const snapshot = await storage.ref(fileRef).put(this.file)


                let data = {

                    userId: auth.currentUser.uid,
                    title: this.title,
                    developer: this.developer,
                    publisher: this.publisher,
                    description: this.description,
                    //image: fileRef

                }

                if(this.file) {
                    data.image = fileRef
                } 

                const doc = await gamesCollection.doc(this.game.id).update(data)

                await this.resetForm()
                
                this.isLoading - false

                this.dialog = false

                alert('Game updated!')

            } catch(e) {
                console.log(e)
            }
        }

    }, 
    mounted() {
        if(this.game) {
            this.title = this.game.title
            this.publisher = this.game.publisher
            this.developer = this.game.developer
            this.description = this.game.description
            this.oldImage = this.game.image
        }
    }
}
</script>