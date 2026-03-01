# Code Scan Report — Movie App

**Generated:** Full codebase scan  
**Scope:** `src/`, `index.html`, `vite.config.js`, `package.json`

---

## Critical errors & bugs

### 1. **App.jsx — Invalid React Router `<Route>` components**

**File:** `src/App.jsx`  
**Lines:** 19–21

Two empty `<Route />` components have no `path` or `element`. They are invalid and can cause React Router warnings or unexpected behavior.

```jsx
<Route path="/" element={<Home />} />
<Route path="/fav" element={<Favorites />} />
<Route />   // ❌ Invalid — no path or element
<Route />   // ❌ Invalid — no path or element
```

**Fix:** Remove the two empty `<Route />` lines, or give them valid `path` and `element` (e.g. 404 page).

---

### 2. **main.jsx — Global styles not loaded**

**File:** `src/main.jsx`

Only `./css/App.css` is imported. `./css/index.css` is never imported.

`index.css` defines:

- `:root` CSS variables (`--bg-dark`, `--text-dark`, etc.)
- `body.dark-mode` and `body.light-mode` (used by `ThemeContext`)
- Scrollbar styles

Because `index.css` is not loaded, theme toggling (adding `dark-mode` / `light-mode` to `document.body`) has no effect and global variables/scrollbar styles are not applied.

**Fix:** In `main.jsx`, import global styles before `App.css`, e.g.:

```js
import "./css/index.css";
import "./css/App.css";
```

---

### 3. **api.js — No response/error handling**

**File:** `src/services/api.js`

- `response.ok` is never checked. On 4xx/5xx, code still uses `data.results`.
- `data.results` can be `undefined` (e.g. on API error), and is returned as-is.

Callers (e.g. `Home.jsx`) then do `setMovies(data.results)` and later `.map()` / `.length`, which will throw if `results` is undefined.

**Fix:**

- Check `response.ok` and throw or return a safe value on error.
- Ensure you always return an array (e.g. `return data.results ?? []`) and optionally set an error state in the UI.

---

### 4. **MovieCard.jsx & Home.jsx — Missing null checks for image paths**

**Files:** `src/components/MovieCard.jsx`, `src/pages/Home.jsx`

- **MovieCard:** `movie.poster_path` can be `null`/`undefined`. The URL becomes  
  `https://image.tmdb.org/t/p/w500undefined` or similar, leading to broken images.
- **Home (hero):** `heroMovie.backdrop_path` can be `null`/`undefined`, so the hero background image URL can be invalid.

**Fix:**

- Only render `<img>` when `movie.poster_path` is truthy; otherwise use a placeholder image or a “no poster” UI.
- Only set hero `backgroundImage` when `heroMovie.backdrop_path` is truthy; otherwise use a fallback background or hide the hero image.

---

### 5. **ThemeContext.jsx — Unsafe `localStorage` parsing**

**File:** `src/context/ThemeContext.jsx`  
**Lines:** 8–10

```js
const savedTheme = localStorage.getItem("theme");
return savedTheme ? JSON.parse(savedTheme) : true;
```

If `"theme"` was stored as a non-JSON string (e.g. `localStorage.setItem("theme", "dark")`), `JSON.parse("dark")` throws and can crash the app on load.

**Fix:** Use try/catch and a safe default, e.g.:

```js
try {
  const saved = localStorage.getItem("theme");
  return saved != null ? JSON.parse(saved) : true;
} catch {
  return true;
}
```

---

### 6. **AuthContext.jsx — No guard when used outside provider**

**File:** `src/context/AuthContext.jsx`

`useAuth()` is implemented as `useContext(AuthContext)` with no check. If a component calls `useAuth()` outside `AuthProvider`, it gets `undefined` and destructuring (e.g. `const { currentUser, login } = useAuth()`) will throw.

**Fix:** Mirror `MovieContext`: if `context` is null/undefined, throw a clear error (e.g. “useAuth must be used within AuthProvider”).

