import { useState } from "react";
import { motion } from "framer-motion";
import { router } from "@inertiajs/react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);

    // If you have a Laravel route like:
    // Route::post('/newsletter', [NewsletterController::class, 'store']);

    router.post(
      "/newsletter",
      { email },
      {
        onFinish: () => {
          setLoading(false);
          setEmail("");
        },
      }
    );
  };

  return (
    <section className="relative h-[620px] w-full overflow-hidden bg-[#0B0F14]">
      {/* Background */}
      <motion.div
        initial={{ scale: 1.08, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/Images/pexels-suzyhazelwood-1329645.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
      </motion.div>

      {/* Accent Glow */}
      <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[520px] h-[520px] rounded-full bg-[#3BF5C4]/10 blur-[140px]" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center max-w-3xl"
        >
          <p className="text-sm uppercase tracking-widest text-[#3BF5C4] mb-6">
            Newsletter
          </p>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-light text-white tracking-tight mb-6">
            The Future of Finance
          </h2>

          <p className="text-lg md:text-xl text-[#9CA3AF] leading-relaxed mb-14">
            Receive research, market insights, and platform updates
            <br />
            directly from the Aurea Octave team.
          </p>

          {/* Form */}
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              className="
                w-full flex-1 rounded-xl px-6 py-4
                bg-white/[0.06] border border-white/10
                text-white placeholder-[#9CA3AF]
                backdrop-blur-md
                focus:outline-none focus:ring-2 focus:ring-[#3BF5C4]/40
                transition
              "
            />

            <motion.button
              type="submit"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              disabled={loading}
              className="
                px-8 py-4 rounded-xl
                bg-[#3BF5C4] text-black font-medium
                hover:opacity-90 transition
                whitespace-nowrap
                disabled:opacity-50
              "
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </motion.button>
          </motion.form>

          <p className="mt-8 text-xs text-white/40">
            No spam. Unsubscribe at any time.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
