module.exports = {
  ci: {
    collect: {
      startServerCommand: "npx live-server --port=8080 --quiet",
      url: ["http://localhost:8080"],
      numberOfRuns: 3,
    },
    assert: {
      assertions: {
        "categories:accessibility": ["error", { minScore: 0.95 }],
        "categories:best-practices": ["warn", { minScore: 0.9 }],
        "categories:seo": ["warn", { minScore: 0.9 }],
        "categories:performance": ["warn", { minScore: 0.85 }],
        "color-contrast": ["warn", { minScore: 1 }],
        "image-alt": ["error", { minScore: 1 }],
        label: ["error", { minScore: 1 }],
        "link-name": ["error", { minScore: 1 }],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lighthouse-reports",
    },
  },
};
