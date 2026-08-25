/**
 * Brand imagery, imported statically rather than referenced by path.
 *
 * Static imports make Next fingerprint each file with a content hash, so
 * swapping an asset changes its URL. A string path like "/brand/hero.jpg"
 * keeps the same URL forever, and both the image optimiser's on-disk cache
 * and the visitor's browser will happily keep serving the old bytes — which
 * is exactly what bit us when the hero photo was replaced.
 *
 * They also carry intrinsic width/height, so `next/image` reserves the right
 * space and the layout doesn't shift while the photo loads.
 *
 * NOTE: every file here was recovered from the mockup PNGs and upscaled.
 * They are placeholders pending real artwork — see README.
 */
export { default as atcLogo } from '../../public/brand/atc-logo.png'
export { default as booksDesk } from '../../public/brand/books-desk.jpg'
export { default as founderHero } from '../../public/brand/founder-hero.jpg'
export { default as founderPortrait } from '../../public/brand/founder-portrait.jpg'
export { default as founderSeated } from '../../public/brand/founder-seated.jpg'
