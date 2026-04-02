import {
  AlertTriangle,
  ExternalLink,
  Menu,
  ShoppingBag,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useEffect, useState } from "react";

const OFFICIAL_SHOP_URL =
  "https://shop.mumbaiindians.com/?srsltid=AfmBOoqwMhs87OFOSbcdN8QrB-07e87F3raSieaD6maujoU6zm3ZIRD9";

const DISCLAIMER_KEY = "cyberkit_disclaimer_dismissed";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  img: string;
  alt: string;
}

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "MI Cyber Jersey",
    description:
      "Smart fabrics with integrated sensors and the soul of a champion.",
    price: "₹2,999",
    img: "https://i.imgur.com/wXaDvcd.jpg",
    alt: "MI Cyber Jersey",
  },
  {
    id: 2,
    name: "Carbon Strike Bat",
    description: "Carbon-fiber core with haptic feedback for perfect timing.",
    price: "₹8,999",
    img: "https://i.imgur.com/qo6fpLn.jpg",
    alt: "Carbon Strike Bat",
  },
  {
    id: 3,
    name: "Vortex Socks",
    description: "Compression tech with embedded temperature regulation.",
    price: "₹1,299",
    img: "https://i.imgur.com/VQSe42j.jpg",
    alt: "Vortex Socks",
  },
  {
    id: 4,
    name: "Neon Alternate Jersey",
    description: "Limited edition AR-reactive jersey with glow accents.",
    price: "₹2,499",
    img: "https://i.imgur.com/jMmvvl2.jpg",
    alt: "Neon Alternate Jersey",
  },
  {
    id: 5,
    name: "MI Training T-Shirt",
    description:
      "Breathable mesh construction for peak performance training sessions.",
    price: "₹999",
    img: "https://i.imgur.com/tFp8Z2E.jpg",
    alt: "MI Training T-Shirt",
  },
  {
    id: 6,
    name: "MI Snapback Cap",
    description: "Adjustable snapback with embroidered MI logo, UV protection.",
    price: "₹799",
    img: "https://i.imgur.com/3F5Z8Vn.jpg",
    alt: "MI Snapback Cap",
  },
  {
    id: 7,
    name: "Fan Hoodie",
    description:
      "Premium fleece hoodie with neon MI crest, perfect for match nights.",
    price: "₹1,899",
    img: "https://i.imgur.com/QpJRGFP.jpg",
    alt: "Fan Hoodie",
  },
];

function openShop() {
  window.open(OFFICIAL_SHOP_URL, "_blank", "noopener,noreferrer");
}

// ──────────────────────────────────────────────────────────────────────────────
// Sub-components
// ──────────────────────────────────────────────────────────────────────────────

function DisclaimerBanner({ onDismiss }: { onDismiss: () => void }) {
  return (
    <motion.div
      data-ocid="disclaimer.panel"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      className="w-full flex items-center justify-center gap-2 px-4 py-2 text-center text-sm font-bold"
      style={{
        background: "oklch(0.22 0.05 75)",
        color: "oklch(0.88 0.18 75)",
        borderBottom: "1px solid oklch(0.78 0.18 75 / 0.4)",
      }}
    >
      <AlertTriangle size={15} className="shrink-0" />
      <span>
        ⚡ Fan-made site — Not affiliated with Mumbai Indians. All products sold
        on the{" "}
        <button
          type="button"
          onClick={openShop}
          className="underline hover:no-underline cursor-pointer"
          style={{ color: "oklch(0.94 0.18 75)" }}
        >
          Official MI Shop
        </button>
        .
      </span>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss disclaimer"
        className="ml-2 shrink-0 opacity-70 hover:opacity-100 transition-opacity"
        data-ocid="disclaimer.close_button"
      >
        <X size={14} />
      </button>
    </motion.div>
  );
}

