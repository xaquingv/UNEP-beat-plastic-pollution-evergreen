import App from './App.svelte';
import storyEN from './story/story-en.json'

const params = new URLSearchParams(window.location.search);
const langs = ['EN', 'ES', 'FR', 'ID', 'PT', 'RU', 'ZH', 'AR', 'SW', 'PT'];
const lang = (params.has('lang') && langs.some(l => params.get('lang') === l))?params.get('lang'):'EN';

const url = [
  {id: 'EN', name: 'English', json: storyEN},
  // {id: 'ES', name: 'Español', json: storyES},
  // {id: 'PT', name: 'Português', json: storyPT},
  // {id: 'FR', name: 'Français', json: storyFR},
  // {id: 'ZH', name: '简体中文', json: storyZH},
  // {id: 'AR', name: 'العربية', json: storyAR},
  // {id: 'RU', name: 'Русский', json: storyRU},
  // {id: 'SW', name: 'Kiswahili', json: storySW},
  // {id: 'ID', name: 'Bahasa Indonesia', json: storyID}
]



const json = url.find(d => d.id === lang).json;
const content = json.article;
const languages = url.map(d => ({short: d.id, long: d.name}));
const meta = json.meta;
const intro = json.intro;
meta.lang = lang.toLowerCase();

const app = new App({
  target: document.body,
  props: {
    content: content,
    meta: meta,
    intro: intro,
    lang: lang.toLowerCase(),
    languages: languages
  }
});

export default app;