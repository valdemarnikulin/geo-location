
module.exports = {
  preset: '@vue/cli-plugin-unit-jest',
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    // 'axios': '<rootDir>/src/__mocks__/axios.js',
    // 'nprogress': '<rootDir>/src/__mocks__/nprogress.js',
    // 'nprogress/nprogress.css': '<rootDir>/src/__mocks__/nprogress/nprogress.css',
  },
  moduleFileExtensions: [
        "js",
        "json",
        "vue"
      ],
      "transform": {
        "^.+\\.js$": "<rootDir>/node_modules/babel-jest",
        ".*\\.(vue)$": "<rootDir>/node_modules/vue-jest"
    },
    // transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lit-element)/)'],
  transformIgnorePatterns: ['./node_modules/'],
}



// module.exports = {
//   
//   testEnvironment: 'jsdom',
//   // transformIgnorePatterns: ['<rootDir>/node_modules/(?!(lit-element)/)'],
//   // transformIgnorePatterns: ['./node_modules/'],
//   // moduleFileExtensions: [
//   //   "js",
//   //   "vue"
//   // ],
//   moduleNameMapper: {
//     "^@/(.*)$": "<rootDir>/src/$1",
//     // "/^components\\/(.*)$/": "<rootDir>/src/components/$1"
//   },
//   // collectCoverage: true,
//   // collectCoverageFrom: ["**/*.{js,vue}", "!**/node_modules/**"],
//   transform: {
//     "^.+\\.js$": "babel-jest",
//     // ".*\\.vue$": "<rootDir>/node_modules/vue-jest",
//     ".*\\.(vue)$": "vue-jest",
//     // ".*\\.(js)$": "babel-jest",
//     "\\.js$": "<rootDir>/node_modules/babel-jest"
//   },
  
//   // snapshotSerializers: [
//   //   "<rootDir>/node_modules/jest-serializer-vue"
//   // ],
//   // moduleDirectories: [
//   //   "node_modules",
//   //   "src"
//   // ]
// }