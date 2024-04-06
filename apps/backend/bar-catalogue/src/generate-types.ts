import { GraphQLDefinitionsFactory } from '@nestjs/graphql';
import { join } from 'path';

const definitionsFactory = new GraphQLDefinitionsFactory();
definitionsFactory.generate({
  typePaths: ['./**/*.graphql', './**/*.gql'],
  path: join(process.cwd(), 'graphql-types.ts'),
  emitTypenameField: true,
  watch: true,
  skipResolverArgs: false,
  defaultTypeMapping: {
    ID: 'number',
  },
  customScalarTypeMapping: {
    CountryCode: 'typeof GraphQLCountryCode',
    PhoneNumber: 'typeof GraphQLPhoneNumber',
    PositiveFloat: 'typeof GraphQLPositiveFloat',
  },
  additionalHeader:
    "import { GraphQLCountryCode, GraphQLPhoneNumber, GraphQLPositiveFloat } from 'graphql-scalars'",
});
