const content = window.siteContent;
let currentLanguage = "pt";

const createElement = (tagName, className, text) => {
  const element = document.createElement(tagName);
  if (className) element.className = className;
  if (text) element.textContent = text;
  return element;
};

const createExternalLink = (href, label, className = "") => {
  const link = createElement("a", className, label);
  link.href = href;
  if (!href.startsWith("mailto:")) {
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  }
  return link;
};

const socialIcons = {
  github: ["M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.18-3.37-1.18-.45-1.15-1.11-1.46-1.11-1.46-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.95 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.58 9.58 0 0 1 12 7c.85 0 1.71.11 2.51.34 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.85-2.34 4.7-4.57 4.95.36.31.68.92.68 1.85v2.57c0 .27.18.58.69.48A10 10 0 0 0 12 2Z"],
  linkedin: ["M5 3.5a1.75 1.75 0 1 1 0 3.5 1.75 1.75 0 0 1 0-3.5ZM3.5 9h3v11h-3V9Zm5 0h2.9v1.5h.04A3.18 3.18 0 0 1 14.3 8.8c3.1 0 3.7 2.04 3.7 4.69V20h-3v-5.77c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.21 1.5-2.21 3.05V20h-3V9Z"],
  scholar: ["M12 3 1.5 8.5 12 14l8-4.19V16h2V8.5L12 3Zm-6 9.65V17c3.42 2.67 8.58 2.67 12 0v-4.35l-6 3.14-6-3.14Z"],
  lattes: ["M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm0 2a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm-1 3v6l5 3 .9-1.45-4.1-2.45V7H11Z"],
  email: ["M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm9 7 8-5H4l8 5Zm-8 5h16V9l-8 5-8-5v8Z"],
};

const createSocialIcon = (name) => {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("viewBox", "0 0 24 24");
  svg.setAttribute("aria-hidden", "true");
  svg.classList.add("social-icon");

  (socialIcons[name] || []).forEach((pathData) => {
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", pathData);
    svg.append(path);
  });

  return svg;
};

const renderSocialLinks = (links = []) => {
  const container = document.getElementById("social-links");
  container.replaceChildren();
  links.forEach(({ label, url, icon }) => {
    const localizedLabel = label[currentLanguage] || label.pt;
    const item = url
      ? createExternalLink(url, "", "social-link")
      : createElement("span", "social-link social-link--pending");
    item.append(createSocialIcon(icon), createElement("span", "", localizedLabel));
    item.setAttribute("aria-label", localizedLabel);
    container.append(item);
  });
};

const renderTimeline = (containerId, entries, emptyMessage, variant, ui) => {
  const container = document.getElementById(containerId);
  container.replaceChildren();

  if (!entries.length) {
    container.append(createElement("p", "empty-state", emptyMessage));
    return;
  }

  entries.forEach((entry) => {
    const article = createElement("article", "entry entry--timeline");
    const meta = createElement("p", "entry-meta", entry.period || "");
    const body = createElement("div", "entry-body");
    const heading = createElement("h3", "entry-title", entry.role || entry.title);
    body.append(heading);

    if (entry.company || entry.institution || entry.organization) {
      body.append(
        createElement(
          "p",
          "entry-organization",
          entry.company || entry.institution || entry.organization,
        ),
      );
    }

    if (entry.description) {
      body.append(createElement("p", "entry-description", entry.description));
    }

    if (entry.highlights?.length) {
      const highlights = createElement("ul", "entry-highlights");
      entry.highlights.forEach((highlight) => {
        highlights.append(createElement("li", "", highlight));
      });
      body.append(highlights);
    }

    if (entry.url) {
      body.append(
        createExternalLink(
          entry.url,
          `${entry.linkLabel || "DOI / artigo"} ↗`,
          "timeline-link",
        ),
      );
    } else if (variant === "publication") {
      body.append(
        createElement("span", "timeline-link timeline-link--pending", ui.publicationPending),
      );
    }

    article.append(meta, body);
    container.append(article);
  });
};

