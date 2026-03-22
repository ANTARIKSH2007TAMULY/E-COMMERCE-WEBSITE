# E-Commerce Product Explorer

React + Vite + Tailwind e-commerce demo: product listing, search, filters, cart, wishlist, checkout. Uses [Fake Store API](https://fakestoreapi.com) and [DummyJSON](https://dummyjson.com/products).

## Local development

```bash
npm install
npm run dev
```

## Host on GitHub (your account)

Repo name must match **`E-COMMERCE-WEBSITE`** so the live site URL works with the configured base path.

### 1. Create the repository

1. Open **[Create a new repository](https://github.com/new)** while logged in as [ANTARIKSH2007TAMULY](https://github.com/ANTARIKSH2007TAMULY).
2. **Repository name:** `E-COMMERCE-WEBSITE`
3. Choose **Public**.
4. Do **not** add README, `.gitignore`, or license (this project already has them).
5. Click **Create repository**.

### 2. Push this project from your computer

In a terminal (adjust the folder path if yours is different):

```bash
cd "/path/to/E-Commerce App"

git init
git add .
git commit -m "Initial commit: E-Commerce Product Explorer"

git branch -M main
git remote add origin https://github.com/ANTARIKSH2007TAMULY/E-COMMERCE-WEBSITE.git
git push -u origin main
```

If GitHub asks for a password, use a **[Personal Access Token](https://github.com/settings/tokens)** (HTTPS) or set up **SSH keys**.

### 3. Enable GitHub Pages (live website)

1. On the repo: **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **GitHub Actions**.
3. The workflow **Deploy to GitHub Pages** (`.github/workflows/deploy-github-pages.yml`) runs on every push to `main`.
4. After the first successful run, your site will be at:

   **`https://antariksh2007tamuly.github.io/E-COMMERCE-WEBSITE/`**

   (GitHub may show the URL with different casing; it should still resolve.)

### Notes

- Production build uses base path `/E-COMMERCE-WEBSITE/` so assets load correctly on GitHub Pages.
- The workflow copies `index.html` to `404.html` so refreshing routes (e.g. `/products`) still works.

## Build

```bash
npm run build
```

Output is in `dist/`.
