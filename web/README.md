# Sarvamoola Foundation website

Plain static site (HTML, CSS, a little JS). No build step.

## Files
- `index.html`  page content (search for `TODO` to find placeholders)
- `styles.css`  styling
- `main.js`     root-line animation, footer year, contact form -> mailto
- `staticwebapp.config.json`  Azure Static Web Apps settings

## To fill in
1. Foundation mission line and "What we do" text
2. KalyanaSakha and UdyogaSakha intros
3. The two "Visit ..." button links (currently `#`)

## Deploy on Azure Static Web Apps
1. Create a Static Web App in the Azure portal (Free plan is fine).
2. Deploy: connect the GitHub repo (app location `/web`, no build, output location empty),
   or run `swa deploy ./web --deployment-token <token>` using the Azure Static Web Apps CLI.
3. Custom domain: Static Web App > Custom domains > Add > enter `sarvamoola.in` (and `www.sarvamoola.in`),
   then add the DNS records Azure shows you at your domain registrar. HTTPS is provisioned automatically.

## Contact form
The form opens the visitor's email app, addressed to info@sarvamoola.in. It needs no backend.
For submissions that don't depend on the visitor's email app, add an Azure Function or Azure Communication Services later.
