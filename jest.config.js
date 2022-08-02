// module.exports = {
//   preset: '@vue/cli-plugin-unit-jest',
//   moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
//   transform: {
//     '^.+\\.vue$': 'vue-jest',
//     '.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
//       'jest-transform-stub',
//     '^.+\\.(js|jsx)?$': 'babel-jest'
//   },
  
// }


module.exports = {
  transformIgnorePatterns: ["/node_modules/(?!vue-awesome)"],
  moduleFileExtensions: [
    "js",
    "vue"
  ],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1"
  },
  transform: {
    "^.+\\.js$": "babel-jest",
    ".*\\.vue$": "<rootDir>/node_modules/vue-jest",
    "\\.js$": "<rootDir>/node_modules/babel-jest"
  },
  
  snapshotSerializers: [
    "<rootDir>/node_modules/jest-serializer-vue"
  ],
  moduleDirectories: [
    "node_modules",
    "src"
  ]
}
