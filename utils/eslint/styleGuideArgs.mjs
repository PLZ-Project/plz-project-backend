import compat from './compat.mjs';

import { fixupConfigRules } from '@eslint/compat';

const styleGuideArg = fixupConfigRules(compat.extends('airbnb-base', 'prettier'));

export default styleGuideArg;
