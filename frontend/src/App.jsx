import {
  communityStats,
  discussionHighlights,
  liveEvents,
  mentorSpotlight,
  resourceDrops,
  successStories,
} from './data/communityData'
import {
  FiUsers,
  FiAward,
  FiFeather,
  FiCalendar,
  FiPlayCircle,
  FiMessageCircle,
} from 'react-icons/fi'

function App() {
  return (
    <div className="bg-night min-h-screen text-white">
      <div className="mx-auto max-w-6xl px-6 pb-20 pt-10">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-gradient-to-br from-white/5 via-white/0 to-white/5 px-8 py-6 backdrop-blur-xl md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.4em] text-white/50">
              Tech Community OS
            </p>
            <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight">
              Pulse
            </h1>
            <p className="text-base text-white/60">
              A fully hosted MERN platform to launch, scale, and monetize world-class
              developer communities.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <button className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-night shadow-glow">
              Join the beta
            </button>
            <button className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold text-white/80 hover:border-white/60">
              View product map
            </button>
          </div>
        </header>

        <Hero />
        <StatsSection />
        <EventsSection />
        <MentorAndResources />
        <StoriesSection />
      </div>
    </div>
  )
}

const Hero = () => {
  return (
    <section className="relative mt-12 overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-r from-brand-purple/20 via-brand-pink/10 to-brand-teal/20 p-8">
      <div className="flex flex-col gap-10 lg:flex-row lg:items-center">
        <div className="flex-1 space-y-6">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 px-3 py-1 text-xs uppercase tracking-wide text-white/70">
            <FiPlayCircle className="text-brand-teal" />
            All-in-one community OS
          </div>
          <div className="space-y-4">
            <h2 className="font-display text-4xl leading-tight tracking-tight md:text-5xl">
              Operate high-signal tech communities without duct tape tools.
            </h2>
            <p className="text-lg text-white/80">
              Orchestrate chapters, programs, events, monetization, and member journeys from
              one collaborative canvas powered by the MERN stack.
            </p>
          </div>
          <ul className="grid gap-3 text-sm text-white/70 md:grid-cols-2">
            {[
              'Unified member graph & reputation scoring',
              'Modular experiences: cohorts, guilds, jams',
              'Embedded commerce for paid tiers & perks',
              'Graph-powered insights and predictive health',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-white/20 text-xs text-brand-teal">
                  •
                </span>
                {item}
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-4">
            <button className="rounded-2xl bg-white px-6 py-3 font-semibold text-night shadow-glow">
              Explore static preview
            </button>
            <button className="rounded-2xl border border-white/30 px-6 py-3 font-semibold text-white/80 hover:border-white/60">
              Book a tour
            </button>
          </div>
        </div>
        <div className="glass-panel flex flex-1 flex-col gap-4 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-wide text-white/60">
                Full-funnel visibility
              </p>
              <p className="text-3xl font-display">Pulse console</p>
            </div>
            <span className="rounded-full border border-white/20 px-3 py-1 text-xs text-brand-teal">
              Live
            </span>
          </div>
          <div className="grid gap-3">
            {communityStats.slice(0, 3).map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <p className="text-xs uppercase text-white/40">{stat.label}</p>
                <p className="text-2xl font-display">{stat.value}</p>
                <p className="text-xs text-emerald-300/80">{stat.change}</p>
              </div>
            ))}
          </div>
          <div className="space-y-3 rounded-2xl border border-white/10 bg-night/40 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-white/70">Live discussion rooms</p>
              <span className="text-xs text-brand-pink">+4 right now</span>
            </div>
            {discussionHighlights.slice(0, 2).map((topic) => (
              <div key={topic.title} className="rounded-xl border border-white/5 bg-white/5 p-3">
                <p className="font-semibold">{topic.title}</p>
                <p className="text-xs text-white/60">{topic.tags.join(' • ')}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

const StatsSection = () => {
  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-2">
      <div className="glass-panel space-y-6 p-8">
        <div className="flex items-center gap-3">
          <div className="tag">
            <FiUsers className="text-brand-teal" />
            Health intel
          </div>
          <p className="text-sm text-white/60">Realtime signal across all hubs</p>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {communityStats.map((stat) => (
            <article key={stat.label} className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <p className="text-xs uppercase tracking-wide text-white/50">{stat.label}</p>
              <p className="mt-2 text-3xl font-display">{stat.value}</p>
              <p className="mt-1 text-xs text-emerald-300/70">{stat.change}</p>
            </article>
          ))}
        </div>
      </div>

      <div className="glass-panel space-y-5 p-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-white/60">Signal feed</p>
            <h3 className="section-heading mt-2 text-2xl">Trending discussions</h3>
          </div>
          <FiMessageCircle className="text-brand-pink" size={32} />
        </div>
        <div className="space-y-4">
          {discussionHighlights.map((discussion) => (
            <article
              key={discussion.title}
              className="rounded-2xl border border-white/10 bg-night/40 p-4 transition hover:border-white/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="font-semibold">{discussion.title}</h4>
                <span className="text-xs text-white/60">{discussion.reactions} reactions</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
                {discussion.tags.map((tag) => (
                  <span key={tag} className="rounded-full border border-white/10 px-2 py-1">
                    {tag}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-white/50">
                Featuring {discussion.contributors.join(', ')}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const EventsSection = () => {
  return (
    <section className="mt-12 rounded-[32px] border border-white/10 bg-white/5 p-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="tag gap-2">
            <FiCalendar className="text-brand-teal" /> Programming runway
          </p>
          <h3 className="mt-3 font-display text-3xl">Hybrid events over the next sprint</h3>
        </div>
        <button className="rounded-full border border-white/20 px-4 py-2 text-sm text-white/70">
          Export schedule
        </button>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {liveEvents.map((event) => (
          <article key={event.title} className="glass-panel flex h-full flex-col gap-4 p-5">
            <div className="text-sm text-white/60">{event.format}</div>
            <div>
              <p className="text-sm uppercase tracking-widest text-brand-teal">{event.date}</p>
              <h4 className="mt-2 text-xl font-semibold">{event.title}</h4>
            </div>
            <div className="text-xs text-white/60">
              Featuring{' '}
              <span className="text-white">{event.guests.join(' • ')}</span>
            </div>
            <button className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-teal">
              RSVP <FiFeather />
            </button>
          </article>
        ))}
      </div>
    </section>
  )
}

const MentorAndResources = () => {
  return (
    <section className="mt-12 grid gap-8 lg:grid-cols-2">
      <div className="glass-panel p-8">
        <div className="flex items-center justify-between">
          <h3 className="section-heading">Mentor spotlight</h3>
          <FiAward className="text-brand-pink" size={32} />
        </div>
        <p className="mt-2 text-sm text-white/60">
          Curated operators hosting micro-cohorts, AMAs, and 1:1 strategy jams.
        </p>
        <div className="mt-6 space-y-4">
          {mentorSpotlight.map((mentor) => (
            <article
              key={mentor.name}
              className="flex items-center justify-between rounded-2xl border border-white/10 bg-night/40 p-4"
            >
              <div>
                <h4 className="font-semibold">{mentor.name}</h4>
                <p className="text-sm text-white/60">{mentor.title}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-white/60">
                  {mentor.focus.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 px-2 py-0.5">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
              <button className="rounded-full border border-white/20 px-4 py-1 text-xs text-white/70">
                {mentor.sessions}
              </button>
            </article>
          ))}
        </div>
      </div>

      <div className="glass-panel p-8">
        <div className="flex items-center justify-between">
          <h3 className="section-heading">Resource drops</h3>
          <FiFeather className="text-brand-teal" size={32} />
        </div>
        <p className="mt-2 text-sm text-white/60">
          Plug-and-play templates, rituals, and data sets powering high-signal communities.
        </p>
        <div className="mt-6 space-y-4">
          {resourceDrops.map((drop) => (
            <article
              key={drop.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-white/40">{drop.category}</p>
              <h4 className="mt-2 text-xl font-semibold">{drop.title}</h4>
              <p className="mt-1 text-sm text-white/60">{drop.summary}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

const StoriesSection = () => {
  return (
    <section className="mt-12 rounded-[32px] border border-white/10 bg-gradient-to-br from-brand-purple/20 via-night to-brand-pink/10 p-8">
      <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="tag">
            <FiUsers className="text-brand-teal" /> Proof from the field
          </p>
          <h3 className="mt-3 font-display text-3xl">
            Community teams shipping outcomes in weeks, not quarters.
          </h3>
        </div>
        <button className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-night shadow-glow">
          Talk to our team
        </button>
      </div>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {successStories.map((story) => (
          <article key={story.community} className="glass-panel space-y-3 p-4">
            <p className="text-sm text-white/60">{story.metric}</p>
            <h4 className="text-xl font-semibold">{story.community}</h4>
            <p className="text-sm text-white/70">{story.impact}</p>
          </article>
        ))}
      </div>
    </section>
  )
}

export default App
