const {
    addDecoratorsLegacy, 
    //useEslintRc, 
    disableEsLint, 
    override
} = require('customize-cra');

module.exports = override(
    addDecoratorsLegacy(),
    //useEslintRc('./.eslintrc'),
    disableEsLint(),
);
