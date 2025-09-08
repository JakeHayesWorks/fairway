// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

import { ClockIcon, SunIcon, TrophyIcon, TvIcon } from "@heroicons/react/24/outline";
import type { NavLink, SubmenuLink } from "./types";

export const SITE_TITLE = 'The Fairway Columbus';
export const SITE_DESCRIPTION = 'Come and visit The Fairway Columbus';
export const BOOK_TEE_TIME_URL = 'https://booking.trackmangolf.com/venues/fairway/booking/bays';
export const CONTACT_EMAIL = 'TheFairwayColumbus@gmail.com';
export const CONTACT_PHONE = '614-888-1055';

export const GOLF_SUBMENU: SubmenuLink[] = [
    { name: 'Tee Times', href: 'https://yourgolfbooking.com/venues/fairway/booking/bays', description: 'Book your tee time online', icon: ClockIcon },
    { name: 'Summer Range Pass', href: '/golf/range-pass', description: 'Unlimited range balls all summer', icon: SunIcon },
    { name: 'Ryder Cup 2025', href: '/golf/ryder-cup-2025', description: 'Join our Ryder Cup team for 2025', icon: TrophyIcon },
    { name: 'MNF Golf Scramble', href: '/golf/mnf-golf-scramble', description: 'Join us every Monday night for a fun scramble', icon: TvIcon },
];

export const NAVIGATION_LINKS: NavLink[] = [
    { name: 'Home', href: '/' },
    { name: 'Golf', href: '/golf', submenu: GOLF_SUBMENU },
    { name: 'Leagues', href: '/leagues' },
    { name: 'Lessons', href: '/lessons' },
    { name: 'Event Rentals', href: '/events' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
]