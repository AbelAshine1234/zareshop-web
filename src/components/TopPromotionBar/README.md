# TopPromotionBar Component

A flexible, translatable promotion banner component that remembers when it's been dismissed by the user.

## Features

- **Session dismissal**: Can be closed during the current page session (reappears on reload)
- **Multi-language support**: Full i18n integration with translation keys
- **Flexible content**: Support for different promotion types (iOS app, sales, newsletters, etc.)
- **Multiple action types**: Modal alerts, external links, or custom functions

## Basic Usage

```jsx
import TopPromotionBar from './components/TopPromotionBar'

// Default iOS app promotion
<TopPromotionBar />
```

## Custom Promotion Data

```jsx
import TopPromotionBar, { promotionTypes } from './components/TopPromotionBar'

// Use predefined promotion types
<TopPromotionBar promotionData={promotionTypes.sale} />

// Custom promotion
const customPromotion = {
  type: 'holiday-sale',
  id: 'zareshop-holiday-2024',
  icon: customIcon,
  textKey: 'promotions.holidayText',
  actionType: 'link',
  actionKey: 'buttons.shopNow',
  href: '/holiday-sale'
}

<TopPromotionBar promotionData={customPromotion} />
```

## Action Types

- **modal**: Shows alert with translation content
- **link**: Opens external link in new tab
- **custom**: Executes custom function

## Translation Keys

Add these keys to your translation files:

```json
{
  "promotions": {
    "saleText": "🎉 Big Sale! Up to 70% off - Limited time!",
    "newsletterText": "📧 Subscribe for exclusive deals!",
    "appText": "📱 Download our mobile app!"
  },
  "buttons": {
    "shopNow": "Shop Now",
    "signUp": "Sign Up"
  }
}
```

## Session Behavior

- **During navigation**: Once dismissed, banner stays hidden when navigating between pages
- **After app reload**: Banner reappears fresh, regardless of previous dismissal
- **SessionStorage**: Uses sessionStorage to remember dismissal during the browser session but resets on app reload

This provides the optimal balance: users can dismiss annoying banners that stay dismissed during their browsing session, but promotions get fresh visibility on each app launch.
