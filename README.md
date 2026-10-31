# Anniversary Website

A little anniversary website for Diya. It's plain HTML, CSS and JavaScript with no build step, so it can be hosted for free on GitHub Pages.

## What's on it

1. **"Is it really you?" quiz.** It asks three questions. A wrong answer shows *"Looks like I know you better than you do..."*, then *"Do I even know you?!"*, and the count resets for each question.
2. **Celebration.** Confetti and hearts burst out when every answer is right.
3. **Anniversary page** over a background photo slideshow, with:
   - a live "together for" counter (days, hours, minutes and seconds since 26 October 2025, 5 pm)
   - a sealed envelope she taps to open your letter
   - a timeline of your firsts
   - a deck of "reasons I love you" cards she can tap or swipe
   - a final question with a "No" button that runs away

## Personalising it

**All the text lives in `js/content.js`:** the letter, the reasons, the timeline, the quiz answers and the slideshow list. Edit that file and refresh.

**Photos:**
1. Put your photos in the `images/` folder, for example `images/beach.jpg`.
2. In `js/content.js`, replace the `images/placeholders/...` paths with yours:
   - `slideshow.images` for the background slideshow (add as many as you like)
   - `image` on each `timeline` entry
3. Keep each photo under about 500 KB (around 1600 px wide) so the site loads quickly on mobile data. You can delete `images/placeholders/` once every placeholder is replaced.

**Skip the quiz while editing:** add `?preview` to the end of the address, for example `http://localhost:8000/?preview`.

## Previewing on your computer

From this folder, run:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000. Opening `index.html` directly also works.

## Putting it online with GitHub Pages

1. **Make the repository public:** Settings → General → Danger Zone → Change visibility. GitHub Pages is only free for public repositories. That means anyone with the link to the repo can see the photos and the quiz answers.
2. **Merge the code into your main branch,** or use the branch it's on.
3. **Turn on Pages:** Settings → Pages → Build and deployment. Under Source, pick **Deploy from a branch**, choose the branch and the **/ (root)** folder, then click **Save**.
4. **Wait a minute or two.** The site will be live at `https://harinr465.github.io/AnniversaryWebsite/`, and it works on any phone, tablet or computer.

Every time you push a change to that branch, the site updates automatically.

## Using harinanddiya.com later

When you want the custom domain:

1. Buy `harinanddiya.com` from a registrar such as Cloudflare, Namecheap or Porkbun.
2. Go to Settings → Pages → Custom domain, enter `harinanddiya.com` and save. GitHub adds a `CNAME` file to the repo.
3. At your registrar, add these DNS records:
   - `A` records for `@` pointing to `185.199.108.153`, `185.199.109.153`, `185.199.110.153` and `185.199.111.153`
   - a `CNAME` record for `www` pointing to `harinr465.github.io`
4. Once the DNS check passes (this can take up to a day), tick **Enforce HTTPS**.

## A note on the quiz

The quiz is a cute gate, not real security. The answers are in `js/content.js`, so anyone who looks at the page code can find them.
