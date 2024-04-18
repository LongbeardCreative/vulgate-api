import PipelineSingleton from "./pipeline";

export async function ocr() {
  const imagePipeline = await PipelineSingleton.getInstance();

  const output = await imagePipeline(
    // "https://bjaqdsxxtunvxyjfddao.supabase.co/storage/v1/object/public/document_ingestion/1712596866806-klzw6vk-1987-3-Vigan_Page_12.jpg",
    "https://bjaqdsxxtunvxyjfddao.supabase.co/storage/v1/object/public/uploads/9d105769-a07e-4499-ad7f-8af0fbcf939a/images/Vida-Albera-005.png",
    // "https://huggingface.co/datasets/Xenova/transformers.js-docs/resolve/main/nougat_paper.png",
    {
      min_length: 1,
      max_new_tokens: 4056,
      bad_words_ids: [[imagePipeline.tokenizer.unk_token_id]],
    }
  );

  console.log(output);

  return output;
}
