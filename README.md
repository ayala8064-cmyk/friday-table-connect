# קשישי שבת

אפליקציה לחיבור קשישים עם מתנדבים לארוחות שבת.

## עבודה מקומית עם VS Code + Onlook

### דרישות מקדימות
- Node.js 18+ ו-npm ([להתקנה עם nvm](https://github.com/nvm-sh/nvm#installing-and-updating))
- VS Code
- [Onlook](https://onlook.com) — עורך ויזואלי לרכיבי React (אופציונלי, לעיצוב)

### שלבי התקנה

**1. שכפול הפרויקט**

קודם חבר את הפרויקט ל-GitHub מתוך Lovable (כפתור GitHub בפינה הימנית למעלה → Connect to GitHub), ואז:

```sh
git clone <YOUR_GIT_URL>
cd <PROJECT_FOLDER>
npm install
```

**2. יצירת קובץ `.env` מקומי**

הקובץ `.env` לא נדחף ל-Git. צור אותו בשורש הפרויקט (אפשר להעתיק מ-`.env.example`):

```
VITE_SUPABASE_PROJECT_ID="utbezivtozaeepvmqlfk"
VITE_SUPABASE_URL="https://utbezivtozaeepvmqlfk.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="<העתק מפרויקט Lovable>"
```

את הערך של `VITE_SUPABASE_PUBLISHABLE_KEY` ניתן להעתיק מהפרויקט ב-Lovable (קובץ `.env` המנוהל אוטומטית).

**3. הרצת שרת פיתוח**

```sh
npm run dev
```

האתר ירוץ על `http://localhost:8080`.

### עבודה עם Onlook

1. הורד והתקן את [Onlook](https://onlook.com) (Mac / Windows / Linux).
2. פתח את Onlook → "Open Project" → בחר את תיקיית הפרויקט.
3. Onlook יזהה אוטומטית Vite + React + Tailwind ויריץ את שרת הפיתוח.
4. פתח במקביל את VS Code על אותה תיקייה — כל שינוי ויזואלי שתעשה ב-Onlook יישמר ישירות לקבצי `.tsx`, ו-VS Code יציג אותו מיידית.

### סנכרון חזרה ל-Lovable

כל `git push` ל-GitHub יסתנכרן אוטומטית בחזרה לפרויקט ב-Lovable.

```sh
git add .
git commit -m "תיאור השינוי"
git push
```

## טכנולוגיות

- Vite + React 18 + TypeScript
- Tailwind CSS + shadcn/ui
- Lovable Cloud (Supabase) — בסיס נתונים, אימות ו-Edge Functions
