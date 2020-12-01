<template>
  <v-form>
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
            prepend-icon="mdi-account"
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
      <v-row>
        <v-col
          md="12"
          sm="12"
        >
          <!--          Button get joke-->
          <v-btn
            v-show="showJokeButton"
            block
            color="primary"
            @click="onGetJoke"
          >
            Get joke
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col
          md="12"
          sm="12"
        >
          <!--          Joke text-->
          <v-textarea
            v-show="showJokeButton"
            v-model="jokeText"
            disabled
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
      nameRules: [
        (v) => !!v || 'Name is required',
      ],
      showError: false,
      jokeText: '',
      errorMessage: null,
    };
  },

  computed: {
    greeting() {
      const { person, age } = this;
      let value = `Welcome ${person.name}`;
      if (age >= 18) {
        value += `, ahh! You are ${age} years old, so you can see a joke`;
      }
      return value;
    },

    age() {
      const { dob } = this.person;
      return moment().diff(dob, 'years');
    },

    showText() {
      const { name } = this.person;
      return !!name;
    },

    showJokeButton() {
      const { person, age } = this;
      return person.name && age >= 18;
    },
  },

  methods: {
    onChangeDOB(value) {
      this.showError = false;
      this.calendarMenu = false;
      const date = moment(value);
      this.person.dob = value;
      if (date.isSameOrAfter(moment())) {
        this.showError = true;
        this.errorMessage = 'Date of birth cannot be bigger than today';
      }
    },

    async onGetJoke() {
      try {
        const { data } = await this.$axios.get('https://api.chucknorris.io/jokes/random');
        this.jokeText = data.value;
      } catch (e) {
        this.showError = true;
        this.errorMessage = e.message;
      }
    },
  },
};
</script>