function CartBubble({
  count,
  onClick,
}: { count: number; onClick: () => void }) {
  return (
    <motion.button
      type="button"
      data-ocid="cart.button"
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      animate={{ scale: count > 0 ? [1, 1.25, 1] : 1 }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-sm cursor-pointer animate-pulse-glow"
      style={{
        background: "oklch(0.85 0.16 200)",
        color: "oklch(0.09 0.025 265)",
        fontFamily: "'Orbitron', sans-serif",
      }}
      aria-label={`Shopping cart, ${count} item${count !== 1 ? "s" : ""}`}
    >
      <ShoppingBag size={15} />
      <span>{count}</span>
    </motion.button>
  );
}

function Header({
  cartCount,
  onCartClick,
  scrolled,
  mobileOpen,
  onMobileToggle,
}: {
  cartCount: number;
  onCartClick: () => void;
  scrolled: boolean;
  mobileOpen: boolean;
  onMobileToggle: () => void;
}) {
  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled
          ? "oklch(0.09 0.025 265 / 0.98)"
          : "oklch(0.09 0.025 265 / 0.85)",
        backdropFilter: "blur(15px)",
        WebkitBackdropFilter: "blur(15px)",
        borderBottom: "1px solid oklch(0.52 0.22 260)",
        padding: scrolled ? "0.6rem 2rem" : "1.1rem 2rem",
      }}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        {/* Logo */}
        <a
          href="#home"
          className="font-orbitron text-xl font-bold uppercase tracking-wider transition-colors"
          style={{
            color: "oklch(0.85 0.16 200)",
            textShadow: "0 0 12px oklch(0.85 0.16 200 / 0.6)",
          }}
          data-ocid="nav.link"
        >
          CyberKit
        </a>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {(["#home", "#products", "#about"] as const).map((href, i) => {
            const labels = ["Home", "Gear", "About"];
            return (
              <a
                key={href}
                href={href}
                className="font-orbitron text-xs uppercase tracking-wider px-3 py-2 rounded transition-all duration-200 hover:text-primary"
                style={{ color: "oklch(0.72 0.05 265)" }}
                data-ocid={`nav.link.${i + 1}`}
              >
                {labels[i]}
              </a>
            );
          })}
        </nav>

        {/* Right: Official Shop + Cart */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={openShop}
            className="hidden md:flex items-center gap-1.5 font-orbitron text-xs uppercase tracking-wider px-4 py-2 rounded-full border transition-all duration-300 hover:bg-primary hover:text-primary-foreground cursor-pointer"
            style={{
              borderColor: "oklch(0.85 0.16 200)",
              color: "oklch(0.85 0.16 200)",
            }}
            data-ocid="nav.primary_button"
          >
            Official Shop <ExternalLink size={12} />
          </button>
          <CartBubble count={cartCount} onClick={onCartClick} />
          {/* Hamburger */}
          <button
            type="button"
            className="md:hidden p-2 cursor-pointer"
            onClick={onMobileToggle}
            aria-label="Toggle mobile menu"
            style={{ color: "oklch(0.85 0.16 200)" }}
            data-ocid="nav.toggle"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden overflow-hidden"
            aria-label="Mobile navigation"
          >
            <div
              className="flex flex-col items-center gap-4 py-6"
              style={{ borderTop: "1px solid oklch(0.85 0.16 200 / 0.2)" }}
            >
              {(["#home", "#products", "#about"] as const).map((href, i) => {
                const labels = ["Home", "Gear", "About"];
                return (
                  <a
                    key={href}
                    href={href}
                    onClick={onMobileToggle}
                    className="font-orbitron text-sm uppercase tracking-wider transition-colors hover:text-primary"
                    style={{ color: "oklch(0.72 0.05 265)" }}
                    data-ocid={`nav.link.${i + 4}`}
                  >
                    {labels[i]}
                  </a>
                );
              })}
              <button
                type="button"
                onClick={() => {
                  openShop();
                  onMobileToggle();
                }}
                className="font-orbitron text-sm uppercase tracking-wider px-6 py-2 rounded-full border transition-all duration-300 cursor-pointer"
                style={{
                  borderColor: "oklch(0.85 0.16 200)",
                  color: "oklch(0.85 0.16 200)",
                }}
                data-ocid="nav.secondary_button"
              >
                Official Shop →
              </button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection({ onShopClick }: { onShopClick: () => void }) {
  return (
    <section
      id="home"
      className="relative flex items-center justify-center min-h-screen overflow-hidden hero-bg"
      style={{ paddingTop: "130px", paddingBottom: "4rem" }}
    >
      {/* Rotating conic gradient overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute animate-rotate-conic"
        style={{
          width: "200vmax",
          height: "200vmax",
          top: "50%",
          left: "50%",
          backgroundImage:
            "repeating-conic-gradient(oklch(0.52 0.22 260 / 0.07) 0 10deg, transparent 10deg 20deg)",
          willChange: "transform",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-10 md:gap-16">
        {/* Left: product image */}
        <motion.div
          className="flex-1 flex justify-center"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div
            className="relative rounded-2xl overflow-hidden cursor-crosshair"
            style={{
              boxShadow:
                "0 0 50px oklch(0.52 0.22 260 / 0.5), 0 0 100px oklch(0.85 0.16 200 / 0.15)",
            }}
          >
            <motion.img
              src="https://i.imgur.com/wXaDvcd.jpg"
              alt="MI Cyber Jersey – Hero"
              className="w-full max-w-xs md:max-w-sm rounded-2xl block"
              loading="lazy"
              whileHover={{ rotateY: -10, rotateX: 5, scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{ transformStyle: "preserve-3d" }}
            />
          </div>
        </motion.div>

        {/* Right: text */}
        <motion.div
          className="flex-1 text-center md:text-left"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
        >
          <h1
            className="font-orbitron font-bold uppercase leading-tight mb-5 neon-text"
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
              letterSpacing: "0.04em",
            }}
          >
            ELEVATE THE GAME
          </h1>
          <p
            className="text-base md:text-lg leading-relaxed mb-8"
            style={{ color: "oklch(0.72 0.05 265)", maxWidth: "42ch" }}
          >
            The 2026 Mumbai Indians Cyber-Collection has arrived. Smart fabrics,
            integrated sensors, and the soul of a champion — discover it all on
            the Official MI Store.
          </p>
          <button
            type="button"
            onClick={onShopClick}
            className="inline-flex items-center gap-2 font-orbitron font-bold uppercase text-sm px-8 py-4 rounded-full border-2 transition-all duration-300 cursor-pointer"
            style={{
              borderColor: "oklch(0.85 0.16 200)",
              color: "oklch(0.85 0.16 200)",
              boxShadow: "0 0 20px oklch(0.85 0.16 200 / 0.25)",
            }}
            onMouseEnter={(e) => {
              const t = e.currentTarget;
              t.style.background = "oklch(0.85 0.16 200)";
              t.style.color = "oklch(0.09 0.025 265)";
              t.style.boxShadow = "0 0 45px oklch(0.85 0.16 200 / 0.7)";
              t.style.transform = "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              const t = e.currentTarget;
              t.style.background = "transparent";
              t.style.color = "oklch(0.85 0.16 200)";
              t.style.boxShadow = "0 0 20px oklch(0.85 0.16 200 / 0.25)";
              t.style.transform = "translateY(0)";
            }}
            data-ocid="hero.primary_button"
          >
            Shop Official MI Store <ExternalLink size={16} />
          </button>
        </motion.div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
  onBuy,
}: { product: Product; index: number; onBuy: () => void }) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleBuy = useCallback(() => {
    setClicked(true);
    onBuy();
    setTimeout(() => setClicked(false), 1200);
  }, [onBuy]);

  return (
    <motion.article
      data-ocid={`products.item.${index}`}
      className="glint-card rounded-2xl p-5 flex flex-col cursor-default"
      style={{
        background:
          "linear-gradient(135deg, oklch(0.13 0.045 265), oklch(0.20 0.07 265))",
        border: `1px solid oklch(0.85 0.16 200 / ${hovered ? "0.6" : "0.2"})`,
        boxShadow: hovered
          ? "0 20px 40px oklch(0.52 0.22 260 / 0.45), 0 0 30px oklch(0.85 0.16 200 / 0.15)"
          : "0 4px 16px oklch(0 0 0 / 0.4)",
        transform: hovered ? "translateY(-12px)" : "translateY(0)",
        transition:
          "transform 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275), box-shadow 0.35s ease, border-color 0.35s ease",
      }}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: (index - 1) * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="overflow-hidden rounded-xl mb-4">
        <img
          src={product.img}
          alt={product.alt}
          loading="lazy"
          className="w-full h-52 object-cover rounded-xl transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
      </div>

      {/* Price badge */}
      <div className="mb-2">
        <span
          className="inline-block font-orbitron text-xs font-bold px-3 py-1 rounded-full"
          style={{
            background: "oklch(0.52 0.22 260 / 0.25)",
            color: "oklch(0.85 0.16 200)",
            border: "1px solid oklch(0.52 0.22 260 / 0.4)",
          }}
        >
          {product.price}
        </span>
      </div>

      {/* Name */}
      <h3
        className="font-orbitron font-bold text-base mb-2 leading-snug"
        style={{ color: "oklch(0.85 0.16 200)" }}
      >
        {product.name}
      </h3>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-5 flex-1"
        style={{ color: "oklch(0.72 0.05 265)" }}
      >
        {product.description}
      </p>

      {/* Buy button */}
      <button
        type="button"
        onClick={handleBuy}
        data-ocid={`products.primary_button.${index}`}
        className="w-full font-orbitron font-bold text-xs uppercase tracking-wider px-4 py-3 rounded-full transition-all duration-300 cursor-pointer flex items-center justify-center gap-2"
        style={{
          background: clicked
            ? "linear-gradient(45deg, oklch(0.72 0.18 145), oklch(0.82 0.2 150))"
            : "linear-gradient(45deg, oklch(0.40 0.22 260), oklch(0.65 0.18 200))",
          color: "oklch(0.97 0.01 265)",
          boxShadow: clicked
            ? "0 0 25px oklch(0.72 0.18 145 / 0.6)"
            : "0 0 15px oklch(0.52 0.22 260 / 0.3)",
        }}
        aria-label={`Buy ${product.name} on Official MI Shop`}
      >
        <ExternalLink size={12} />
        {clicked ? "Opening Shop..." : "Buy on Official Shop →"}
      </button>
    </motion.article>
  );
}

