<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <!--        Name-->
        <v-col
          md="12"
          sm="12"
        >
          <v-text-field
            v-model="person.name"
            :rules="nameRules"
            clearable
            label="First name"
            required
          />
        </v-col>

        <!--        Date of birth-->
        <v-col
          md="12"
          sm="12"
        >
          <v-menu
            v-model="calendarMenu"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="person.dob"
                label="Date of birth"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                clearable
                v-on="on"
              />
            </template>
            <v-date-picker
              :value="person.dob"
              @input="onChangeDOB"
            />
          </v-menu>
        </v-col>

        <!--        Label-->
        <v-col
          v-show="showText"
          md="12"
          sm="12"
        >
          <v-text-field
            v-model="greeting"
            :disabled="true"
          />
        </v-col>
      </v-row>
    </v-container>
    <!--        Error-->
    <v-alert
      v-model="showError"
      type="error"
      dismissible
    >
      {{ errorMessage }}
    </v-alert>
  </v-form>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PersonForm',

  data() {
    return {
      person: {
        name: null,
        dob: null,
      },
      calendarMenu: false,
      valid: false,
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      showError: false,
      errorMessage: null,
    };
  },

  computed: {
    greeting() {
      const { person, dob } = this;
      return `Welcome ${person.name}, you are ${dob} years old`;
    },

    dob() {
      const { dob } = this.person;
      return moment().diff(dob, 'years');
    },

    showText() {
      const { name, dob } = this.person;
      return !!(name && dob);
    },
  },

  methods: {
    onChangeDOB(value) {
      this.calendarMenu = false;
      const date = moment(value);
      this.person.dob = value;
      if (date.isSameOrAfter(moment())) {
        this.showError = true;
        this.errorMessage = 'Date of birth cannot be bigger than today';
      }
    },
  },
};
</script>
