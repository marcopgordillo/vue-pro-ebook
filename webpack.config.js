export const module = {
  rules: [
    {
      test: /\.scss$/,
      use: [
        'vue-style-loader',
        'css-loader',
        'scss-loader'
      ]
    }
  ]
};