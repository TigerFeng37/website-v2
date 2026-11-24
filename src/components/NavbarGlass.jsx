import { forwardRef, useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './glass.css'

// Function to sample background color at a specific position
const sampleBackgroundColor = (x, y) => {
  return new Promise((resolve) => {
    // Create a temporary canvas to sample the background
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = 1
    canvas.height = 1
    
    // Try to get the color from the element at the specified position
    const element = document.elementFromPoint(x, y)
    if (element) {
      const computedStyle = window.getComputedStyle(element)
      let backgroundColor = computedStyle.backgroundColor
      
      // If background is transparent, traverse up the DOM tree
      let currentElement = element
      while (backgroundColor === 'rgba(0, 0, 0, 0)' || backgroundColor === 'transparent') {
        currentElement = currentElement.parentElement
        if (!currentElement) break
        backgroundColor = window.getComputedStyle(currentElement).backgroundColor
      }
      
      resolve(backgroundColor || 'rgba(0, 0, 0, 0)')
    } else {
      resolve('rgba(0, 0, 0, 0)')
    }
  })
}

// Function to convert rem to pixels
const remToPx = (rem) => {
  return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

// Function to extract RGB values and create a tint
const createTintFromColor = (colorString) => {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = colorString
  ctx.fillRect(0, 0, 1, 1)
  const imageData = ctx.getImageData(0, 0, 1, 1)
  const [r, g, b, a] = imageData.data
  
  // Create a subtle tint for border (more opaque)
  const borderTint = `rgba(${r}, ${g}, ${b}, 0.3)`
  
  // Create a tint for box-shadow (darker, more subtle)
  const shadowTintR = Math.round(r * 0.4)
  const shadowTintG = Math.round(g * 0.4) 
  const shadowTintB = Math.round(b * 0.4)
  const shadowTint = `rgba(${shadowTintR}, ${shadowTintG}, ${shadowTintB}, 0.75)`
  
  // Create a highlight tint for Button's first box-shadow (lighter version)
  const highlightTintR = Math.round(r + (255 - r) * 0.6)
  const highlightTintG = Math.round(g + (255 - g) * 0.6)
  const highlightTintB = Math.round(b + (255 - b) * 0.6)
  const highlightTint = `rgba(${highlightTintR}, ${highlightTintG}, ${highlightTintB}, 0.85)`
  
  return { borderTint, shadowTint, highlightTint }
}

const NavbarGlass = forwardRef(({ 
  children,
  style = {},
  ...props 
}, ref) => {
  const [tintColors, setTintColors] = useState({
    borderTint: 'rgba(255, 255, 255, 0.10)',
    shadowTint: 'rgba(0, 0, 0, 0.75)',
    highlightTint: 'rgba(255, 255, 255, 0.85)'
  })
  const buttonRef = useRef(null)
  const [isSafari, setIsSafari] = useState(false)

  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Detect Safari browser
  useEffect(() => {
    const safari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    setIsSafari(safari);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      // Simple trigger - either scrolled or not
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const updateTint = async () => {
      try {
        // Sample color 1rem from top-left corner
        const oneRemInPx = remToPx(1)
        const sampledColor = await sampleBackgroundColor(oneRemInPx, oneRemInPx)
        
        if (sampledColor && sampledColor !== 'rgba(0, 0, 0, 0)') {
          const tints = createTintFromColor(sampledColor)
          setTintColors(tints)
        }
      } catch (error) {
        console.warn('Could not sample background color:', error)
      }
    }

    // Update tint on mount and when window resizes
    updateTint()
    
    const handleResize = () => updateTint()
    window.addEventListener('resize', handleResize)
    
    // Also update periodically to catch dynamic background changes
    const interval = setInterval(updateTint, 1000)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearInterval(interval)
    }
  }, [])

  return (
    <>
      <svg style={{ position: 'absolute', width: 0, height: 0 }}>
        <defs>
          <filter id="displacement-filter" x="0" y="0" width="100%" height="100%">
            <filter id="chroma-abbr">
              <feColorMatrix type="matrix" 
                result="red_"             
                values="4 0 0 0 0
                        0 0 0 0 0 
                        0 0 0 0 0 
                        0 0 0 1 0"/>
              <feOffset in="red_" dx="2" dy="0" result="red"/>
              <feColorMatrix type="matrix" 
                in="SourceGraphic"             
                result="blue_"             
                values="0 0 0 0 0
                        0 3 0 0 0 
                        0 0 10 0 0 
                        0 0 0 1 0"/>
              <feOffset in="blue_" dx="-3" dy="0" result="blue"/>    
              <feBlend mode="screen" in="red" in2="blue"/>
            </filter>
            <feImage
              id="filter-image"
              xlinkHref="assets/displace.png"
              x="0"
              y="0"
              result="glass"
              preserveAspectRatio="none"
            ></feImage>
            <feBlend
              in="glass"
              in2="chroma-abbr"
              result="finished-glass"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="finished-glass"
              xChannelSelector="R"
              yChannelSelector="G" 
              scale="20"
            />
          </filter>
        </defs>
      </svg>
      
      <div className="navbar-wrapper bg-[linear-gradient(to_bottom,rgba(0,0,0,1),rgba(0,0,0,0))] fixed top-0 left-0 w-full py-4 px-4 flex flex-row justify-center z-[99999] pointer-events-none isolate mb-[-7rem]">
        <div
            ref={ref || buttonRef}
            className={`
                Glass
                mx-0
                lg:mx-[20rem]
                w-full
                max-w-full
                text-white/85
                pointer-events-auto
                relative
                isolate
                transition-all
                duration-500
                delay-100
                ${scrolled ? 'md:w-[27rem]' : 'md:w-[100%]'}
            `
            }
            style={{
              bottom: '-1px',
              backdropFilter: isSafari 
                ? 'blur(1px) saturate(175%) brightness(0.8)' 
                : 'url(#displacement-filter) blur(1px) saturate(175%) brightness(0.8)',
              WebkitBackdropFilter: isSafari 
                ? 'url(#displacement-filter) blur(1px) saturate(175%) brightness(0.8)' 
                : 'url(#displacement-filter) blur(1px) saturate(175%) brightness(0.8)',
              boxShadow: '1px 1px 5px -1px rgba(128,128,128, 0.35) inset, -1px -1px 3px -1px rgba(255, 255, 255, 0.25) inset, -5px -5px 20px rgba(0,0,0, 0.05) inset',
            }}
            {...props}
        >
            <div className="button-frame"></div>
            <div className="button-inner"></div>
            <div className="button-center"></div>
            <div className="button-core"></div>
            <div className="button-children w-full flex flex-row justify-between items-center px-1 gap-2 sm:px-2 sm:gap-4 md:gap-6">
                <div className="flex flex-row items-start shrink-0">
                    <Link to="/" className="text-4xl font-medium font-['IBM_Plex_Sans'] tracking-tighter">FENG</Link>
                </div>
                <div className="nav-divider flex w-full mt-[0.75rem] sm:mt-[1rem] md:mt-[1.5rem] ml-[-3rem] sm:ml-[-5rem] md:ml-[-7rem]">
                    <div className="w-[2.5rem] sm:w-[4rem] md:w-[6.15rem]"></div>
                    <div className="flex-grow overflow-hidden">
                    <div 
                        className={`border-t-4 border-[#72EAE0] transition-all duration-500 ease-out origin-left ${
                        scrolled ? 'w-[1.25rem]' : 'w-full'
                        }`}
                    ></div>
                    </div>
                </div>
                <div className="flex flex-row items-start gap-2 sm:gap-4 md:gap-6 mr-0 md:mr-2 shrink-0 text-[0.65rem] sm:text-xs md:text-base">
                    <Link to="/" className={`hover:text-teal-400 transition-colors whitespace-nowrap ${location.pathname === '/' ? 'text-teal-400' : ''}`}>WORKS</Link>
                    <Link to="/about" className={`hover:text-teal-400 transition-colors whitespace-nowrap ${location.pathname === '/about' ? 'text-teal-400' : ''}`}>ABOUT</Link>
                    <a href="https://photos.feng.works" className="hover:text-teal-400 transition-colors whitespace-nowrap">PHOTOS ↗︎</a>
                </div>
            </div>
        </div>
      </div>
    </>
  )
})

NavbarGlass.displayName = 'NavbarGlass'

export default NavbarGlass;