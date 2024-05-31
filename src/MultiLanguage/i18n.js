import i18n from 'i18next';
   import { initReactI18next } from 'react-i18next';
   import * as Localization from 'expo-localization';

   // Import your translation files
   import en from '../../jsonDir/en.json';
   import hn from '../../jsonDir/hn.json';
   import pn from '../../jsonDir/pn.json';

   // The translations
   const resources = {
     en: {
       translation: en,
     },
     hn: {
       translation: hn,
     },
     pn: {
        translation: pn,
    }
   };

   i18n
     .use(initReactI18next) // Passes i18n down to react-i18next
     .init({
       compatiabilityJSON: 'v3',
       lng: 'en', // If you want to use the device's language
       fallbackLng: 'en', // Use English if the device's language is not available
       resources: resources,

     });

   export default i18n;