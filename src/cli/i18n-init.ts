import { detectCliLocale, loadLocale } from './cli/i18n';

// Launch background locale loading (non-blocking). Keeps CLI startup fast while
// populating translated messages for later synchronous calls to t().
const lang = detectCliLocale();
void loadLocale(lang).catch(() => {});
