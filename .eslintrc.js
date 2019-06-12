module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true
  },
  extends: [ 'airbnb', 'eslint:recommended', 'plugin:react/recommended', 'plugin:jsx-a11y/recommended' ],
  settings: {
    'import/resolver': {
      node: {
        paths: [ 'src' ]
      }
    }
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  parser: 'babel-eslint',
  plugins: [ 'react', 'jsx-a11y', 'react-hooks' ],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/destructuring-assignment': [ 'off', { ignoreClassFields: true } ],
    // 'react/jsx-filename-extension': [ 1, { extensions: [ '.js', '.jsx' ] } ],
    'import/newline-after-import': [ 'off', { count: 2 } ],
    'eslint.autoFixOnSave': true,
    'eslint.alwaysShowStatus': true,
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react/prop-types': [ 0, {} ],
    'constructor-super': 'warn',
    'no-this-before-super': 'warn',
    'jsx-a11y/label-has-associated-control': [
      2,
      {
        labelComponents: [ 'CustomInputLabel' ],
        labelAttributes: [ 'label' ],
        controlComponents: [ 'CustomInput' ],
        depth: 3
      }
    ]
  }
}
