* Tools to check accessibility:
	* Screen reader - `ChromeVox`
	* Accessibility audit:
		* `Lighthouse` (Google Chrome => DevTools => Audits)
		* `aXe - Web Accessibility Testing`
		* `WAVE Evaluation Tool`
	* Automated accessibility checks:
		* `axe-core`
* Alternative Text for Images
* Use `aria-label` if control has no related label or text
* Custom controls should have appropriate roles
* If content should be hidden from a screen reader, set `aria-hidden=”true”` and tabindex=”-1”``
* User should be able to navigate website using keyboard only
* Good color contrasts
* Use html semantics to convey meaning (e.g. use `<nav>, <label>, <article>` instead of `<div>`)	
* Transcripts for Audio
* Site should be readable with different zoom settings
	* Some people need to enlarge web content in order to read it
* Users have enough time to read and use the content
* Users can easily navigate, find content, and determine where they are
* Users are helped to avoid and correct mistakes
