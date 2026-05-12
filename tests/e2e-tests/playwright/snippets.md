* Download file by url:
```
test('Download file by url', async ({ page }) => {
    const response = await page.request.get('http://someit.com/ms-user/authorization/role-privilege.csv');
    const csvText = await response.text();
    expect(csvText).toContain('EXTRA_SPECIAL_PRIVILEGE');
});
```
