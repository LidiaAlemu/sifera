import Link from "next/link";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-cream">
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-center mb-6">
            About Sifera
          </h1>
          <p className="text-xl font-body text-center max-w-3xl mx-auto text-cream/90">
            A quiet book café and alternative space where coffee, books, and community meet.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left: Atmosphere Image */}
            <div className="flex-1 w-full">
              <img
                src="https://picsum.photos/800/600?random=20"
                alt="Sifera atmosphere"
                className="w-full h-auto rounded-xl shadow-lg object-cover aspect-[4/3]"
              />
            </div>

            {/* Right: Story */}
            <div className="flex-1 space-y-6">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark">
                Our Story
              </h2>
              <p className="text-lg font-body text-dark/80 leading-relaxed">
                Sifera is a quiet book café and alternative space created for
                those who appreciate thoughtful moments, meaningful
                conversations, and a peaceful atmosphere. Whether you&apos;re
                looking for a cozy corner to read, a comfortable place to work,
                or a welcoming environment to connect with others, Sifera offers
                a space where ideas, creativity, and community come together.
              </p>
              <p className="text-lg font-body text-dark/80 leading-relaxed">
                Our shelves are filled with books waiting to be explored, while
                our café serves coffee, beverages, and light refreshments to
                accompany your reading experience. Beyond the café, Sifera hosts
                community events, discussions, workshops, and creative gatherings
                that encourage learning, collaboration, and personal growth.
              </p>
              <p className="text-lg font-body text-dark/80 leading-relaxed">
                We believe that great stories, inspiring ideas, and genuine
                connections have the power to bring people together. That&apos;s
                why we&apos;ve created a space where you can slow down, reflect,
                discover new perspectives, and feel at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-8">
            Experience Sifera Today
          </h2>
          <p className="text-lg font-body text-cream/90 mb-12 max-w-2xl mx-auto">
            Whether you&apos;re craving a perfect cup of coffee or looking for your next great read, we&apos;re here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/menu"
              className="px-8 py-4 bg-accent text-dark font-body font-semibold rounded-lg hover:bg-white transition-colors"
            >
              Order Now
            </Link>
            <Link
              href="/books"
              className="px-8 py-4 bg-transparent border-2 border-white text-white font-body font-semibold rounded-lg hover:bg-white hover:text-primary transition-colors"
            >
              View Books
            </Link>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-xl font-heading font-semibold text-dark">
                Knowledge
              </h3>
              <p className="font-body text-dark/70">
                Curating a diverse collection of books that inspire, educate, and entertain.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">☕</div>
              <h3 className="text-xl font-heading font-semibold text-dark">
                Quality
              </h3>
              <p className="font-body text-dark/70">
                Serving exceptional coffee and refreshments made with care and premium ingredients.
              </p>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-heading font-semibold text-dark">
                Community
              </h3>
              <p className="font-body text-dark/70">
                Fostering connections and creating a welcoming space for everyone.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
