<template>
  <v-form v-model="valid">
    <v-container>
      <v-row>
        <!--        Name-->
        <v-col
          md="12"
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
              v-model="person.dob"
              @input="calendarMenu = false"
            />
          </v-menu>
        </v-col>

        <!--        Label-->
        <v-col
          v-show="showText"
          md="12"
        >
          <v-text-field
            v-model="welcome"
            :disabled="true"
            required
          />
        </v-col>
      </v-row>
    </v-container>
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
    };
  },

  computed: {
    welcome() {
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
};
</script>
