import {
   argbFromHex,
   Hct, hexFromArgb,
   MaterialDynamicColors, rgbaFromArgb, SchemeNeutral,
   SchemeTonalSpot,
   themeFromSourceColor
} from '@material/material-color-utilities';
import {kebabCase} from 'change-case-all';


class MaterialColor {
   seedColor;
   seedColorArgb;
   sourceColor;
   schemeTonalSpotLight;
   schemeTonalSpotDark;
   schemeNeutralLight;
   schemeNeutralDark;

   constructor(seedColor) {
      this.seedColor = seedColor;
      this.seedColorArgb = argbFromHex(seedColor);
      this.sourceColor = Hct.fromInt(this.seedColorArgb);
      this.schemeTonalSpotLight = new SchemeTonalSpot(this.sourceColor, false, 0);
      this.schemeTonalSpotDark = new SchemeTonalSpot(this.sourceColor, true, 0);
      this.schemeNeutralLight = new SchemeNeutral(this.sourceColor, false, 0);
      this.schemeNeutralDark = new SchemeNeutral(this.sourceColor, true, 0);
   }

   getDynamicColor(name, scheme) {
      return MaterialDynamicColors[name]?.getArgb(scheme);
   }

   getPalette(scheme) {
      const palette = {
         background: this.getDynamicColor('background', scheme),
         onBackground: this.getDynamicColor('onBackground', scheme),
         surface: this.getDynamicColor('surface', scheme),
         surfaceDim: this.getDynamicColor('surfaceDim', scheme),
         surfaceBright: this.getDynamicColor('surfaceBright', scheme),
         surfaceContainerLowest: this.getDynamicColor('surfaceContainerLowest', scheme),
         surfaceContainerLow: this.getDynamicColor('surfaceContainerLow', scheme),
         surfaceContainer: this.getDynamicColor('surfaceContainer', scheme),
         surfaceContainerHigh: this.getDynamicColor('surfaceContainerHigh', scheme),
         surfaceContainerHighest: this.getDynamicColor('surfaceContainerHighest', scheme),
         onSurface: this.getDynamicColor('onSurface', scheme),
         surfaceVariant: this.getDynamicColor('surfaceVariant', scheme),
         onSurfaceVariant: this.getDynamicColor('onSurfaceVariant', scheme),
         inverseSurface: this.getDynamicColor('inverseSurface', scheme),
         inverseOnSurface: this.getDynamicColor('inverseOnSurface', scheme),
         outline: this.getDynamicColor('outline', scheme),
         outlineVariant: this.getDynamicColor('outlineVariant', scheme),
         shadow: this.getDynamicColor('shadow', scheme),
         scrim: this.getDynamicColor('scrim', scheme),
         surfaceTintColor: this.getDynamicColor('surfaceTintColor', scheme),
         primary: this.getDynamicColor('primary', scheme),
         onPrimary: this.getDynamicColor('onPrimary', scheme),
         primaryContainer: this.getDynamicColor('primaryContainer', scheme),
         onPrimaryContainer: this.getDynamicColor('onPrimaryContainer', scheme),
         inversePrimary: this.getDynamicColor('inversePrimary', scheme),
         inverseOnPrimary: this.getDynamicColor('inverseOnPrimary', scheme),
         secondary: this.getDynamicColor('secondary', scheme),
         secondaryContainer: this.getDynamicColor('secondaryContainer', scheme),
         onSecondaryContainer: this.getDynamicColor('onSecondaryContainer', scheme),
         tertiary: this.getDynamicColor('tertiary', scheme),
         onTertiary: this.getDynamicColor('onTertiary', scheme),
         tertiaryContainer: this.getDynamicColor('tertiaryContainer', scheme),
         onTertiaryContainer: this.getDynamicColor('onTertiaryContainer', scheme),
         error: this.getDynamicColor('error', scheme),
         onError: this.getDynamicColor('onError', scheme),
         errorContainer: this.getDynamicColor('errorContainer', scheme),
         onErrorContainer: this.getDynamicColor('onErrorContainer', scheme),
         primaryFixed: this.getDynamicColor('primaryFixed', scheme),
         primaryFixedDim: this.getDynamicColor('primaryFixedDim', scheme),
         onPrimaryFixed: this.getDynamicColor('onPrimaryFixed', scheme),
         onPrimaryFixedVariant: this.getDynamicColor('onPrimaryFixedVariant', scheme),
         secondaryFixed: this.getDynamicColor('secondaryFixed', scheme),
         secondaryFixedDim: this.getDynamicColor('secondaryFixedDim', scheme),
         onSecondaryFixed: this.getDynamicColor('onSecondaryFixed', scheme),
         onSecondaryFixedVariant: this.getDynamicColor('onSecondaryFixedVariant', scheme),
         tertiaryFixed: this.getDynamicColor('tertiaryFixed', scheme),
         tertiaryFixedDim: this.getDynamicColor('tertiaryFixedDim', scheme),
         onTertiaryFixed: this.getDynamicColor('onTertiaryFixed', scheme),
         onTertiaryFixedVariant: this.getDynamicColor('onTertiaryFixedVariant', scheme),
      };

      // Convert ARGB to HEX
      for (const key in palette) {
         palette[key] = hexFromArgb(palette[key]);
      }

      // Prefix all key with --md-sys-color- and convert to kebab-case
      for (const key in palette) {
         palette[`--md-sys-color-${kebabCase(key)}`] = palette[key];
         delete palette[key];
      }

      return palette;
   }

   getLightPalette_CSS() {
      // const palette = this.getPalette(this.schemeTonalSpotLight);
      const palette = this.getPalette(this.schemeNeutralLight);

      // Convert to CSS variables with selector :root:not(.dark).light
      const cssVars = [];
      cssVars.push(':root:not(.dark).light {');
      for (const key in palette) {
         cssVars.push(`  ${key}: ${palette[key]};`);
      }
      cssVars.push('}');
      return cssVars.join('\n');
   }

   getDarkPalette_CSS() {
      const palette = this.getPalette(this.schemeTonalSpotDark);

      // Convert to CSS variables with selector :root.dark
      const cssVars = [];
      cssVars.push(':root.dark {');
      for (const key in palette) {
         cssVars.push(`  ${key}: ${palette[key]};`);
      }
      cssVars.push('}');
      return cssVars.join('\n');
   }
}


// Example usage
// const seedColor = '#785a0b';
const seedColor = '#C09A76';
// const seedColor = '#FF0000';

const materialColor = new MaterialColor(seedColor);
const lightPalette = materialColor.getLightPalette_CSS();
console.warn('lightPalette', lightPalette);
const darkPalette = materialColor.getDarkPalette_CSS();

const bodyParts = [];
bodyParts.push(`<h3>LIGHT PALETTE</h3>`);
bodyParts.push(`<div>${lightPalette}</div>`);
bodyParts.push(`<h3>DARK PALETTE</h3>`);
bodyParts.push(`<div>${darkPalette}</div>`);

document.body.innerHTML = `<code style="white-space: pre-line;">${bodyParts.join('')}</code>`;
