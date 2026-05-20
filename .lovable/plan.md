# הכנת הפרויקט לעיצוב מקומי עם Onlook + VS Code

## מה אבצע בקוד

### 1. הוספת origins מקומיים ל-CORS
בקובץ `supabase/functions/register-elderly/index.ts` אוסיף לרשימת `ALLOWED_ORIGINS`:
- `http://localhost:3000`
- `http://127.0.0.1:8080`, `http://127.0.0.1:5173`, `http://127.0.0.1:3000`
- `https://kshishi-shabat2.lovable.app` (ה-Published URL הנוכחי)

ואז אפרוס מחדש את הפונקציה כדי שהשינוי ייכנס לתוקף.

### 2. יצירת `.env.example`
תבנית בשורש הפרויקט (בלי ערכים אמיתיים) שתראה אילו משתנים צריך:
```
VITE_SUPABASE_PROJECT_ID=
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

### 3. עדכון `README.md`
אחליף את ה-README הגנרי בהוראות בעברית:
- שכפול ה-repo מ-GitHub
- `npm install`
- יצירת `.env` מקומי (העתקת הערכים מ-Lovable → Project Settings → Environment)
- `npm run dev` (רץ על פורט 8080)
- התקנת Onlook מ-https://onlook.com
- פתיחת תיקיית הפרויקט ב-Onlook + במקביל ב-VS Code
- push חזרה ל-GitHub יסנכרן אוטומטית ללובאבל

## מה אתה צריך לעשות בעצמך

1. **לחבר את הפרויקט ל-GitHub** — בלובאבל למעלה מימין: GitHub → Connect to GitHub
2. **להוריד את Onlook** — https://onlook.com (אפליקציית דסקטופ ל-Mac/Windows/Linux)
3. **ליצור `.env` מקומי** — להעתיק את שלושת הערכים מהפרויקט בלובאבל לקובץ `.env` חדש בשורש (הקובץ לא נדחף ל-Git, אז צריך ידנית בכל מחשב)

## איך Onlook + VS Code עובדים יחד
- Onlook הוא עורך ויזואלי (drag, click, resize ברכיבי React אמיתיים)
- הוא קורא וכותב ישירות לקבצי `.tsx` שלך
- VS Code פתוח במקביל ורואה כל שינוי מיידית
- שניהם רצים מול אותו `npm run dev`

## פרטים טכניים
- **קבצים שיתעדכנו:** `supabase/functions/register-elderly/index.ts`, `README.md`
- **קבצים חדשים:** `.env.example`
- **פריסה:** edge function `register-elderly` ייפרס מחדש
- **אין שינויים** ב-DB schema, ב-UI, או בלוגיקה עסקית

לחץ "Implement plan" כדי שאבצע.
