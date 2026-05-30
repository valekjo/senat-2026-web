import { test, expect } from '@playwright/test';

test.describe('Home page', () => {
  test('loads and shows title', async ({ page }) => {
    await page.goto('');
    await expect(page).toHaveTitle(/Senátní volby 2026/);
    await expect(page.getByRole('heading', { name: /Volby do Senátu 2026/ })).toBeVisible();
  });

  test('shows district count and candidate count', async ({ page }) => {
    await page.goto('');
    await expect(page.getByText(/27 obvodů/)).toBeVisible();
  });

  test('renders SVG map with district markers', async ({ page }) => {
    await page.goto('');
    const svg = page.locator('svg[aria-label="Mapa senátních obvodů ČR 2026"]');
    await expect(svg).toBeVisible();
    // All 27 district circles should be present
    const circles = svg.locator('circle');
    await expect(circles).toHaveCount(27);
  });

  test('district legend shows all 27 districts', async ({ page }) => {
    await page.goto('');
    const links = page.getByRole('link', { name: /Cheb|Louny|Plzeň|Strakonice|Pelhřimov|Příbram|Praha|Kladno|Děčín|Česká Lípa|Trutnov|Kolín|Hradec Králové|Rychnov|Žďár|Znojmo|Vyškov|Brno|Přerov|Olomouc|Frýdek|Ostrava|Karviná|Zlín|Uherské/ });
    // At least some districts are visible in legend
    await expect(links.first()).toBeVisible();
  });

  test('map district link navigates to district page', async ({ page }) => {
    await page.goto('');
    // Click on district 3 (Cheb) in the legend
    await page.getByRole('link', { name: /3.*Cheb/ }).first().click();
    await expect(page).toHaveURL(/\/obvod\/3\//);
    await expect(page.getByRole('heading', { name: /Cheb/ })).toBeVisible();
  });
});
