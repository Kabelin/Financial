import React from 'react'
import './styles.css'

export default function Drawer() {
  const drawer = () => {
    /**
     * Element.closest() polyfill
     * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
     */
    if (!Element.prototype.closest) {
      if (!Element.prototype.matches) {
        Element.prototype.matches =
          Element.prototype.msMatchesSelector ||
          Element.prototype.webkitMatchesSelector
      }
      Element.prototype.closest = (s) => {
        const el = this
        let ancestor = this
        if (!document.documentElement.contains(el)) return null
        do {
          if (ancestor.matches(s)) return ancestor
          ancestor = ancestor.parentElement
        } while (ancestor !== null)
        return null
      }
    }

    //
    // Settings
    //
    const settings = {
      speedOpen: 50,
      speedClose: 350,
      activeClass: 'is-active',
      visibleClass: 'is-visible',
      selectorTarget: '[data-drawer-target]',
      selectorTrigger: '[data-drawer-trigger]',
      selectorClose: '[data-drawer-close]',
    }

    //
    // Methods
    //

    // Toggle accessibility
    const toggleccessibility = (event) => {
      if (event.getAttribute('aria-expanded') === 'true') {
        event.setAttribute('aria-expanded', false)
      } else {
        event.setAttribute('aria-expanded', true)
      }
    }

    // Open Drawer
    const openDrawer = (trigger) => {
      // Find target
      const target = document.getElementById(
        trigger.getAttribute('aria-controls')
      )

      // Make it active
      target.classList.add(settings.activeClass)

      // Make body overflow hidden so it's not scrollable
      document.documentElement.style.overflow = 'hidden'

      // Toggle accessibility
      toggleccessibility(trigger)

      // Make it visible
      setTimeout(() => {
        target.classList.add(settings.visibleClass)
      }, settings.speedOpen)
    }

    // Close Drawer
    const closeDrawer = (event) => {
      // Find target
      const closestParent = event.closest(settings.selectorTarget)
      const childrenTrigger = document.querySelector(
        `[aria-controls="${closestParent.id}"`
      )

      // Make it not visible
      closestParent.classList.remove(settings.visibleClass)

      // Remove body overflow hidden
      document.documentElement.style.overflow = ''

      // Toggle accessibility
      toggleccessibility(childrenTrigger)

      // Make it not active
      setTimeout(() => {
        closestParent.classList.remove(settings.activeClass)
      }, settings.speedClose)
    }

    // Click Handler
    const clickHandler = (event) => {
      // Find elements
      const toggle = event.target
      const open = toggle.closest(settings.selectorTrigger)
      const close = toggle.closest(settings.selectorClose)

      // Open drawer when the open button is clicked
      if (open) {
        openDrawer(open)
      }

      // Close drawer when the close button (or overlay area) is clicked
      if (close) {
        closeDrawer(close)
      }

      // Prevent default link behavior
      if (open || close) {
        event.preventDefault()
      }
    }

    // Keydown Handler, handle Escape button
    const keydownHandler = (event) => {
      if (event.key === 'Escape' || event.keyCode === 27) {
        // Find all possible drawers
        const drawers = document.querySelectorAll(settings.selectorTarget)

        // Find active drawers and close them when escape is clicked
        drawers.forEach((e, i) => {
          if (drawers[i].classList.contains(settings.activeClass)) {
            closeDrawer(drawers[i])
          }
        })
      }
    }

    //
    // Inits & Event Listeners
    //
    document.addEventListener('click', clickHandler, false)
    document.addEventListener('keydown', keydownHandler, false)
  }

  drawer()
  return (
    <section
      className="drawer drawer--left"
      id="drawer-name"
      data-drawer-target
    >
      <div className="drawer__overlay" data-drawer-close tabIndex="-1" />
      <div className="drawer__wrapper">
        <div className="drawer__header">
          <div className="drawer__title">Drawer Title Here</div>
          <button
            type="button"
            className="drawer__close"
            data-drawer-close
            aria-label="Close Drawer"
          />
        </div>
        <div className="drawer__content">Drawer Content Here</div>
      </div>
    </section>
  )
}