---

### 7. **firebase.js — Placeholder configuration**

**File:** `src/services/firebase.js`

Firebase is initialized with placeholder values (`"YOUR_API_KEY"`, `"YOUR_PROJECT_ID"`, etc.). Any use of `auth` or `db` (e.g. in `AuthContext`) will fail or behave incorrectly until real config is set.

**Fix:** Replace with real Firebase config (e.g. from env vars like `import.meta.env.VITE_FIREBASE_*`) and document required env vars.

---

## Medium / logic issues

### 8. **MovieContext.jsx — Possible ID type mismatch**

**File:** `src/context/MovieContext.jsx`

`removeFromFavorites(movieId)` and `isFavorite(movieId)` compare with `movie.id`. TMDB uses numeric IDs; if `movieId` is sometimes a string (e.g. from DOM or URL), `movie.id !== movieId` can be true even for the same movie (`123 !== "123"`).

**Fix:** Normalize to one type when storing and when comparing, e.g. `Number(movieId)` or `String(movieId)` consistently.

---

### 9. **AuthContext — Auth not used in UI**

**File:** `src/context/AuthContext.jsx` (and app structure)

`AuthProvider` and `useAuth` exist, but no component in the app uses `useAuth()` (no login/signup/logout UI). Auth is effectively dead code and users cannot sign in or out.

**Fix:** Either add login/signup/logout UI (e.g. in `Navbar` or a dedicated auth page) and protect routes if needed, or remove `AuthContext`/Firebase auth until you implement auth flows.

---

### 10. **AuthContext — Blank screen until auth is ready**

**File:** `src/context/AuthContext.jsx`  
**Line:** 49

```jsx
{!loading && children}
```

While `loading` is true, nothing is rendered. If Firebase is slow or misconfigured, users see a blank screen until auth state is resolved.

**Fix:** Consider rendering `children` always and showing a small loading indicator (e.g. in Navbar or a splash) instead of hiding the whole app.

---

### 11. **MovieContext.jsx — Redundant localStorage effects**

**File:** `src/context/MovieContext.jsx`

Two effects: one reads `favorites` from localStorage on mount, the other writes `favorites` to localStorage whenever it changes. On mount, the first effect sets state, which triggers the second effect and writes back. Works but is redundant and can be simplified (e.g. single effect that syncs to localStorage when `favorites` changes, with initial state from localStorage in `useState` initializer).

---

## Minor / style

### 12. **Duplicate CSS import**

**Files:** `src/main.jsx`, `src/App.jsx`

`./css/App.css` is imported in both files. One import is enough (e.g. only in `main.jsx`).

---

### 13. **API key in source**

**File:** `src/services/api.js`

TMDB API key is hardcoded. For a public frontend this is common and often allowed by TMDB, but keys can be extracted from the client. Prefer env vars (e.g. `import.meta.env.VITE_TMDB_API_KEY`) and document in README.

---

### 14. **main.jsx — Missing semicolon**

**File:** `src/main.jsx`  
**Line:** 6

The statement `createRoot(...).render(...)` has no trailing semicolon. Style-only; add a semicolon if the project style requires it.

---

## Summary

| Severity   | Count | Description                          |
|-----------|-------|--------------------------------------|
| Critical  | 7     | Broken routes, missing CSS, API/UI crashes, auth/config |
| Medium    | 4     | Type/UX/auth usage and effect logic  |
| Minor     | 3     | Duplicate imports, key in source, style |

**Recommended order of fixes:**  
(1) Remove or fix empty `<Route />` in `App.jsx`.  
(2) Import `index.css` in `main.jsx`.  
(3) Add response/error handling and safe `data.results` in `api.js`.  
(4) Guard poster/backdrop URLs in `MovieCard` and `Home`.  
(5) Harden theme parsing in `ThemeContext` and add `useAuth` guard in `AuthContext`.  
(6) Replace Firebase placeholders and either wire auth UI or remove auth until needed.
