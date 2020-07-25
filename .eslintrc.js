module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": ["airbnb/base"],
    "parserOptions": {
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "rules": {
        "import/extensions":"off",
        "import/no-named-as-default":"off",
        "import/no-named-as-default-member":"off",
        "no-lone-blocks":"off",
        "no-unused-expressions":"off",
        "no-console":"off",
        "no-eval":"off",
        "no-register-globals":"off",
        "no-restricted-globals":"off",
        "consistent-return":"off",
        "class-methods-use-this":"off",
        "no-use-before-define":"off",
        "max-len":"off",
        "no-plusplus":"off",
        "no-param-reassign":"off",
        "import/no-cycle":"off",
        "no-restricted-syntax":"off",
        "no-shadow":"off",
        "array-callback-return":"off"


    },
    parser: "babel-eslint",
    
};