const renderProjects = (projects = [], ui) => {
  const container = document.getElementById("projects-list");
  container.replaceChildren();

  if (!projects.length) {
    container.append(createElement("p", "empty-state", ui.projectsEmpty));
    return;
  }

  projects.forEach((project) => {
    const article = createElement("article", "entry entry--project");
    const meta = createElement("p", "entry-meta", project.status || project.year || "");
    const body = createElement("div", "entry-body");
    const heading = createElement("div", "project-heading");
    const title = createElement("h3", "entry-title", project.title);
    heading.append(title);
    if (project.url) {
      const link = createExternalLink(
        project.url,
        `${project.linkLabel || ui.projectLink} ↗`,
        "project-link",
      );
      link.setAttribute("aria-label", `${project.linkLabel || ui.projectLink}: ${project.title}`);
      heading.append(link);
    }
    body.append(heading);

    if (project.description) {
      body.append(createElement("p", "entry-description", project.description));
    }

    if (project.tags?.length) {
      const tags = createElement("ul", "entry-tags");
      project.tags.forEach((tag) => {
        tags.append(createElement("li", "tag", tag));
      });
      body.append(tags);
    }

    article.append(meta, body);
    container.append(article);
  });
};

const updateThemeToggle = (ui) => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const isDark = root.dataset.theme === "dark"
    || (!root.dataset.theme && systemTheme.matches);
  toggle.setAttribute("aria-pressed", String(isDark));
  toggle.setAttribute("aria-label", isDark ? ui.themeToLight : ui.themeToDark);
  document.querySelector('meta[name="theme-color"]').content = isDark ? "#0a0a0a" : "#fafafa";
};

const applyLanguage = (lang) => {
  if (!content[lang]) return;

  currentLanguage = lang;
  const { ui } = content[lang];
  document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const value = ui[element.dataset.i18n];
    if (value) element.textContent = value;
  });

  document.querySelectorAll("[data-i18n-aria]").forEach((element) => {
    const value = ui[element.dataset.i18nAria];
    if (value) element.setAttribute("aria-label", value);
  });
  document.getElementById("social-links").setAttribute("aria-label", ui.socialLinksAria);

  document.title = ui.pageTitle;
  document.querySelector('meta[name="description"]').content = ui.pageDescription;
  document.querySelector('meta[property="og:title"]').content = ui.pageTitle;
  document.querySelector('meta[property="og:description"]').content = ui.pageDescription;
  document.querySelector('meta[property="og:locale"]').content = lang === "pt" ? "pt_BR" : "en_US";
  document.querySelector('meta[name="twitter:title"]').content = ui.pageTitle;
  document.querySelector('meta[name="twitter:description"]').content = ui.pageDescription;

  const languageToggle = document.getElementById("lang-toggle");
  languageToggle.textContent = lang === "pt" ? "EN" : "PT";
  languageToggle.setAttribute(
    "aria-label",
    lang === "pt" ? ui.languageToEnglish : ui.languageToPortuguese,
  );
  languageToggle.title = languageToggle.getAttribute("aria-label");

  renderSocialLinks(content.socialLinks);
  renderProjects(content[lang].projects, ui);
  renderTimeline("experience-list", content[lang].experience, ui.experienceEmpty, "experience", ui);
  renderTimeline(
    "education-list",
    content[lang].researchAndEducation,
    ui.educationEmpty,
    "education",
    ui,
  );
  renderTimeline("articles-list", content[lang].articles, ui.publicationsEmpty, "publication", ui);
  updateThemeToggle(ui);
  localStorage.setItem("site-lang", lang);
};

const initializeTheme = () => {
  const root = document.documentElement;
  const toggle = document.querySelector(".theme-toggle");
  const systemTheme = window.matchMedia("(prefers-color-scheme: dark)");
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "light" || savedTheme === "dark") {
    root.dataset.theme = savedTheme;
  }

  toggle.addEventListener("click", () => {
    const isDark = root.dataset.theme === "dark"
      || (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const nextTheme = isDark ? "light" : "dark";
    root.dataset.theme = nextTheme;
    localStorage.setItem("theme", nextTheme);
    updateThemeToggle(content[currentLanguage].ui);
  });

  systemTheme.addEventListener("change", () => {
    if (!root.dataset.theme) updateThemeToggle(content[currentLanguage].ui);
  });

  updateThemeToggle(content[currentLanguage].ui);
};

document.getElementById("current-year").textContent = new Date().getFullYear();
document.getElementById("lang-toggle").addEventListener("click", () => {
  applyLanguage(currentLanguage === "pt" ? "en" : "pt");
});
const savedLanguage = localStorage.getItem("site-lang");
applyLanguage(savedLanguage === "en" ? "en" : "pt");
initializeTheme();
