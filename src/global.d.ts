// Allow importing plain CSS/SCSS/etc. files in TypeScript.
// Placing this file under `src/` ensures `tsconfig.app.json` (which includes `src`) will pick it up.
// Add or remove extensions based on the preprocessors your project uses.
declare module "*.css";
declare module "*.module.css";
declare module "*.scss";
declare module "*.module.scss";
declare module "*.sass";
declare module "*.module.sass";
declare module "*.less";
declare module "*.module.less";

// If you import images or other static assets, you can add declarations here too, for example:
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
