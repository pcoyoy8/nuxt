<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="white"
      flat
    >
      <v-avatar
        :color="$vuetify.breakpoint.smAndDown ? 'grey darken-1' : 'transparent'"
        size="32"
      />

      <v-tabs
        centered
        class="ml-n9"
        color="grey darken-1"
      >
        <v-tab
          v-for="option in options"
          :key="option.link"
        >
          <a
            :href="option.url"
            target="_blank"
          >{{ option.name }}</a>
        </v-tab>
      </v-tabs>

      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="32"
      />
    </v-app-bar>

    <v-main class="grey lighten-3">
      <v-container>
        <v-row>
          <v-col
            sm="2"
          />

          <v-col
            sm="8"
          >
            <v-sheet
              min-height="70vh"
              rounded="lg"
            >
              <person-form />
            </v-sheet>
          </v-col>

          <v-col
            sm="2"
          />
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import PersonForm from '@/components/PersonForm';

export default {
  components: {
    PersonForm,
  },
  data() {
    return {
      options: [
        { name: 'LinkedIn', url: 'https://www.linkedin.com/in/pcoyoy8/' },
      ],
    };
  },
};
</script>
