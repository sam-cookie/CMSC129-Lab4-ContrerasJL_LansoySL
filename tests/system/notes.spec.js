const { test, expect } = require('@playwright/test');

// User Story 1: As a user, I want to create a note with a title and body
test('User can create a note with a title and body', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await page.fill('[data-testid="note-title"]', 'My First Note');
  await page.fill('[data-testid="note-body"]', 'This is the body.');
  await page.click('[data-testid="submit-note"]');

  await expect(page.locator('[data-testid="note-list"]'))
    .toContainText('My First Note');
});

// User Story 2: As a user, I want to view all my notes in a list
test('User can view all notes in a list', async ({ page }) => {
  await page.goto('http://localhost:5173');

  await expect(page.locator('[data-testid="note-list"]')).toBeVisible();
});

// User Story 3: As a user, I want to delete a note
test('User can delete a note', async ({ page }) => {
  await page.goto('http://localhost:5173');

  // first create a note to delete
  await page.fill('[data-testid="note-title"]', 'Note to Delete');
  await page.fill('[data-testid="note-body"]', 'Delete me.');
  await page.click('[data-testid="submit-note"]');

  // then delete it
  await page.click('[data-testid="delete-note"]');

  await expect(page.locator('[data-testid="note-list"]'))
    .not.toContainText('Note to Delete');
});