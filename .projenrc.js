const { awscdk } = require('projen');
const project = new awscdk.AwsCdkTypeScriptApp({
  authorName: 'Wesley Cheek',
  cdkVersion: '2.35.0',
  defaultReleaseBranch: 'main',
  name: 'production-ready-cdk',
  description: 'A CDK project to learn production CDK',
  repositoryUrl: 'https://github.com/wcheek/production-ready-cdk.git',
  keywords: [
    'AWS CDK',
    'projen',
    'Typescript',
    'Deployment',
  ],

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();