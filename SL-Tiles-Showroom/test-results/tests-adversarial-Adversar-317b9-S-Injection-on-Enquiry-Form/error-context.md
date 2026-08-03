# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: tests\adversarial.spec.ts >> Adversarial E2E Testing >> XSS Injection on Enquiry Form
- Location: tests\adversarial.spec.ts:20:3

# Error details

```
Test timeout of 30000ms exceeded.
```

```
Error: page.fill: Test timeout of 30000ms exceeded.
Call log:
  - waiting for locator('input[name="customer"]')

```

# Page snapshot

```yaml
- generic [ref=e2]:
  - generic [ref=e3]:
    - banner [ref=e4]:
      - generic [ref=e5]:
        - link [ref=e7] [cursor=pointer]:
          - /url: /
          - img "Updated Showroom Name" [ref=e8]
        - navigation [ref=e9]:
          - link "Home" [ref=e10] [cursor=pointer]:
            - /url: /
          - link "Collections" [ref=e11] [cursor=pointer]:
            - /url: /collections
          - link "Catalogues" [ref=e12] [cursor=pointer]:
            - /url: /catalogues
          - link "Contact" [ref=e13] [cursor=pointer]:
            - /url: /#contact
        - generic [ref=e14]:
          - button [ref=e16] [cursor=pointer]
          - link "Book Visit" [ref=e20] [cursor=pointer]:
            - /url: /#contact
    - main [ref=e21]:
      - generic [ref=e24]:
        - generic [ref=e25]:
          - generic [ref=e26]:
            - heading "Visit Our Showroom" [level=2] [ref=e27]
            - paragraph [ref=e28]: Experience the luxury firsthand. Our design experts are ready to turn your vision into reality.
          - generic [ref=e29]:
            - generic [ref=e35]:
              - heading "Showroom Address" [level=4] [ref=e36]
              - paragraph [ref=e37]: 123 Luxury Avenue, Design District, Mumbai, India
            - generic [ref=e42]:
              - heading "Phone Number" [level=4] [ref=e43]
              - paragraph [ref=e44]: +91 98765 43210
            - generic [ref=e50]:
              - heading "Email Address" [level=4] [ref=e51]
              - paragraph [ref=e52]: contact@showroom.com
            - generic [ref=e58]:
              - heading "Working Hours" [level=4] [ref=e59]
              - paragraph [ref=e60]: "Monday - Sunday: 10:00 AM - 8:00 PM"
        - generic [ref=e61]:
          - generic [ref=e62]:
            - heading "Send us a Message" [level=3] [ref=e63]
            - paragraph [ref=e64]: Fill out the form below and our team will get back to you shortly.
            - generic [ref=e65]:
              - textbox "Your Full Name *" [ref=e67]
              - generic [ref=e68]:
                - textbox "Phone Number *" [ref=e69]
                - textbox "Email Address" [ref=e70]
              - textbox "How can we help you? *" [ref=e72]
              - button "Send Message" [ref=e73] [cursor=pointer]
          - generic [ref=e74]:
            - heading "Need Immediate Assistance?" [level=3] [ref=e75]
            - paragraph [ref=e76]: Skip the wait and text our experts directly on WhatsApp.
            - button "Chat on WhatsApp" [ref=e77] [cursor=pointer]
    - contentinfo [ref=e80]:
      - generic [ref=e81]:
        - generic [ref=e82]:
          - generic [ref=e83]:
            - link "Updated Showroom Name" [ref=e84] [cursor=pointer]:
              - /url: "#"
              - generic [ref=e85]: Updated
              - generic [ref=e86]: Showroom
              - generic [ref=e87]: Name
            - paragraph [ref=e88]: We bring the world's most luxurious and exotic tiles to elevate your living spaces. Experience unparalleled quality and design.
            - generic [ref=e89]:
              - link [ref=e90] [cursor=pointer]:
                - /url: "#"
              - link [ref=e93] [cursor=pointer]:
                - /url: "#"
              - link [ref=e96] [cursor=pointer]:
                - /url: "#"
          - generic [ref=e99]:
            - heading "Quick Links" [level=4] [ref=e100]
            - list [ref=e101]:
              - listitem [ref=e102]:
                - link "Home" [ref=e103] [cursor=pointer]:
                  - /url: /
              - listitem [ref=e106]:
                - link "About Us" [ref=e107] [cursor=pointer]:
                  - /url: /#about
              - listitem [ref=e110]:
                - link "Collections" [ref=e111] [cursor=pointer]:
                  - /url: /collections
              - listitem [ref=e114]:
                - link "Inspiration" [ref=e115] [cursor=pointer]:
                  - /url: /#inspiration
              - listitem [ref=e118]:
                - link "Testimonials" [ref=e119] [cursor=pointer]:
                  - /url: /#testimonials
              - listitem [ref=e122]:
                - link "Contact Us" [ref=e123] [cursor=pointer]:
                  - /url: /#contact
          - generic [ref=e126]:
            - heading "Our Collections" [level=4] [ref=e127]
            - list [ref=e128]:
              - listitem [ref=e129]:
                - link "Living Room Tiles" [ref=e130] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e133]:
                - link "Bathroom Elegance" [ref=e134] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e137]:
                - link "Designer Kitchen" [ref=e138] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e141]:
                - link "Outdoor Spaces" [ref=e142] [cursor=pointer]:
                  - /url: "#"
              - listitem [ref=e145]:
                - link "Wall Cladding" [ref=e146] [cursor=pointer]:
                  - /url: "#"
          - generic [ref=e149]:
            - heading "Newsletter" [level=4] [ref=e150]
            - paragraph [ref=e151]: Subscribe to receive design inspirations and exclusive offers.
            - generic [ref=e152]:
              - textbox "Your email address" [ref=e153]
              - button "Subscribe" [ref=e154] [cursor=pointer]
        - generic [ref=e155]:
          - paragraph [ref=e156]: © 2026 Updated Showroom Name. All rights reserved.
          - generic [ref=e157]:
            - link "Privacy Policy" [ref=e158] [cursor=pointer]:
              - /url: "#"
            - link "Terms of Service" [ref=e159] [cursor=pointer]:
              - /url: "#"
    - button "Chat on WhatsApp" [ref=e160] [cursor=pointer]
  - generic [ref=e165]:
    - button [ref=e166] [cursor=pointer]
    - generic [ref=e170]:
      - heading "Welcome to SriLakshmi Tiles and Granites" [level=2] [ref=e171]
      - paragraph [ref=e172]: Please share your details to explore our premium collections.
    - generic [ref=e173]:
      - generic [ref=e174]:
        - generic [ref=e175]:
          - generic [ref=e176]: Full Name *
          - textbox "Enter your full name" [ref=e177]
        - generic [ref=e178]:
          - generic [ref=e179]: Phone Number *
          - generic [ref=e180]:
            - generic [ref=e181]: "+91"
            - textbox "10-digit mobile number" [ref=e182]
      - button "Continue" [ref=e183] [cursor=pointer]
      - generic [ref=e186]: Your information is secure and will not be shared.
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Adversarial E2E Testing', () => {
  4  |   const BASE_URL = 'http://localhost:5173';
  5  | 
  6  |   test('Public Homepage Loads Successfully', async ({ page }) => {
  7  |     await page.goto(BASE_URL);
  8  |     await expect(page.locator('body')).toBeVisible();
  9  |   });
  10 | 
  11 |   test('Admin chunk loading fails gracefully on network drop', async ({ page, context }) => {
  12 |     await page.goto(BASE_URL);
  13 |     // Simulate offline mode to test React.lazy error boundary
  14 |     await context.setOffline(true);
  15 |     await page.goto(`${BASE_URL}/admin/login`);
  16 |     // Should show error boundary fallback instead of white screen
  17 |     await expect(page.locator('text=Error')).toBeVisible();
  18 |   });
  19 | 
  20 |   test('XSS Injection on Enquiry Form', async ({ page }) => {
  21 |     await page.goto(`${BASE_URL}/contact`);
> 22 |     await page.fill('input[name="customer"]', '<script>alert("XSS")</script>');
     |                ^ Error: page.fill: Test timeout of 30000ms exceeded.
  23 |     await page.fill('input[name="phone"]', '1234567890');
  24 |     await page.click('button[type="submit"]');
  25 |     
  26 |     // Verify alert does not trigger
  27 |     page.on('dialog', dialog => {
  28 |       expect(dialog.type()).not.toBe('alert');
  29 |     });
  30 |   });
  31 | });
  32 | 
```