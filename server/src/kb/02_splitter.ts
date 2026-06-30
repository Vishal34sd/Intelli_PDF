

// chunking -> bridge between raw docs and useful RAG 
// keeping chunks very big -> retriver 
// keeping chunks very small 
// small but at the same long enough 


import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters";
import {Document} from "@langchain/core/documents";


const DEFAULT_CHUNK_SIZE = 800 ;
const DEFAULT_CHUNK_OVERLAP = 150 ; // overlap helps to maintain context between chunks

const splitter  = new RecursiveCharacterTextSplitter({
    chunkSize : DEFAULT_CHUNK_SIZE ,
    chunkOverlap : DEFAULT_CHUNK_OVERLAP 
    
})

export async function splitDocument(docs : Document[]): Promise<Document[]>{
    if(!docs.length) return [] 

    const chunks = await splitter.splitDocuments(docs);

    return chunks.map((chunk , index)=>{
        const base = chunk?.metadata ?? {};

        return new Document({
            pageContent : chunk.pageContent.trim(),
            metadata : {
                ...base ,
                source : base?.source ?? "unknown source" ,
                _chunkIndex : index
            }
        })
    })
    
}