function ProductGrid({ onBuy }: { onBuy: () => void }) {
  return (
    <section id="products" className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-orbitron font-bold text-3xl md:text-4xl uppercase mb-3 neon-text"
            style={{ letterSpacing: "0.06em" }}
          >
            Official Gear Collection
          </h2>
          <p style={{ color: "oklch(0.72 0.05 265)" }}>
            Discover the full range — all products available on the Official MI
            Shop
          </p>
        </motion.div>

        <div
          className="grid gap-7"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          }}
        >
          {PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              index={i + 1}
              onBuy={onBuy}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer
      id="about"
      className="py-16 px-6 text-center"
      style={{
        background: "oklch(0.07 0.02 265)",
        borderTop: "1px solid oklch(0.35 0.18 260 / 0.5)",
      }}
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center gap-6">
        {/* Logo */}
        <div
          className="font-orbitron text-2xl font-bold uppercase tracking-wider"
          style={{
            color: "oklch(0.85 0.16 200)",
            textShadow: "0 0 15px oklch(0.85 0.16 200 / 0.5)",
          }}
        >
          CyberKit Fan Hub
        </div>
        <p className="text-sm" style={{ color: "oklch(0.72 0.05 265)" }}>
          Your one-stop discovery for Mumbai Indians fan merchandise.
        </p>

        {/* Disclaimer */}
        <div
          className="rounded-xl px-6 py-4 text-sm leading-relaxed"
          style={{
            background: "oklch(0.14 0.04 265)",
            border: "1px solid oklch(0.78 0.18 75 / 0.4)",
            color: "oklch(0.88 0.18 75)",
          }}
        >
          <p className="font-bold mb-1">⚠ Fan Site Disclaimer</p>
          <p style={{ color: "oklch(0.78 0.14 75)" }}>
            CyberKit Fan Hub is an independent fan page and is{" "}
            <strong>
              not affiliated with or endorsed by Mumbai Indians or Reliance
              Industries
            </strong>
            . All purchases are made through the Official Mumbai Indians Shop.
            All trademarks are property of their respective owners.
          </p>
        </div>

        {/* Official Shop CTA */}
        <button
          type="button"
          onClick={openShop}
          className="inline-flex items-center gap-2 font-orbitron font-bold uppercase text-sm px-8 py-3 rounded-full border-2 transition-all duration-300 cursor-pointer"
          style={{
            borderColor: "oklch(0.85 0.16 200)",
            color: "oklch(0.85 0.16 200)",
            boxShadow: "0 0 15px oklch(0.85 0.16 200 / 0.25)",
          }}
          onMouseEnter={(e) => {
            const t = e.currentTarget;
            t.style.background = "oklch(0.85 0.16 200)";
            t.style.color = "oklch(0.09 0.025 265)";
            t.style.boxShadow = "0 0 40px oklch(0.85 0.16 200 / 0.7)";
          }}
          onMouseLeave={(e) => {
            const t = e.currentTarget;
            t.style.background = "transparent";
            t.style.color = "oklch(0.85 0.16 200)";
            t.style.boxShadow = "0 0 15px oklch(0.85 0.16 200 / 0.25)";
          }}
          data-ocid="footer.primary_button"
        >
          Visit Official MI Shop <ExternalLink size={14} />
        </button>

        {/* Copyright + Caffeine */}
        <div
          className="text-xs space-y-1"
          style={{ color: "oklch(0.55 0.04 265)" }}
        >
          <p>© {year} CyberKit Fan Hub. Fan-made, not official.</p>
          <p>
            Built with <span style={{ color: "oklch(0.72 0.18 15)" }}>♥</span>{" "}
            using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:no-underline"
              style={{ color: "oklch(0.72 0.05 265)" }}
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

// ──────────────────────────────────────────────────────────────────────────────
// App
// ──────────────────────────────────────────────────────────────────────────────

export default function App() {
  const [cartCount, setCartCount] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showDisclaimer, setShowDisclaimer] = useState(() => {
    return sessionStorage.getItem(DISCLAIMER_KEY) !== "dismissed";
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleShopClick = useCallback(() => {
    setCartCount((prev) => prev + 1);
    openShop();
  }, []);

  const handleDismissDisclaimer = useCallback(() => {
    sessionStorage.setItem(DISCLAIMER_KEY, "dismissed");
    setShowDisclaimer(false);
  }, []);

  const disclaimerHeight = showDisclaimer ? 40 : 0;
  const headerHeight = scrolled ? 56 : 72;
  const topOffset = headerHeight + disclaimerHeight;

  return (
    <div
      className="min-h-screen"
      style={{ background: "oklch(0.09 0.025 265)" }}
    >
      <Header
        cartCount={cartCount}
        onCartClick={handleShopClick}
        scrolled={scrolled}
        mobileOpen={mobileOpen}
        onMobileToggle={() => setMobileOpen((v) => !v)}
      />

      {/* Disclaimer banner — fixed directly below header */}
      <div
        className="fixed left-0 right-0 z-40"
        style={{ top: `${headerHeight}px` }}
      >
        <AnimatePresence>
          {showDisclaimer && (
            <DisclaimerBanner onDismiss={handleDismissDisclaimer} />
          )}
        </AnimatePresence>
      </div>

      <main style={{ paddingTop: `${topOffset}px` }}>
        <HeroSection onShopClick={handleShopClick} />

        <div
          className="w-full h-px max-w-4xl mx-auto"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(0.85 0.16 200 / 0.4), transparent)",
          }}
        />

        <ProductGrid onBuy={handleShopClick} />
      </main>

      <Footer />
    </div>
  );
}
