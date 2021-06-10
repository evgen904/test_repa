
import { storiesOf } from '@storybook/vue'
import {
  headr,
  store
} from '../index.js'

import Vuex from "vuex";
import StoryRouter from 'storybook-vue-router';

const Home = {
  template: '<div>Home</div>'
};

storiesOf('headr', module)
  .addDecorator(StoryRouter({}, {
    routes: [
      { path: '/', name: "Header" },
      { path: '/home', component: Home, name: "Main" },
    ]}))
  .add('Default', () => ({
    components: { headr },
    template:
    `
    <div>
      <div>
      </div>
      <div>
        <headr>
          <div slot="suggest-desktop" class="text-center">
            SLOT: suggest-desktop
          </div>
        </headr>
        <router-view/>
      </div>
    </div>
    `,
    store: new Vuex.Store({
      modules: {
        user: store
      },
      strict: true
    })
  }))
