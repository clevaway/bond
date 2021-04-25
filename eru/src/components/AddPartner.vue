<template>
  <span>
    <Button text="Add partner" @click="dialog = true" class="mt-0" />

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add your partner</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Partner's Email *"
                  required
                  hint="An email is required to invite partner"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Send invite
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>
<script>
import Button from "@/components/userComponents/Button.vue";

export default {
  components: {
    Button,
  },
  data() {
    return {
      dialog: false, // to add new partner
    };
  },
};
</script>