/// <reference types="cypress" />

describe('ng2-pdf-viewer', () => {
  it('should render the app on the server side w/o exceptions', async () => {
    const body = await (await fetch('/')).text();
    // The `ng-transition` is added on the server side.
    expect(body).to.contain('style ng-transition="ng2-pdf-viewer"');
    expect(body).to.contain('class="ng2-pdf-viewer-container"');
  });
});
