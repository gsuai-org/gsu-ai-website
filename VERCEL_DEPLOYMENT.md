# Vercel Deployment Checklist

## ✅ Pre-Deployment Setup

### 1. Deploy Sanity Studio First
The Studio is deployed separately to Sanity's hosting, NOT to Vercel.

```bash
cd studio
npx sanity deploy
# Select hostname: gsuai
# Your studio will be at: https://gsuai.sanity.studio
```

### 2. Configure Sanity CORS Settings
**CRITICAL**: Sanity must allow requests from your Vercel domain.

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select project: `2syy7lko`
3. Navigate to **API** → **CORS Origins**
4. Add these origins:
   - `http://localhost:3000` (for local dev)
   - `https://your-project.vercel.app` (your Vercel domain)
   - `https://*.vercel.app` (for preview deployments)

**Without CORS configured, your frontend cannot fetch data from Sanity!**

---

## 🚀 Deploy to Vercel

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### Step 2: Import Project to Vercel
1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Project**
3. Select your GitHub repository
4. Click **Import**

### Step 3: Configure Environment Variables
In the Vercel import screen, add these environment variables:

| Name | Value |
|------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `2syy7lko` |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` |

**Important**: 
- Select all environments: Production, Preview, Development
- Double-check spelling (variables are case-sensitive)
- No quotes around the values

### Step 4: Deploy
1. Leave all other settings as default
2. Click **Deploy**
3. Wait 2-3 minutes for build to complete

---

## 🔍 Troubleshooting

### Frontend Shows No Data / "Loading..." Forever

**Cause**: Environment variables not set or CORS not configured

**Solutions**:
1. Check environment variables in Vercel:
   - Go to **Settings** → **Environment Variables**
   - Verify both variables are present and correct
   
2. Check CORS in Sanity:
   - Go to [sanity.io/manage](https://sanity.io/manage)
   - Verify your Vercel domain is listed in CORS Origins
   
3. Verify data is published in Sanity Studio:
   - Visit `https://gsuai.sanity.studio`
   - Check if documents are published (not just drafts)
   - Create at least one document for each type: Home, Mission, Event, Board Member, Contact

4. Redeploy after fixing:
   - Go to **Deployments** in Vercel
   - Click **...** → **Redeploy**

### Build Fails with "Missing environment variables"

**Cause**: Environment variables not set before build

**Solution**:
1. Add variables in **Settings** → **Environment Variables**
2. Redeploy

### Images Not Loading (404/403 errors)

**Cause**: CORS not allowing image requests or images not uploaded

**Solutions**:
1. Add `https://cdn.sanity.io` to CORS origins
2. Verify images are uploaded in Sanity Studio
3. Check that `next.config.mjs` includes:
   ```javascript
   remotePatterns: [
     {
       protocol: 'https',
       hostname: 'cdn.sanity.io',
     }
   ]
   ```

### "Cannot find module '@sanity/client'"

**Cause**: Dependencies not installed properly

**Solution**:
1. In Vercel, go to **Deployments**
2. Click **...** → **Redeploy**
3. Check "Clear cache and retry"

---

## ✨ Post-Deployment

### 1. Test Your Live Site
Visit your Vercel URL and verify:
- [ ] Home section loads with hero image
- [ ] Mission section shows stats and description
- [ ] Events display (at least 3)
- [ ] Board members appear with photos
- [ ] Contact links work
- [ ] Navigation scrolling works
- [ ] Mobile responsive design works

### 2. Set Up Continuous Deployment
Already configured! Every push to `main` triggers a new deployment.

### 3. Configure Custom Domain (Optional)
1. In Vercel Dashboard → **Settings** → **Domains**
2. Add your domain (e.g., `ai.gsu.edu`)
3. Follow DNS configuration instructions

### 4. Enable Analytics (Optional)
1. In Vercel Dashboard → **Analytics**
2. Click **Enable Web Analytics**
3. Free tier available

---

## 📊 Environment Variables Reference

### Required Variables

| Variable | Value | Description |
|----------|-------|-------------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `2syy7lko` | Your Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | Sanity dataset name |

### Why NEXT_PUBLIC_ prefix?

Variables with `NEXT_PUBLIC_` prefix are exposed to the browser (client-side).
This is necessary because your frontend needs to fetch data from Sanity's API.

---

## 🔄 Updating Content

Content updates are simple:

1. **Edit content** in Sanity Studio: `https://gsuai.sanity.studio`
2. **Publish changes** (click the Publish button)
3. **Frontend updates automatically** (within seconds, thanks to CDN)

No need to redeploy Vercel for content changes!

---

## 📝 Quick Reference

**Sanity Studio**: `https://gsuai.sanity.studio`  
**Sanity Manage**: `https://sanity.io/manage`  
**Vercel Dashboard**: `https://vercel.com/dashboard`  

**Your Project ID**: `2syy7lko`  
**Your Dataset**: `production`

---

## 🆘 Still Having Issues?

1. **Check Vercel build logs**:
   - Go to **Deployments** → Click on failed deployment
   - Read error messages in the build log

2. **Check browser console**:
   - Open DevTools (F12)
   - Look for errors in Console tab
   - Check Network tab for failed requests

3. **Verify Sanity connection**:
   ```bash
   # Test locally first
   npm run dev
   # If local works but Vercel doesn't, it's an env var or CORS issue
   ```

4. **Common error messages**:
   - "Missing NEXT_PUBLIC_SANITY_PROJECT_ID" → Add env var in Vercel
   - "CORS error" → Configure CORS in Sanity dashboard
   - "No documents found" → Publish documents in Sanity Studio
   - "Module not found" → Clear cache and redeploy

---

**Last Updated**: October 16, 2025

