module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: {
            li: {
              paddingLeft: "0",
              marginTop: "0",
              marginBottom: "0",
              p: {
                marginTop: "0",
                marginBottom: "0",
              },
            },
            "ul ul, ul ol, ol ul, ol ol": {
              marginTop: "0",
              marginBottom: "0",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
