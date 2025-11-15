# DNS Configuration for dollhaus.zip

To make your GitHub Pages site accessible at `dollhaus.zip`, you need to configure DNS records with your domain registrar.

## Required DNS Records

### For Apex Domain (dollhaus.zip)

Configure **A records** pointing to GitHub Pages servers:

```
Type: A
Name: @
Value: 185.199.108.153

Type: A
Name: @
Value: 185.199.109.153

Type: A
Name: @
Value: 185.199.110.153

Type: A
Name: @
Value: 185.199.111.153
```

### Optional: IPv6 Support (AAAA Records)

For IPv6 support, also add these AAAA records:

```
Type: AAAA
Name: @
Value: 2606:50c0:8000::153

Type: AAAA
Name: @
Value: 2606:50c0:8001::153

Type: AAAA
Name: @
Value: 2606:50c0:8002::153

Type: AAAA
Name: @
Value: 2606:50c0:8003::153
```

### Recommended: WWW Subdomain

Add a CNAME record for the www subdomain:

```
Type: CNAME
Name: www
Value: scopecreep-zip.github.io
```

## GitHub Repository Settings

After configuring DNS:

1. Go to: https://github.com/ScopeCreep-zip/dollhaus.zip/settings/pages
2. Under "Custom domain", enter: `dollhaus.zip`
3. Check "Enforce HTTPS" (recommended)

**Note**: For HTTPS to work, ensure your DNS provider allows CAA records with value `letsencrypt.org`, or doesn't have CAA records configured.

## DNS Propagation

- DNS changes can take up to 24 hours to propagate
- Use https://dnschecker.org to verify your DNS records have propagated globally
- GitHub Pages will automatically provision an SSL certificate once DNS is configured

## Files in This Repository

- `CNAME` - Contains your custom domain (dollhaus.zip)
- `.nojekyll` - Disables Jekyll processing for static HTML site

## Final Steps

1. Push these changes to GitHub:
   ```bash
   git add CNAME .nojekyll DNS-SETUP.md
   git commit -m "feat: Configure custom domain dollhaus.zip"
   git push origin main
   ```

2. Configure DNS records with your domain registrar

3. Add custom domain in GitHub repository settings

4. Wait for DNS propagation and SSL certificate provisioning

Your site will then be accessible at both:
- https://dollhaus.zip
- https://www.dollhaus.zip (if www CNAME is configured)
