import { readFile } from 'node:fs/promises';
import path from 'node:path';

let messages: Record<string, string> = {};
let currentLang = 'en';

export async function loadLocale(lang: string, localesDir = path.join(process.cwd(), 'src', 'locales')): Promise<void> {
  const file = path.join(localesDir, `${lang}`, 'translation.json');
  try {
    const txt = await readFile(file, { encoding: 'utf8' });
    const parsed = JSON.parse(txt);
    messages = parsed as Record<string, string>;
    currentLang = lang;
  } catch (err) {
    if (lang !== 'en') {
      // fallback to en
      await loadLocale('en', localesDir);
    }
  }
}

export function t(key: string, vars?: Record<string, string | number>): string {
  let msg = messages[key] ?? key;
  if (vars) {
    for (const k of Object.keys(vars)) {
      msg = msg.replace(new RegExp(`{{\s*${k}\s*}}`, 'g'), String(vars[k]));
    }
  }
  return msg;
}

export function detectCliLocale(cliLang?: string): string {
  if (cliLang) return cliLang;
  if (process.env.BACKLOG_LANG) return process.env.BACKLOG_LANG;
  try {
    const locale = Intl.DateTimeFormat().resolvedOptions().locale;
    if (locale) return locale.split('-')[0];
  } catch {}
  if (process.env.LANG) return String(process.env.LANG).split('.')[0].split('_')[0];
  return 'en';
}
