module.exports = {
    launch: {
        headless: true,
        executablePath: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
    },
    testEnvironment: "node",
    browserContext: "default"
};

// module.exports = {
//     setupFilesAfterEnv: ["<rootDir>/setupTests.js"],
//     testEnvironment: "node",
//     browserContext: "default"
// };
