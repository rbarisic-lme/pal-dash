import TimeAgo from 'javascript-time-ago';

import de from 'javascript-time-ago/locale/de'
import en from 'javascript-time-ago/locale/en'

TimeAgo.addLocale(en)
TimeAgo.addLocale(de)

// todo: do programatically
TimeAgo.setDefaultLocale('en')


// usage: timeAgo.format(Date.now(), 'round')
// 
// timeAgo.format(new Date(), 'twitter-now')
// 0 seconds ago → "now"
export const timeAgo = new TimeAgo(['en-US', 'de-DE'])
