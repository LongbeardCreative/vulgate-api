import {
  type PipelineType,
  type ImageToTextPipeline,
  pipeline,
  env,
} from "@xenova/transformers";

// env.allowRemoteModels = true;
// env.cacheDir = "/tmp/.cache";
// env.allowLocalModels = true;
// env.localModelPath = path.join(process.cwd(), "models");

declare global {
  namespace globalThis {
    var PipelineSingleton: ReturnType<typeof P>;
  }
}

// Use the Singleton pattern to enable lazy construction of the pipeline.
// NOTE: We wrap the class in a function to prevent code duplication (see below).
const P = () =>
  class PipelineSingleton {
    static task: PipelineType = "image-to-text";
    static model = "Xenova/nougat-base";
    static instance: ReturnType<typeof pipeline> | null = null;

    static async getInstance(
      progress_callback = undefined
    ): Promise<ImageToTextPipeline> {
      if (this.instance === null) {
        this.instance = pipeline(this.task, this.model, {
          progress_callback,
        });
      }
      return this.instance as Promise<ImageToTextPipeline>;
    }
  };

let PipelineSingleton: ReturnType<typeof P>;
if (process.env.NODE_ENV !== "production") {
  // When running in development mode, attach the pipeline to the
  // global object so that it's preserved between hot reloads.
  // For more information, see https://vercel.com/guides/nextjs-prisma-postgres
  if (!global.PipelineSingleton) {
    global.PipelineSingleton = P();
  }
  PipelineSingleton = global.PipelineSingleton;
} else {
  PipelineSingleton = P();
}

export default PipelineSingleton;
