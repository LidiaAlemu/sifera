export default function About() {
  return (
    <section className="bg-cream py-16 md:py-20">
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
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-dark">
              About Sifera
            </h2>
            <p className="text-lg font-sans text-dark/80 leading-relaxed">
              Sifera is a quiet book café and alternative space created for
              those who appreciate thoughtful moments, meaningful
              conversations, and a peaceful atmosphere. Whether you&apos;re
              looking for a cozy corner to read, a comfortable place to work,
              or a welcoming environment to connect with others, Sifera offers
              a space where ideas, creativity, and community come together.
            </p>
            <p className="text-lg font-sans text-dark/80 leading-relaxed">
              Our shelves are filled with books waiting to be explored, while
              our café serves coffee, beverages, and light refreshments to
              accompany your reading experience. Beyond the café, Sifera hosts
              community events, discussions, workshops, and creative gatherings
              that encourage learning, collaboration, and personal growth.
            </p>
            <p className="text-lg font-sans text-dark/80 leading-relaxed">
              We believe that great stories, inspiring ideas, and genuine
              connections have the power to bring people together. That&apos;s
              why we&apos;ve created a space where you can slow down, reflect,
              discover new perspectives, and feel at home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}