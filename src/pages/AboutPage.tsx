import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";

export default function AboutPage() {
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  return (
    <div>
      <Seo
        title="About HolyPlace"
        description="HolyPlace is a free devotional reference for aarti, mantra, chalisa, and prayer chants across Hinduism, Sikhism, Christianity, and Buddhism."
        path="/about"
        breadcrumb={breadcrumb}
      />
      <Breadcrumb items={breadcrumb} />
      <div className="deity-header">
        <h1>About HolyPlace</h1>
      </div>
      <article className="card blog-post">
        <section>
          <p>
            HolyPlace is a free, independently run reference for devotional chants — aarti, mantra, chalisa, shabad,
            and prayer — across Hinduism, Sikhism, Christianity, and Buddhism. Every chant is shown in its original
            script alongside an English translation, with an optional transliteration into other Indic scripts for
            Brahmic-script traditions.
          </p>
          <p>
            The site is built and maintained by one person as a personal project, not a company or institution. It
            isn't affiliated with any temple, gurdwara, church, monastery, or religious organization. Texts are
            drawn from traditional, long-published devotional sources; where we're not confident in reproducing a
            text accurately, we leave it out rather than guess.
          </p>
          <p>
            If you notice an error in a transliteration, translation, or attribution, or want to suggest a chant
            that's missing, feel free to reach out via the contact details below.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            For corrections, suggestions, or questions about this site, email{" "}
            <a href="mailto:REPLACE_WITH_CONTACT_EMAIL">REPLACE_WITH_CONTACT_EMAIL</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
