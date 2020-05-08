import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-Black.eot');
      src: url('/fonts/roboto/roboto-Black.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-Black.woff2') format('woff2'),
          url('/fonts/roboto/roboto-Black.woff') format('woff'),
          url('/fonts/roboto/roboto-Black.ttf') format('truetype'),
          url('/fonts/roboto/roboto-Black.svg#Roboto-Black') format('svg');
      font-weight: 900;
      font-style: normal;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-Medium.eot');
      src: url('/fonts/roboto/roboto-Medium.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-Medium.woff2') format('woff2'),
          url('/fonts/roboto/roboto-Medium.woff') format('woff'),
          url('/fonts/roboto/roboto-Medium.ttf') format('truetype'),
          url('/fonts/roboto/roboto-Medium.svg#Roboto-Medium') format('svg');
      font-weight: 500;
      font-style: normal;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-LightItalic.eot');
      src: url('/fonts/roboto/roboto-LightItalic.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-LightItalic.woff2') format('woff2'),
          url('/fonts/roboto/roboto-LightItalic.woff') format('woff'),
          url('/fonts/roboto/roboto-LightItalic.ttf') format('truetype'),
          url('/fonts/roboto/roboto-LightItalic.svg#Roboto-LightItalic') format('svg');
      font-weight: 300;
      font-style: italic;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-Bold.eot');
      src: url('/fonts/roboto/roboto-Bold.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-Bold.woff2') format('woff2'),
          url('/fonts/roboto/roboto-Bold.woff') format('woff'),
          url('/fonts/roboto/roboto-Bold.ttf') format('truetype'),
          url('/fonts/roboto/roboto-Bold.svg#Roboto-Bold') format('svg');
      font-weight: bold;
      font-style: normal;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-BlackItalic.eot');
      src: url('/fonts/roboto/roboto-BlackItalic.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-BlackItalic.woff2') format('woff2'),
          url('/fonts/roboto/roboto-BlackItalic.woff') format('woff'),
          url('/fonts/roboto/roboto-BlackItalic.ttf') format('truetype'),
          url('/fonts/roboto/roboto-BlackItalic.svg#Roboto-BlackItalic') format('svg');
      font-weight: 900;
      font-style: italic;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-Italic.eot');
      src: url('/fonts/roboto/roboto-Italic.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-Italic.woff2') format('woff2'),
          url('/fonts/roboto/roboto-Italic.woff') format('woff'),
          url('/fonts/roboto/roboto-Italic.ttf') format('truetype'),
          url('/fonts/roboto/roboto-Italic.svg#Roboto-Italic') format('svg');
      font-weight: normal;
      font-style: italic;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-ThinItalic.eot');
      src: url('/fonts/roboto/roboto-ThinItalic.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-ThinItalic.woff2') format('woff2'),
          url('/fonts/roboto/roboto-ThinItalic.woff') format('woff'),
          url('/fonts/roboto/roboto-ThinItalic.ttf') format('truetype'),
          url('/fonts/roboto/roboto-ThinItalic.svg#Roboto-ThinItalic') format('svg');
      font-weight: 100;
      font-style: italic;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-Regular.eot');
      src: url('/fonts/roboto/roboto-Regular.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-Regular.woff2') format('woff2'),
          url('/fonts/roboto/roboto-Regular.woff') format('woff'),
          url('/fonts/roboto/roboto-Regular.ttf') format('truetype'),
          url('/fonts/roboto/roboto-Regular.svg#Roboto-Regular') format('svg');
      font-weight: normal;
      font-style: normal;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-MediumItalic.eot');
      src: url('/fonts/roboto/roboto-MediumItalic.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-MediumItalic.woff2') format('woff2'),
          url('/fonts/roboto/roboto-MediumItalic.woff') format('woff'),
          url('/fonts/roboto/roboto-MediumItalic.ttf') format('truetype'),
          url('/fonts/roboto/roboto-MediumItalic.svg#Roboto-MediumItalic') format('svg');
      font-weight: 500;
      font-style: italic;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-Light.eot');
      src: url('/fonts/roboto/roboto-Light.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-Light.woff2') format('woff2'),
          url('/fonts/roboto/roboto-Light.woff') format('woff'),
          url('/fonts/roboto/roboto-Light.ttf') format('truetype'),
          url('/fonts/roboto/roboto-Light.svg#Roboto-Light') format('svg');
      font-weight: 300;
      font-style: normal;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-BoldItalic.eot');
      src: url('/fonts/roboto/roboto-BoldItalic.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-BoldItalic.woff2') format('woff2'),
          url('/fonts/roboto/roboto-BoldItalic.woff') format('woff'),
          url('/fonts/roboto/roboto-BoldItalic.ttf') format('truetype'),
          url('/fonts/roboto/roboto-BoldItalic.svg#Roboto-BoldItalic') format('svg');
      font-weight: bold;
      font-style: italic;
      font-display: fallback;
  }

  @font-face {
      font-family: 'Roboto';
      src: url('/fonts/roboto/roboto-Thin.eot');
      src: url('/fonts/roboto/roboto-Thin.eot?#iefix') format('embedded-opentype'),
          url('/fonts/roboto/roboto-Thin.woff2') format('woff2'),
          url('/fonts/roboto/roboto-Thin.woff') format('woff'),
          url('/fonts/roboto/roboto-Thin.ttf') format('truetype'),
          url('/fonts/roboto/roboto-Thin.svg#Roboto-Thin') format('svg');
      font-weight: 100;
      font-style: normal;
      font-display: fallback;
  }

  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Roboto', sans-serif;
  }
`

export default GlobalStyle
