<template>
  <span>
    <!-- laoding button  if true-->
    <Button v-if="addPartnerButtonStateLoading" loading @click="dialog = true" class="mt-0" />
    <Button v-else text="Add partner" @click="dialog = true" class="mt-0" />

    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-form ref="entryForm" @submit.prevent="sendInvite">
          <v-card-title>
            <span class="headline">Add your partner</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12">
                  <v-text-field
                    v-model="partnerInfo.email"
                    :rules="partnerInfo.emailRules"
                    label="Partner's Email *"
                    required
                    hint="An invitation mail will be sent to your partner"
                  ></v-text-field>
                </v-col>
              </v-row>
            </v-container>
            <small>*indicates required field</small>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false"> Close </v-btn>
            <v-btn color="blue darken-1" text type="submit"> Send invite </v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>
    <!-- notification snackbar -->
    <v-snackbar
      :color="snackbarNotification.color"
      v-model="snackbarNotification.status"
      :timeout="snackbarNotification.displayTime"
      top
      right
      transition="scroll-x-reverse-transition"
      app
    >
      {{ snackbarNotification.snackMessage }}
      <template v-slot:action="{ attrs }">
        <v-btn color="white" text v-bind="attrs" @click="snackbarNotification.status = false">Close</v-btn>
      </template>
    </v-snackbar>
    <!-- / notification snackbar -->
  </span>
</template>
<script>
import Button from '@/components/userComponents/Button.vue';
import store from '@/store';

export default {
  components: {
    Button,
  },
  data() {
    return {
      dialog: false, // to add new partner
      addPartnerButtonStateLoading: false,
      snackbarNotification: {
        snackMessage: 'No data',
        status: false,
        color: '',
        displayTime: 3000,
      },
      partnerInfo: {
        email: null,
        emailRules: [(v) => !!v || 'E-mail is required', (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid'], // rules for the email,
      },
    };
  },
  methods: {
    async sendInvite() {
      if (this.$refs.entryForm.validate()) {
        this.dialog = false; //close dialog when all is good
        this.addPartnerButtonStateLoading = true; //show loading state
        console.log('Validation done good!');
        const userObject = {
          senderEmail: store.state.currentUser.email, // email of the current logged in user
          receiverEmail: this.partnerInfo.email, // email the user entered
        };
        console.log(userObject);
        try {
          // login or signup user
          let response = await this.axios.post(`https://bond-api.vercel.app/sendInvite`, userObject);
          response = response.data[0];
          console.log('Return data => ');
          console.log(response);
          if (response.status == 1) {
            console.log(response.message);
            this.snackbarNotification.status = true;
            this.snackbarNotification.color = 'primary';
            this.snackbarNotification.snackMessage = response.message;
            this.snackbarNotification.displayTime = 5000;
          } else if (response.status == 2) {
            console.log(response.message);
            this.snackbarNotification.status = true;
            this.snackbarNotification.color = 'primary';
            this.snackbarNotification.snackMessage = response.message;
            this.snackbarNotification.displayTime = 5000;
          } else if (response.status == 'sent') {
            console.log(response.message);
            this.snackbarNotification.status = true;
            this.snackbarNotification.color = 'primary';
            this.snackbarNotification.snackMessage = response.message;
            this.snackbarNotification.displayTime = 5000;
          } else {
            this.dialog = true; //open dialog if any errors
            console.log(response.message);
            this.snackbarNotification.status = true;
            this.snackbarNotification.color = 'primary';
            this.snackbarNotification.snackMessage = 'You should never see this error! Just in case';
            this.snackbarNotification.displayTime = 5000;
          }
          this.addPartnerButtonStateLoading = false; //hide loading state when response is received
        } catch (error) {
          // if an error occures
          console.error('There was an error =>' + error);
          this.snackbarNotification.status = true;
          this.snackbarNotification.color = 'red';
          this.snackbarNotification.snackMessage = 'Error:' + error.message;
          this.snackbarNotification.displayTime = 6000;
          this.dialog = true; //open dialog if any errors
          this.addPartnerButtonStateLoading = false; //hide loading state if any errors
        }
      } else {
        // else
        console.log('Form not valid!');
        this.snackbarNotification.status = true;
        this.snackbarNotification.color = 'primary';
        this.snackbarNotification.snackMessage = "Please fill in the form with partner's correct email";
        this.snackbarNotification.displayTime = 3000;
      }
    },
  },
};
</script>