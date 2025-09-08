'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { BOOK_TEE_TIME_URL, NAVIGATION_LINKS, SITE_TITLE } from '@/consts'
import logo from '@/assets/logo.png'
import { Button } from './ui/button'
import type { SubmenuLink } from '@/types'


export default function Header({ pathname }: { pathname?: string }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-background text-foreground">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5 text-foreground">
            <span className="sr-only">{SITE_TITLE}</span>
            <img
              alt={SITE_TITLE}
              src={logo.src}
              className="h-8 w-auto bg-none rounded"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <PopoverGroup className="hidden lg:flex lg:gap-x-12 text-foreground">
          {NAVIGATION_LINKS.map((link) => (
            link.submenu?.length ? (
              <Popover className="relative z-50" key={link.name}>
                <PopoverButton className={`flex items-center gap-x-1 text-sm/6 font-semibold text-foreground ${pathname === link.href ? 'underline underline-offset-4' : ''}`}>
                  {link.name}
                  <ChevronDownIcon aria-hidden="true" className="size-5 flex-none text-muted-foreground" />
                </PopoverButton>

                <PopoverPanel
                  transition
                  className="absolute left-1/2 z-10 mt-3 w-screen max-w-md -translate-x-1/2 overflow-hidden rounded-3xl bg-popover text-popover-foreground shadow-lg outline-1 outline-border"
                >
                  <div className="p-4">
                    {link.submenu?.map((item: SubmenuLink) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm/6 hover:bg-card"
                      >
                        <div className="flex size-11 flex-none items-center justify-center rounded-lg bg-card">
                          <item.icon
                            aria-hidden="true"
                            className="size-6 text-muted-foreground group-hover:text-foreground"
                          />
                        </div>
                        <div className="flex-auto">
                          <a href={item.href} className="block font-semibold text-foreground">
                            {item.name}
                            <span className="absolute inset-0" />
                          </a>
                          <p className="mt-1 text-muted-foreground">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-border bg-card">
                    {link.callsToAction?.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={`flex items-center justify-center gap-x-2.5 p-3 text-sm/6 font-semibold text-foreground hover:bg-card ${pathname === item.href ? 'underline underline-offset-4' : ''}`}
                      >
                        <item.icon aria-hidden="true" className="size-5 flex-none text-muted-foreground hover:text-foreground" />
                        {item.name}
                      </a>
                    ))}
                  </div>
                </PopoverPanel>
              </Popover>) : (
              <a key={link.name} href={link.href} className={`text-sm/6 font-semibold text-foreground ${pathname === link.href ? 'underline underline-offset-4' : ''}`}>
                {link.name}
              </a>)
          ))}
        </PopoverGroup>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Button asChild className="bg-primary text-primary-foreground">
            <a href={BOOK_TEE_TIME_URL}>Book a tee time</a>
          </Button>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-background text-foreground p-6 sm:max-w-sm sm:ring-1 sm:ring-border">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5 text-foreground">
              <span className="sr-only">{SITE_TITLE}</span>
              <img
                alt={SITE_TITLE}
                src={logo.src}
                className="h-8 w-auto bg-none"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-foreground"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-border">
              <div className="space-y-2 py-6">
                {NAVIGATION_LINKS.map((link) => (
                  link.submenu?.length || link.callsToAction?.length ? (
                    <Disclosure as="div" key={link.name} className="-mx-3">
                      <DisclosureButton className={`group flex w-full items-center justify-between rounded-lg py-2 pr-3.5 pl-3 text-base/7 font-semibold text-foreground hover:bg-card ${pathname === link.href ? 'underline underline-offset-4' : ''} `}>
                        {link.name}
                        <ChevronDownIcon aria-hidden="true" className="size-5 flex-none group-data-open:rotate-180 text-muted" />
                      </DisclosureButton>
                      <DisclosurePanel className="mt-2 space-y-2">
                        {[...(link.submenu || []), ...(link.callsToAction || [])].map((item) => (
                          <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            className="block rounded-lg py-2 pr-3 pl-6 text-sm/7 font-semibold text-foreground hover:bg-card"
                          >
                            {item.name}
                          </DisclosureButton>
                        ))}
                      </DisclosurePanel>
                    </Disclosure>) : (
                    <a
                      key={link.name}
                      href={link.href}
                      className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-foreground hover:bg-card ${pathname === link.href ? 'underline underline-offset-4' : ''}`}
                    >
                      {link.name}
                    </a>)
                ))
                }
              </div>
              <div className="py-6">
                <Button className="w-full bg-primary text-primary-foreground">Book a tee time</Button>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header >
  )
}
