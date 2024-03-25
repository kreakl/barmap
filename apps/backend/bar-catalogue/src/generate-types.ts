import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql', './**/*.gql'],
  path: join(process.cwd(), 'graphql-types.ts'),
  outputAs: 'class',
  emitTypenameField: true,
  watch: true,
  skipResolverArgs: true,
  defaultTypeMapping: {
    ID: 'number',
  },
  customScalarTypeMapping: {
    CountryCode: 'typeof GraphQLCountryCode',
    PhoneNumber: 'typeof GraphQLPhoneNumber',
  },
  additionalHeader:
    "import { GraphQLCountryCode, GraphQLPhoneNumber } from 'graphql-scalars'",
});
