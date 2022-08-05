import { Stack, StackProps, Stage } from "aws-cdk-lib";
import {
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { LambdaStack } from "./lambda-stack";

// 3a. We define a Lambda Stage that deploys the Lambda Stack.
export class LambdaStage extends Stage {
  constructor(scope: Construct, id: string) {
    super(scope, id);
    new LambdaStack(this, "LambdaStack");
  }
}

export class CdkPipelineStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // 1. We import the CodeStar Connection for Github-CDK Pipeline integration. Therefore,
    // you only need to provide the ARN of the Connection.
    const codePipelineSource = CodePipelineSource.connection(
      "wcheek/production-ready-cdk",
      "main",
      {
        connectionArn:
          "arn:aws:codestar-connections:ap-northeast-1:089189684786:connection/478427db-65cd-4a82-b01e-06b9ec95bab5",
      }
    );

    // 2. We define the CDK Pipeline using the source from the first step and
    // use three commands for the synth step. We install dependencies from the yarn.lock file
    // with yarn install --frozen-lockfile command to have deterministic, fast, and repeatable builds.
    // The following two lines, we already know.
    const cdkPipeline = new CodePipeline(this, "CdkPipeline", {
      pipelineName: "lambda-stack-cdk-pipeline",
      synth: new ShellStep("Synth", {
        input: codePipelineSource,
        commands: [
          "yarn install --frozen-lockfile",
          "npx projen build",
          "npx projen synth",
        ],
      }),
    });

    // 3b. Then we add this to the CDK Pipeline as a pipeline stage.
    cdkPipeline.addStage(new LambdaStage(this, "dev"));
  }
}
