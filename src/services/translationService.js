import api from './api';

export const fetchLanguages = () => api.get('/languages');

export const translateText = (text, source, target) => api.post('/translate', { text, source, target });

export const textToSpeech = (text, lang) => api.get('/tts', {
  params: { text: encodeURIComponent(text), lang },
  responseType: 'blob',
});
