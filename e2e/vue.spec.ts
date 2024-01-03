import { test, expect } from '@playwright/test';

// See here how to get started:
// https://playwright.dev/docs/intro
test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('div.greetings > h1')).toHaveText('You did it!');
})

test("mocks a character and doesn't call api", async ({ page }) => {
  // Mock the api call before navigating
  await page.route('https://swapi.dev/api/people/?search=sky', async route => {
    const json = {
      "count": 1,
      "next": null,
      "previous": null,
      "results": [
        {
          "name": "Chewbacca",
          "height": "228",
          "mass": "112",
          "hair_color": "brown",
          "skin_color": "unknown",
          "eye_color": "blue",
          "birth_year": "200BBY",
          "gender": "male",
          "homeworld": "https://swapi.dev/api/planets/14/",
          "films": [
            "https://swapi.dev/api/films/1/",
            "https://swapi.dev/api/films/2/",
            "https://swapi.dev/api/films/3/",
            "https://swapi.dev/api/films/6/"
          ],
          "species": [
            "https://swapi.dev/api/species/3/"
          ],
          "vehicles": [
            "https://swapi.dev/api/vehicles/19/"
          ],
          "starships": [
            "https://swapi.dev/api/starships/10/",
            "https://swapi.dev/api/starships/22/"
          ],
          "created": "2014-12-10T16:42:45.066000Z",
          "edited": "2014-12-20T21:17:50.332000Z",
          "url": "https://swapi.dev/api/people/13/"
        }
      ]
    };
    await route.fulfill({ json });
  });

  await page.goto('http://localhost:5173/');
  await page.getByRole('link', { name: 'About' }).click();
  await page.locator('#searchText').click();
  await page.locator('#searchText').fill('sky');
  await page.getByRole('button', { name: 'Search' }).click();

  await expect(page.locator('ul')).toContainText('Chewbacca');
})