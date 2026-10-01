import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { LangProvider } from "./context/LangContext";

export { getPageMeta } from "./lib/pageMeta";

export function render(url: string): string {
  return renderToString(
    <StaticRouter location={url}>
      <ThemeProvider>
        <LangProvider>
          <App />
        </LangProvider>
      </ThemeProvider>
    </StaticRouter>
  );
}
