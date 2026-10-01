import Seo from "../components/Seo";
import Breadcrumb from "../components/Breadcrumb";

export default function PrivacyPage() {
  const breadcrumb = [
    { name: "Home", path: "/" },
    { name: "Privacy Policy", path: "/privacy" },
  ];

  return (
    <div>
      <Seo
        title="Privacy Policy — HolyPlace"
        description="How HolyPlace handles data: what's stored locally in your browser, what Google Analytics and AdSense collect, and that there's no account or server-side user data."
        path="/privacy"
        breadcrumb={breadcrumb}
      />
      <Breadcrumb items={breadcrumb} />
      <div className="deity-header">
        <h1>Privacy Policy</h1>
      </div>
      <article className="card blog-post">
        <section>
          <h2>No accounts, no server-side data</h2>
          <p>
            HolyPlace has no login, no user accounts, and no backend database. The site doesn't collect or store
            your name, email, or any personal information on a server, because there is no server beyond static
            hosting.
          </p>
        </section>
        <section>
          <h2>What's stored in your browser</h2>
          <p>
            Preferences like theme (light/dark), language, font size, favorited chants, your practice streak, and a
            daily reminder time are saved using your browser's localStorage. This data stays on your device — it's
            never sent to us — and you can clear it at any time by clearing your browser's site data for HolyPlace.
          </p>
        </section>
        <section>
          <h2>Google Analytics</h2>
          <p>
            This site uses Google Analytics (GA4) to understand aggregate traffic — which pages are visited and
            roughly how, not who is visiting. See{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google's Privacy Policy
            </a>{" "}
            for details on how Google processes this data.
          </p>
        </section>
        <section>
          <h2>Google AdSense</h2>
          <p>
            This site may show ads served by Google AdSense. Google and its partners may use cookies to serve ads
            based on your visits to this and other sites. You can opt out of personalized advertising through{" "}
            <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
              Google Ads Settings
            </a>
            , and see{" "}
            <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">
              how Google uses advertising cookies
            </a>{" "}
            for more detail.
          </p>
        </section>
        <section>
          <h2>Offline support</h2>
          <p>
            A service worker caches pages you've already visited so they load without a connection later. This
            cache lives entirely in your browser and isn't accessible to us.
          </p>
        </section>
        <section>
          <h2>Contact</h2>
          <p>
            Questions about this policy can be sent to{" "}
            <a href="mailto:rabdeepsinghkharbanda29@gmail.com">rabdeepsinghkharbanda29@gmail.com</a>.
          </p>
        </section>
      </article>
    </div>
  );
}
