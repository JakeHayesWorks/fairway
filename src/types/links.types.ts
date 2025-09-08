export type SubmenuLink = {
    name: string
    href: string
    description: string
    icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>
}

export type NavLink = {
    name: string
    href: string
    submenu?: SubmenuLink[]
    callsToAction?: SubmenuLink[]
}