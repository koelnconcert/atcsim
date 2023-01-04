/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-recommended',
    '@vue/standard'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'vue/html-closing-bracket-spacing': [
      'warn',
      {
        // prefer <foobar/> over <foobar />. This is compliant with
        // https://vuejs.org/style-guide/rules-strongly-recommended.html#self-closing-components
        selfClosingTag: 'never'
      }
    ],
    'vue/first-attribute-linebreak': [
      'warn',
      {
        singleline: 'beside',
        multiline: 'below'
      }
    ],
    'vue/max-attributes-per-line': [
      'warn',
      {
        singleline: {
          max: 99 // defaults to 1
        },
        multiline: {
          max: 1
        }
      }
    ],
    // default is not really required according to style guide. The implicit 'undefined' is just fine.
    'vue/require-default-prop': 'off',
    /*
     * add vue3 uncategorized
     */
    'vue/no-v-text': 'warn',
    'vue/no-useless-v-bind': 'warn',
    'vue/no-useless-mustaches': 'warn',
    'vue/no-empty-component-block': 'warn',
    'vue/no-unused-refs': 'warn',
    'vue/no-unused-properties': 'warn'
  }
}
